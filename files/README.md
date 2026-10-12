# Asset Sentinel – SFMC setup

## Files
| File | Purpose |
|---|---|
| `cloudpage-all-in-one.html` | **Use this one.** AMPscript + CSS + JS in a single file. Paste into a CloudPage. |
| `cloudpage-hosted.html` | Same page, but CSS/JS are loaded from URLs (needs the two files below hosted). |
| `asset-sentinel.css`, `asset-sentinel.js` | The UI (React, no build step). Only needed for the hosted version. |

## How the data flows
Your automation fills the DE → AMPscript on the page looks up the DE → builds JSON → React renders it.

DE columns used (rename in the CONFIG block if yours differ):
`TriggeredSendID` (key), `EmailID`, `LastModifiedDate`, `CurrentStatus`, `CampaignName`, `JourneyName`, `TacticID`, `EmailName`

Logic: rows with `LastModifiedDate` in the last 24 hours are shown.
`CurrentStatus = Active` → **Activated** (inactive → active), `Inactive` → **Deactivated** (active → inactive).

## Steps
1. **Web Studio → CloudPages → Create → Landing Page → Blank / HTML Paste.**
2. Open the HTML editor, delete everything, paste the contents of `cloudpage-all-in-one.html`.
3. Edit the CONFIG block at the top:
   - `@deName` – name of your status Data Extension (use the DE **name**, not the external key).
   - `@logoUrl` – public URL of the Amgen logo (Content Builder → upload image → copy published URL).
   - `@activeValue` / `@inactiveValue` – exact text in `CurrentStatus` (e.g. `Active` / `Inactive`).
   - `@secret` – long random string (or set `@requireToken` to `"N"`).
4. **Save → Publish.** Open the URL with the token: `https://pub.s##.exacttarget.com/xxxx?t=YOUR_SECRET`
5. (Hosted version only) Upload the `.css` and `.js` to Content Builder, put their public URLs in `@cssUrl` / `@jsUrl`.

## Notes and limits
- **2,000-row cap:** AMPscript lookups return up to 2,000 rows per call (one call each for Active and Inactive). Rows are ordered newest first, so the latest changes are always included.
- **Time zone:** SFMC DE dates are CST (UTC-6). `@tzOffsetHours = 6` converts them to UTC so every viewer sees their own local time. Change it if your dates are stored differently.
- **"Moved" detection:** this DE has only the current status, so any row whose `LastModifiedDate` is in the last 24 hours is shown, including edits that did not change the status.
- **Empty journey/tactic** shows as "—".
- **Security:** the token is a basic gate. For stronger protection use CloudPage SSO, and never put subscriber PII in the DE.
- **Debug:** add `%%=v(@json)=%%` temporarily to the page body to see the raw data. If the page shows an AMPscript error, check `@deName` and the column names first.
- The refresh button reloads the page, which re-runs the lookup.
