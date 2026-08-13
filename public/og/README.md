# OG images

`default.png` is a 1x1 placeholder so `resolveOgImage()`'s fallback path always
resolves to a real file instead of a 404 — it is **not** real artwork.

Per the design spec ("Image handling"), the real deliverable is one static
1200x630 PNG per category (`messaging.png`, `email.png`, `spreadsheet.png`,
`ai.png`, `crm.png`, `support.png`, `commerce.png`, `social.png`,
`finance.png`, `meetings.png`, `database.png`, `developer.png`) — a design
task, not a code task. Until each file is added here, `resolveOgImage()`
already falls back to `default.png` automatically, so nothing breaks in the
meantime.
