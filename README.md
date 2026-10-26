# Checklists

Static site: 12 pages (a hub plus 11 tools) sharing one manifest and one service worker.
Upload the whole folder as-is to any static host.

```
index.html                    hub, links to every tool below

Trading
  trade_entry_form.html       Trade Entry Desk: log a trade, grade it, copy the spreadsheet row
  trade_entry_guide.html      Trade Entry Desk companion guide (the small 📖 tab on its card)
  trading-checklist.html      Trading Operations (Plan V1.0)
  mms-checklist.html          MMS Strategy SOP
  gemspot-checklist.html      GemSpot 盤前關卡 (pre-market gate)

Work / Avera Energy
  task-checklist.html         Task Report → WhatsApp
  site-survey.html            Avera Energy site survey (print-friendly)
  msb-roof-markup.html        MSB & roof markup on a satellite screenshot
  solar-atap-toolkit.html     Solar ATAP calculator, ATAP vs NEM NOVA, timeline
  avera_solar_calc_suite.html Solar PV Calculator Suite
  avera-project-tools.html    Folder sync checker, folder generator, file renamer

Shared
  manifest.json               install config (name, icons, shortcuts)
  service-worker.js           offline cache
  icon192.png / icon512.png   app icon
  jszip.min.js                ZIP library for Project Tools' File Renamer (works offline)
```

## Why everything sits in one flat folder

Every page links to the others by plain filename (`index.html`, `mms-checklist.html`),
and the service worker caches them by the same names. Keeping all files at the top
level means the site works from any depth (a repo root, a subfolder, or opened straight
from disk) and every tool shares one origin, so the hub can read the checklists'
saved progress. Putting tools into subfolders would break every nav link.

The hub groups tools into two sections: Trading and Avera Energy.

## Hosting on GitHub Pages

1. Create a repo and upload all 17 files at the **top level** (not inside a folder).
2. Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Wait a minute, then open `https://<username>.github.io/<repo>/`.
4. On your phone: open that link → Share/menu → **Add to Home Screen**.

Any static host works the same way: Netlify (drag the folder onto the dashboard),
Cloudflare Pages, Vercel. The one requirement is HTTPS, otherwise the service worker
won't register and there's no offline mode.

## After you edit a page

The service worker serves the cached copy first, so phones can keep showing the old page.
Open `service-worker.js` and bump the version:

```js
const CACHE_NAME = 'checklists-v18';  // → 'checklists-v19'
```

Old caches are deleted automatically on the next visit. If you add a new top-level page,
also add it to the `ASSETS` list in `service-worker.js` (or it won't be available offline),
add a card for it in `index.html`, and optionally a shortcut in `manifest.json`.

## Where your data lives

Checkboxes, saved reports and the Trade Entry Desk log are in the browser's `localStorage`,
tied to the domain. Nothing syncs between devices, and clearing browser data for the site
erases it. Moving the site to a different domain starts you with an empty slate.

## Mobile behaviour

Every page has been checked at 360px and 375px phone widths: nothing scrolls sideways,
form fields are 16px (so iPhone Safari doesn't zoom in when you tap one), nav pills and
buttons are at least 40px tall on touch screens, and the tool nav stays on one swipeable row.
Each page registers the service worker, so opening any tool once is enough for it to work
offline. The mobile tweaks sit in a small `<style id="mobile-patch">` block at the end of each
page's `<head>`, so they are easy to find or remove.

`avera-project-tools.html` still needs Chrome or Edge on a computer for the Folder Sync Checker,
the Folder Generator and the File Renamer's folder mode (they use the File System Access API).
On a phone, the File Renamer's "Choose files" option works and downloads a ZIP.

## Things you may want to change

- `trading-checklist.html` → `STAGE1_GOAL_DATE` is set to `2028-12-24`, which sits well
  outside the 21 Jul – 21 Oct 2026 planning window. Both countdown dates are named
  constants at the top of the script if that was meant to be something else.
- `manifest.json` → `shortcuts` are the long-press menu on an installed app icon. Most
  platforms only show the first four, so Trade Entry Desk, Trading Operations, MMS and
  GemSpot are the ones that'll actually appear; reorder the list to surface others.
- `site-survey.html` deliberately saves nothing: each survey starts blank, and you
  print or screenshot the result before leaving the page.
- The hub's progress rings use fixed item totals (26 trading, 30 MMS, 12 GemSpot).
  If you add or remove checklist items, update those numbers in `index.html`.
