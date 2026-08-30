# Checklists

Static site — checklist tools sharing one home page, one manifest, one service worker.

```
index.html                hub — links to every tool below
trade_entry_form.html     Trade Entry Desk — log a trade, grade it, copy the spreadsheet row
trade_entry_guide.html    Trade Entry Desk companion guide (opened via the small 📖 tab on its card)
trading-checklist.html    Trading Operations (Plan V1.0)
mms-checklist.html        MMS Strategy SOP
gemspot-checklist.html    GemSpot 盤前關卡 (pre-market gate)
task-checklist.html       Task Report → WhatsApp
site-survey.html          Avera Energy site survey (print-friendly)
manifest.json             install config (name, icons, shortcuts)
service-worker.js         offline cache
icon192.png / icon512.png app icon
```

Every page links back to the hub with a small "← All tools" nav, plus its own siblings:
Trading Ops / MMS / GemSpot are one group, Task Report / Site Survey are another, and
Trade Entry Desk / Guide are a third. The Site Survey nav is marked `no-print` so it
doesn't show up in the printed or exported PDF version of a survey.

Everything sits at the top level and links by plain filename, so the site works from any
folder depth — a repo root, a subfolder, or opened straight from disk.

## Hosting on GitHub Pages

1. Create a repo, upload all files at the **top level** (not inside a folder).
2. Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Wait a minute, then open `https://<username>.github.io/<repo>/`.
4. On your phone: open that link → Share/menu → **Add to Home Screen**.

Any static host works the same way — Netlify (drag the folder onto the dashboard),
Cloudflare Pages, Vercel. The one requirement is HTTPS, otherwise the service worker
won't register and there's no offline mode.

## After you edit a page

The service worker serves the cached copy first, so phones can keep showing the old page.
Open `service-worker.js` and bump the version:

```js
const CACHE_NAME = 'checklists-v10';  // → 'checklists-v11'
```

Old caches are deleted automatically on the next visit. If you add a new top-level page,
also add it to the `ASSETS` list in `service-worker.js` or it won't be available offline.

## Where your data lives

Checkboxes and saved reports are in the browser's `localStorage`, tied to the domain.
Nothing syncs between devices, and clearing browser data for the site erases it.
Moving the site to a different domain starts you with an empty slate.

## Things you may want to change

- `trading-checklist.html` → `STAGE1_GOAL_DATE` is set to `2028-12-24`, which sits well
  outside the 21 Jul – 21 Oct 2026 planning window. Both countdown dates are now named
  constants at the top of the script if that was meant to be something else.
- `manifest.json` → `shortcuts` are the long-press menu on an installed app icon. Most
  platforms only show the first four, so Trade Entry Desk, Trading Operations, MMS and
  GemSpot are the ones that'll actually appear there; reorder the list if you'd rather
  surface different tools.
- `site-survey.html` deliberately saves nothing — each survey starts blank, and you
  print or screenshot the result before leaving the page. Closing the tab loses the
  entries (the page warns you first). If you'd rather it autosave, that's a change
  worth making before you take it into the field.
- The hub's progress rings use fixed item totals (26 trading, 30 MMS, 12 GemSpot).
  If you add or remove checklist items, update those numbers in `index.html`.
