#!/usr/bin/env bash
# WizSmith theme go-live.   Usage:  sudo bash golive.sh <database>
#   <database> = Wiz            -> the LIVE site (restarts the odoo18 service)
#   <database> = anything else  -> a rehearsal copy served on port 8070
# Every step prints what it does and stops at the first failure.
set -euo pipefail

DB="${1:?usage: sudo bash golive.sh <database>}"
PY=/opt/odoo18/venv/bin/python3.12
BIN=/opt/odoo18/odoo-bin
CONF=/etc/odoo18.conf
MODULE=website_wizsmith_theme
ADDONS=/opt/odoo18/custom_addons
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/../$MODULE"
STAMP="$(date +%F_%H%M)"
DUMP="/home/weaponx/${DB}_before_golive_${STAMP}.dump"
LOG="/tmp/golive_${DB}_${STAMP}.log"

[ "$(id -u)" = 0 ] || { echo "Run with sudo."; exit 1; }
[ -d "$SRC" ] || { echo "Module folder not found next to this script: $SRC"; exit 1; }
PSQL() { sudo -u postgres psql -d "$DB" -v ON_ERROR_STOP=1 -tA "$@"; }
DBLIST="$(sudo -u postgres psql -lqt | cut -d'|' -f1)"
echo "$DBLIST" | grep -qw "$DB" || { echo "Database $DB does not exist."; exit 1; }

if [ "$DB" = "Wiz" ]; then PORT=8069; else PORT=8070; fi

echo "== 1/7 Backup of $DB -> $DUMP"
OWNER="$(sudo -u postgres psql -tAc "select pg_catalog.pg_get_userbyid(datdba) from pg_database where datname='$DB'")"
echo "$OWNER" > "$DUMP.owner"
sudo -u postgres pg_dump -Fc "$DB" > "$DUMP"
chown weaponx:weaponx "$DUMP" "$DUMP.owner" 2>/dev/null || true
[ -s "$DUMP" ] || { echo "Backup is empty - STOP."; exit 1; }
echo "   backup size: $(du -h "$DUMP" | cut -f1)  (owner: $OWNER)"

echo "== 2/7 Install module files"
rm -rf "$ADDONS/$MODULE"
cp -r "$SRC" "$ADDONS/$MODULE"
chown -R odoo18:odoo18 "$ADDONS/$MODULE"

echo "== 3/7 Install/update the module in $DB (log: $LOG)"
STATE="$(PSQL -c "select state from ir_module_module where name='$MODULE'" || true)"
if [ "$STATE" = "installed" ]; then FLAG="-u"; else FLAG="-i"; fi
echo "   module state: ${STATE:-not in list} -> using $FLAG"
sudo -u odoo18 "$PY" "$BIN" -c "$CONF" -d "$DB" --db-filter="^${DB}\$" $FLAG "$MODULE" \
    --stop-after-init --http-port=8071 --gevent-port=8074 --max-cron-threads=0 > "$LOG" 2>&1 || true
if grep -E " (ERROR|CRITICAL) " "$LOG" | head -5 | grep .; then
    echo "!! Errors during install (see $LOG). NOTHING restarted. Rollback not needed yet: the site is unchanged until restart."
    exit 1
fi
[ "$(PSQL -c "select state from ir_module_module where name='$MODULE'")" = "installed" ] || { echo "!! Module is not 'installed'. See $LOG"; exit 1; }
echo "   module installed"

echo "== 4/7 Make the new pages win over old site-specific copies"
PSQL <<'SQL'
-- old pages that sit on the same addresses as the new ones are renamed and unpublished (kept, not deleted)
update website_page set url = url || '-ancien', is_published = false
 where website_id is not null
   and url in ('/packs','/residences-airbnb','/hotels-intelligents','/comment-ca-fonctionne','/rendez-vous')
   and view_id not in (select res_id from ir_model_data where module='website_wizsmith_theme' and model='ir.ui.view');
-- the home page(s) use the new homepage template
update website_page set view_id = (select res_id from ir_model_data
        where module='website_wizsmith_theme' and name='wizsmith_homepage' and model='ir.ui.view')
 where url = '/';
-- menu links
update website_menu set url='/packs' where url in ('/#packs','/solutions') and name->>'en_US' ilike 'solutions%';
update website_menu set url='/rendez-vous' where url in ('/page/appointment') ;
delete from ir_attachment where url like '/web/assets/%';
SQL
echo "   main menu now:"
PSQL -c "select m.sequence, m.name->>'en_US', m.url from website_menu m join website_menu p on p.id=m.parent_id where p.parent_id is null and m.website_id is not null order by m.sequence" | sed 's/^/     /'

echo "== 5/7 Restart"
if [ "$DB" = "Wiz" ]; then
    systemctl restart odoo18
else
    pkill -f "http-port=8070" || true; sleep 2
    sudo -u odoo18 nohup "$PY" "$BIN" -c "$CONF" -d "$DB" --db-filter="^${DB}\$" --http-port=8070 --gevent-port=8073 --max-cron-threads=0 > /tmp/odoo_rehearsal.log 2>&1 &
fi
sleep 20

echo "== 6/7 Checks on port $PORT"
FAIL=0
for u in / /comment-ca-fonctionne /packs /residences-airbnb /hotels-intelligents /rendez-vous; do
    code="$(curl -s -o /tmp/golive_page.html -w '%{http_code}' "http://127.0.0.1:$PORT$u" || true)"
    css="$(grep -c 'css error' /tmp/golive_page.html || true)"
    mark="$(grep -c 'wiz-' /tmp/golive_page.html || true)"
    if [ "$code" = 200 ] && [ "$css" = 0 ] && [ "$mark" -gt 0 ]; then s=OK; else s=FAIL; FAIL=1; fi
    printf "   %-26s http=%s css-error=%s theme-markers=%s  %s\n" "$u" "$code" "$css" "$mark" "$s"
done
for u in /privacy /terms /claim /warranty; do
    printf "   (info) %-18s http=%s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT$u" || true)"
done

echo "== 7/7 Result"
if [ "$FAIL" = 0 ]; then
    echo "   ALL CHECKS PASSED.  Backup: $DUMP"
else
    echo "   !! SOME CHECKS FAILED.  Roll back with:  sudo bash $HERE/rollback.sh $DB $DUMP"
    exit 1
fi
