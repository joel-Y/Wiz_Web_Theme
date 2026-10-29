# -*- coding: utf-8 -*-
# Part of WizSmith. See LICENSE file for full copyright and licensing details.
"""
Main-menu synchronisation.

The WizSmith header shows the same six entries as the React design. Existing sites
already have some of them (from an older theme), so entries are matched by URL or
name and reused: running this twice, or on a site that already has the menu, never
creates duplicates, and entries that are not part of the WizSmith menu (WizFix,
WizRenouv, ...) are left untouched and placed after it.
"""

# (name, url, accepted urls, accepted lower-case names)
WIZSMITH_MENU = [
    ('Accueil', '/', {'/', ''}, {'accueil', 'home'}),
    ('Comment ça fonctionne', '/comment-ca-fonctionne',
     {'/comment-ca-fonctionne'}, {'comment ça fonctionne'}),
    ('Solutions & Packs', '/packs', {'/packs', '/#packs', '/solutions'},
     {'solutions', 'solutions & packs'}),
    ('Résidences & Airbnb', '/residences-airbnb', {'/residences-airbnb'},
     {'résidences & airbnb', 'residences & airbnb'}),
    ('Hôtels intelligents', '/hotels-intelligents', {'/hotels-intelligents'},
     {'hôtels intelligents', 'hotels intelligents'}),
    ('Rendez-vous', '/rendez-vous', {'/rendez-vous', '/page/appointment', '/appointment'},
     {'rendez-vous'}),
]
FIRST_FOREIGN_SEQUENCE = 100


def _norm_url(url):
    url = (url or '').strip()
    if url.startswith(('http://', 'https://')):
        # keep only the path of absolute links to our own site
        url = '/' + url.split('/', 3)[3] if url.count('/') >= 3 else '/'
    if len(url) > 1 and url.endswith('/'):
        url = url[:-1]
    return url


def find_match(children, urls, names):
    """Return the first child (objects with .url and .name) matching by URL, then by name."""
    for child in children:
        if _norm_url(child.url) in urls:
            return child
    for child in children:
        if (child.name or '').strip().casefold() in names:
            return child
    return None


def sync_main_menu(env):
    Menu = env['website.menu'].sudo()
    for website in env['website'].sudo().search([]):
        root = website.menu_id
        if not root:
            continue
        children = root.child_id.sorted('sequence')
        used = Menu
        for index, (name, url, urls, names) in enumerate(WIZSMITH_MENU):
            sequence = (index + 1) * 10
            candidates = children - used
            match = find_match(candidates, urls, names)
            if match:
                match.write({'name': name, 'url': url, 'sequence': sequence})
                used |= match
                # Drop exact duplicates of the same entry (same URL under the same parent).
                dupes = (candidates - match).filtered(
                    lambda m: _norm_url(m.url) in urls and not m.child_id
                )
                dupes.unlink()
                children = children - dupes
            else:
                used |= Menu.create({
                    'name': name,
                    'url': url,
                    'parent_id': root.id,
                    'website_id': website.id,
                    'sequence': sequence,
                })
        # Anything else already in the menu keeps its entry, after ours.
        foreign = (children - used).sorted('sequence')
        for offset, menu in enumerate(foreign):
            menu.sequence = FIRST_FOREIGN_SEQUENCE + offset * 10


def post_init_hook(env):
    sync_main_menu(env)
