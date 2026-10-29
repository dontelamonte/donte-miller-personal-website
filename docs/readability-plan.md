---
title: Personal website — readability plan
category: founder / personal website
last_updated: 2026-10-29
owner: Donte Miller
related_files:
  - HANDOFF.md
  - build-plan.md
  - environment-audit.md
---

# Readability plan: tabs and on-scene text

October 29, 2026. Baseline: live version 31. Status: **plan only, not implemented.**

## Problem

Visitors have trouble reading the room tabs and the text placed over the 3D house, on desktop and especially on phones. The source (`dist/style.css`) shows four causes:

1. **Type is too small.** Most interface text is 7–10 px. Room tabs: 10 px (9 px on phones and in reading mode). Eyebrows ("WELCOME TO MY HOUSE", "THE LIBRARY"): 8–9 px. Room footer and scroll hints: 9–11 px. Table intro note: 11 px. Panel footer: 7 px. For comparison, phone body text is normally 16 px, and small labels shouldn't go below about 12 px.
2. **Text is dimmed on purpose.** Inactive tabs are at 65% opacity, and the welcome note at 85%. That lowers contrast further.
3. **There's no backing behind the text.** Tabs, welcome text, footers and hints sit directly on the moving scene with only a soft text shadow. Contrast changes frame by frame: cream text crosses the cream ceiling and walls, and dark text crosses the dark rug. The few places that already read well have a backing: the Workshop panel (dark indigo box), the Library course tiles, and the reading-mode header bar.
4. **The color scheme flips by room.** The header is cream text in most rooms but dark ink at the Table. On phones, the Table eyebrow also sits under the tabs; live v30 already had this overlap.

## Design options

All three keep the painterly house visible. Each borrows a material that already exists in the house so the change feels native rather than bolted on.

### A. Indigo glass (recommended for tabs and room text)

A translucent deep-indigo panel with a light blur behind it, in the style of the existing Workshop panel and reading header.

- Tabs: one slim frosted bar, or a rounded pill around just the four tabs, in indigo `#102a3b` at roughly 72–80% opacity with an 8–12 px backdrop blur, a hairline brass border (`#d7aa72` at about 40%) and cream text `#f6ead2`. The same bar is used in every room, which ends the Table color flip.
- Room text (welcome, Library heading, hints): the same glass as a compact placard, sized to the text, with soft corners and a brass hairline. It reads like a museum placard in the house.
- Why it fits: indigo and brass already define the sofa, the Workshop wall and the plaques.

### B. Paper placards (recommended for longer text on light scenes)

A cream paper card (`#f6eddb` at about 88–92%) with the same ink color as the readers (`#243d32`), a thin rule and a slight shadow. It matches the magazine, report and notepad. It works best at the Table, where the scene is light, and for the About passage if the indigo version feels heavy.

### C. Cinematic scrims (lightest touch)

Soft gradients at the top (behind the tabs) and bottom (behind the footer and hints) of the screen, fading from about 55% indigo to transparent over 120–160 px. No boxes; the scene stays open. On its own it doesn't guarantee contrast in every frame, so use it **together with** A or B, not instead of them.

**Decision, October 29:** Donte chose the lighter blue (indigo at 45%). The About story card keeps a deeper tint (76%) of the same blue for its long reading text. Phone Recognition & Education buttons were also restyled as small indigo plaques. Phases 1–3 are live (released October 29). Phase 4 is on branch `readability-phase-4`. Phase 5 device QA remains.

**Preview, October 29:** branch `readability-preview` adds `?text=glass | glass-light | grey-light | paper | glass-scrim` and a side-by-side `compare.html`. Donte found the first glass draft too prominent; lighter blue (indigo at 45%) and lighter grey (charcoal at 40%) were added. The lighter tints rely on a stronger blur and a soft text shadow, so they fall below the worst-case 4.5:1 rule over pure white; confirm on real scenes and phones before choosing.

**Recommendation:** an A-style glass bar for the tabs everywhere, A-style placards for room text, B-style paper only where a light scene suits it better (the Table intro), and a C-style top scrim on phones only, so the tab bar blends into the scene.

## Type and contrast rules

These apply whichever option is chosen:

| Element | Now (desktop / phone) | Target (desktop / phone) |
| --- | --- | --- |
| Room tabs | 10 / 9 px, 65% opacity | 13 / 14 px, full opacity; current tab marked by weight + brass underline |
| Eyebrows | 8–9 / 8 px, 2.2 px tracking | 11 / 11 px, about 1.4 px tracking |
| Notes, hints, footers | 9–12 / 9–11 px | 14 / 15 px (body notes 16 px on phones) |
| Panel and reader footers | 7 px | 11 px minimum |
| Headings | 35–65 px | unchanged; add a backing where they sit on the scene |

- **Contrast:** at least 4.5:1 for text under 24 px and at least 3:1 for larger headings (WCAG AA). Because the scene behind a translucent panel changes, check each panel against the **worst case**: the panel color composited over pure black and over pure white. A panel that passes both cases passes in every frame. This can be an automated test.
- **Tap targets:** tabs and buttons at least 44 × 44 px on phones.
- **No dimming as decoration:** remove opacity below 100% on text; use color or weight to show state instead.
- **Fallback:** where `backdrop-filter` isn't supported, raise panel opacity to about 90% so contrast holds without the blur.

## Phone layout

- Tab bar: four tabs at 14 px fit a 390 px screen if the labels shorten to "Home · Table · Workshop · Library" and the gaps tighten. Wrapping to two lines is the fallback below 360 px. Keep "Reduce motion" in the top row or move it into the footer.
- Content clears the bar: set one header-height variable and offset room text below it. This also fixes the Table eyebrow sitting under the tabs.
- Keep placards compact: one heading, at most two lines of note, then the scene. The phone view must still show the room.

## Implementation phases

Each phase goes on its own branch (Vercel preview), is shown to Donte, and is merged to `main` only with Donte's approval.

1. **Type and contrast foundation.** Add CSS variables for the type scale, glass and paper colors, and header height. Apply the size floor, remove opacity dimming, and use a single header color scheme. Add a Node test that checks every text/panel color pair against the worst-case contrast rules.
2. **Tab bar.** Build the glass bar or pill (option A), the phone labels and tap targets, and the phone top scrim. Check it during room travel, in reading mode and over a book or sketchpad.
3. **Room text placards.** Living welcome and About passage, Table intro and hints, Workshop (already has a panel; align its style), Library heading and tiles, and the bottom footers. Fix the Table heading overlap.
4. **Panels and readers.** Raise the small text inside detail panels and reader headers and footers (7–9 px) to the new minimums.
5. **QA and review.** All four rooms plus reading modes at 1280×800, 663×701 and 390×844, during and after room travel; the contrast test; a real iPhone and Android phone. Donte reviews the preview before each merge.

## Decision needed from Donte

Option choice before Phase 2: **A (indigo glass) for the tabs**, recommended, or a full-width bar versus a compact pill. A quick side-by-side of A, B and A+C on the preview is the best way to decide.
