# Asset Sentinel - Blue + Black (separate files)

| File | Purpose |
|---|---|
| `cloudpage.html` | Paste into a CloudPage (Landing Page > HTML Paste). AMPscript reads your DE. Edit the CONFIG block. |
| `asset-sentinel.css` | Styles (blue + black). |
| `asset-sentinel.js` | React UI (no build step). |

1. Upload `asset-sentinel.css` and `asset-sentinel.js` somewhere public (Content Builder or your own host).
2. In `cloudpage.html` set `@cssUrl`, `@jsUrl`, `@logoUrl`, `@deName`, `@activeValue`, `@inactiveValue`, `@secret`.
3. Publish and open `...?t=YOUR_SECRET`.

## Right-side gap fix
The old hero used `margin:0 calc(50% - 50vw)`. `100vw` includes the scrollbar width, so once the content was tall enough to show a scrollbar the page became wider than the screen, leaving a gap on the right. The hero is now a normal full-width block (no `vw` units), so the gap cannot appear.
