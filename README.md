# OILTRACE — Satellite-to-Vessel Oil Spill Analysis

A frontend-only presentation prototype (SIH demo). **No backend, no APIs, no real GIS/SAR/AIS logic.**
All data is simulated in `js/data.js`.

## Run it

Any of these works:

```bash
# option 1 — simple static server (recommended)
python3 -m http.server 8080        # then open http://localhost:8080

# option 2 — just open the file
open index.html
```

GSAP + ScrollTrigger are vendored locally in `assets/vendor/`, so the prototype also works fully offline.

## Landing video

Drop your cinematic ocean clip at:

```
assets/video/landing-bg.mp4
```

The hero scrubs `video.currentTime` from scroll position (GSAP ScrollTrigger + smooth interpolation).
If the file is missing, a slow-panning ocean still is used automatically — nothing breaks.

## Routes

`index.html` (landing) · `login.html` · `dashboard.html` · `investigations.html` ·
`investigation.html` (overview) · `map.html` · `spill.html` · `drift.html` ·
`candidates.html` · `attribution.html` · `evidence.html` · `reports.html` · `settings.html`

## Demo notes

- Login is simulated — prefilled credentials sign you in; `Enter Demo Workspace` skips straight in.
- `Ctrl/Cmd + K` opens the command palette. `Esc` closes overlays.
- Topbar: **DEMO DATA** explainer, investigation quick-switcher (Gulf of Mexico / North Atlantic / Arabian Sea),
  notifications, presentation mode. The map page has a Focus Mode.
- Settings supports Dark / Light / System (persisted in `localStorage` only).

## Structure

```
assets/images   uploaded imagery, renamed semantically
assets/video    landing-bg.mp4 (you provide)
assets/vendor   gsap.min.js, ScrollTrigger.min.js
css/            reset · variables · global · layout · components · animations · landing · responsive
js/             data · components(shell/icons/ui) · router · animations · map-mock · interactions · landing · app
tools/smoke.js  dev-only jsdom smoke test (node tools/smoke.js)
```
