# Donte Miller — Connected-house prototype

A connected living-room and dining-room experience for the personal website. Uses real Three.js geometry, animated book covers, a readable press index, a condensed edition of the supplied ten-year report, and an opportunities notepad.

## Run locally

From this folder, run `npm run dev` and open `http://127.0.0.1:8788`. `PORT` can override the default loopback port. Run `npm run check` for JavaScript syntax checks and `npm test` for scroll-boundary regression checks. No dependency installation or build step is needed; runtime libraries are vendored.

## House journey

The root opens in the living room. Scrolling pulls back and turns through the right-hand arch, enters the dining room, and rises toward the approved table camera. Room navigation provides Living room, Dining room and The table stops; reduced motion uses immediate room selection. `#living`, `#dining` and `#table` remain direct destinations.

The portrait opens About; six frames open Forbes, Georgia Trend, Atlanta, Morehouse, Echoing Green and Village information. Frames use supplied founder context and supporting public links. `#about`, `#forbes`, `#georgia`, `#atlanta`, `#morehouse`, `#echoing` and `#village` open the corresponding detail panel. Escape or the return control closes it.

On phones, a focused portrait view and a six-item recognition menu keep all credentials accessible.

The connected room geometry and furniture are modeled in Three.js. The portrait texture is cropped at runtime from a compressed copy of the supplied living-room reference; the original remains in the parent reference folder. Wall, upholstery and mural textures are procedural. No screenshot is used as a flat room background.

## Interaction

Select a physical object or its labeled control, or keep scrolling down from the table to open the next object. Magazine and report content stays inside an open two-page book with a fixed left page, center crease and paper edges; the notepad uses spiral-bound ruled paper. Narrow screens show one framed page. Keep scrolling through the text and beyond the end to return the publication and open the next. This works in one continuous wheel/trackpad stream: no pause or new gesture is required, and small deltas accumulate. The next publication starts at its beginning. A short reveal guard prevents one burst from skipping straight through a newly opened publication. Scroll upward through the beginning to return to the table. A downward table gesture then reopens that same object. Single-finger touch, Page Up/Down and arrow keys share the same scroll controller; physical-device touch testing remains outstanding. Escape or “Back to the table” remains available. Direct destinations use `#press`, `#report`, and `#opportunities`.

The report reader is a clearly labeled condensed web edition. The complete supplied PDF is available from that reader. Photo/PDF originals are copied without alteration. Cover type and images are composed as browser-native 3D textures.

## Scope and next work

Implemented: living room with portrait and recognition panels, connected archway and dining-room architecture, reversible scroll camera route, room navigation, table, three object rigs, single-approach camera transitions without overhead turning, three publication-styled readers, guided continuation, hash navigation, reduced-motion option, original PDF access, desktop and narrow layouts.

Future: library/course books, accounts/payment services, more precise paper-to-reader alignment, and production art fidelity. The first version uses a matched paper-colored dissolve during the final reader handoff. Physical-device touch testing remains outstanding.

## Records

The maintained project handoff is `../HANDOFF.md`. Visual checks and source extraction are in ignored `qa/`; the five room references and complete build plan are in the parent folder.

## Runtime libraries

- Three.js 0.186.0, MIT: https://github.com/mrdoob/three.js
- GSAP 3.13.0: https://gsap.com/standard-license/
- Vendored files downloaded from version-pinned jsDelivr package paths. Preserve license headers.
