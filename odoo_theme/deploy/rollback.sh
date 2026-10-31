#!/usr/bin/env bash
# Restore a database from a backup made by golive.sh.   Usage: sudo bash rollback.sh <database> <dumpfile>
# Anything entered on the site AFTER the backup (bookings, orders...) is lost: the whole database goes back.
set -euo pipefail
DB="${1:?usage: sudo bash rollback.sh <database> <dumpfile>}"; DUMP="${2:?dump file}"
[ "$(id -u)" = 0 ] || { echo "Run with sudo."; exit 1; }
[ -s "$DUMP" ] || { echo "Dump not found: $DUMP"; exit 1; }
OWNER="$(cat "$DUMP.owner" 2>/dev/null || echo odoo18)"
echo "Restoring $DB from $DUMP (owner $OWNER)"
[ "$DB" = "Wiz" ] && systemctl stop odoo18 || pkill -f "http-port=8070" || true
sudo -u postgres psql -qc "select pg_terminate_backend(pid) from pg_stat_activity where datname='$DB' and pid<>pg_backend_pid()" >/dev/null
sudo -u postgres dropdb "$DB"
sudo -u postgres createdb -O "$OWNER" "$DB"
sudo -u postgres pg_restore --no-owner --role="$OWNER" -d "$DB" "$DUMP"
[ "$DB" = "Wiz" ] && systemctl start odoo18 || true
echo "Restored. $( [ "$DB" = "Wiz" ] && echo 'odoo18 service started.' || echo 'Start the test server again if needed.')"
