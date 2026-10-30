# Donte Miller personal website — handoff

Last updated: October 29, 2026 (America/New_York)

## Purpose and update rule

Latest research deliverable (October 28, 2026): `../../outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/house-3d-asset-catalog.xlsx`. Contains 60 current semantic asset groups across all four rooms, 65 possible additions, and 68 verified NVIDIA SimReady candidates. Four sheets: Review, Current assets, Room ideas, SimReady matches. Inventory is grounded in v29 scene source; repeated mesh components are grouped. The full paginated HF top-level directory was searched and all 68 candidate folders/root USD files were verified. Native hyperlinks (336), counts, formula scan and sheet previews checked. Candidate geometry, appearance, polygon counts and browser performance are NOT yet reviewed. Source metadata snapshots retained in `research/simready-2026-10-28/`. No changes made to the live website in this research task. Recommended next step: preview a small Workshop shortlist (monitor, keyboard, chair, pen/art supplies), then convert a single candidate to optimized GLB and compare with the custom painterly style before adding more.

This is the maintained working record for the personal website. Update it at meaningful implementation milestones and before ending work. Preserve confirmed decisions, verified results, unresolved issues, publication identity, and the exact next action. Never store credentials, tokens, or secrets here. Read this file before resuming.

Record-keeping and GitHub rules are in `CLAUDE.md` in this folder (added October 29, 2026). Follow them for every change.

## Current status

**Full-screen room on phones is live** (October 29, 2026, `main` merge `c9c41f3e7e76ac532f76f870cedcb67b9a324993`; cache `fullscreen-42` / `fullscreen-24` / `readability-22`): the 3D room fills the whole phone screen, the Table widens its lens so all three objects fit, and the Home award buttons show only their names (no label, no arrow).

**Story return and 'Scroll down' hints are live** (October 29, 2026, `main` merge `6eb028c776c7d48ca2c13fe7fb40c4223374bf1b`; cache `story-return-41`). Notepad page redesign draft is paused on branch `notepad-page` (`dc005a9`) awaiting Donte's design input.

**About wall is live** (October 29, 2026, `main` merge `a0c3d67fc9cd2fe2ac521230489a5ee6b1c39ed4`; cache `about-wall-39` / `readability-19`): the first scroll at Home turns left to a 3D shelving wall built from Donte's reference; the story scrolls on the right (below the shelves on phones); leaving turns right straight to the table (build-plan §19.1).

**Bigger table objects on phones are live** (October 29, 2026, `main` merge `0c111380db4d0e62fc8d697df2b8fc10d66a0915`; cache `environment-34`): a level row with narrower gaps and a closer camera on phones (build-plan §19.2 A).

**Mobile polish is live** (October 29, 2026, `main` merge `e29817f6db76ad6cb235751c6e31f4215423b04e`; cache `environment-32` / `readability-18`): library-style award buttons, arrow-free "scroll down" hints, finished Table books reopen at the top, smaller phone text boxes (options 1 + 2), and the wordmark on glass.

**Readability Phase 4 is live** (October 29, 2026, `main` merge `7a10bb20bf26d6fca3c15b177bec1b9a41969bfb`): readable panels and readers.

**Readability release is live** (October 29, 2026, `main` merge `c7a581c7f279ec54978a16da4e5690f2f31e9d75`): lighter blue text style and phone plaque buttons, on top of version 31. See the Change log.

**Version 31 (environment first pass) is live** at https://www.dontelamonte.com (Vercel), released October 29, 2026 from `main` merge commit `324827a2139be399d69d5287ab7398c83cfdaad9`; cache identifier `environment-31`. See the Change log.

**Version 30 is publicly deployed.** Room boundaries now trigger the entire existing camera journey with one nonzero scroll/swipe: Home (after About) → Table → Workshop (after notepad) → Library (after models), and reverse. Book/story reading remains distance-based. Momentum and held-touch guards prevent chaining rooms after arrival. Uses the existing tab-flight path and yaw rules, including left Workshop returns. Fresh arrivals reset sequences as before.

Validation: 50 automated tests pass plus syntax/whitespace checks. Local browser: one small upward wheel gesture Workshop → Table, then Table → Home; full arrival verified at Table. Home story overflow initiates Table travel. Physical-device touch has not been tested. Source `29979bf4d887b8b5d3e15b5483eaa174cbdda788`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_7e1c730c4118819195678c07bfc26633`; deployment `appgdep_6ae34c49b4e88191baac7d649fcfb9e6` succeeded, public audience preserved, GitHub main synced. Cache identifier `one-scroll-30`. Next: user mobile review. Workshop shortlist thumbnail review completed below.

### Workshop shortlist preview — October 29

Preview board: `../../outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/workshop-shortlist/index.html`. Eight publisher thumbnails loaded and visually reviewed: monitor, keyboard, two office chairs, worn blue metal pen, wooden paintbrush, blue/orange dropper paint bottles. Recommend keeping existing wooden chair (both alternatives look corporate/institutional); shortlist monitor/keyboard for utility and pen/brush for strongest visual fit, with paint bottles as optional accents. Monitor thumbnail shows rear only. No 3D model import, geometry review, conversion, mobile performance measurement or live asset replacement has occurred. Next technical step: download monitor package with its dependencies/license, inspect USD in an isolated scene, convert to GLB with verified materials, and compare in a separate preview before site integration. Maintain clearance beside all opening sketchpads. Source package sizes are not GLB sizes.

### Previous release

**Version 29 is publicly deployed.** Workshop → Home explicitly takes a left departure turn toward the west passage. Previously shortest-angle interpolation could choose opposite sides of an almost-180-degree turn as responsive Workshop framing changed the initial direction. The narrow chat browser and wider Chrome window can therefore differ despite loading the same release. The new departure rule is scoped to Workshop → Home; position paths and other room pairs remain unchanged.

All 46 automated tests, syntax and whitespace checks pass. New regression samples the departure across phone, square and desktop aspect ratios and requires left-only yaw progression and west-facing passage arrival. Live Chrome and chat tabs were both reloaded and confirmed to load `/app.js?v=left-home-29`. Both were navigated to Workshop, then Home: intermediate screenshots showed the left turn past the shelves with the desk moving right, and both arrived at Home. Physical-device touch not tested; workbook unchanged.

Publication: source `3a11f85a09b2db60b456b8e121e0c3bf79320ab3`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_122e20d6b0b0819181bd087a5fd26200`, deployment `appgdep_6ae2a6893840819192e44dcb68fda91d` succeeded. GitHub main synced; public access preserved. Next action: user review of the left return in their usual browser/window.

Live public URL: https://www.dontelamonte.com (Vercel, since October 29, 2026). Legacy ChatGPT Sites URL: https://donte-miller-table-study.creamhero2050.chatgpt.site

Implemented house journey: root opens the living room; scroll shows a welcome and then moves the complete About text as one continuous serif passage before room travel. The portrait jumps into this inline story. Six plaques open recognition/education/work details. Further scroll follows continuous camera/gaze curves through the real arch into the dining room and down to a lower table view. Four navigation tabs: Home, The Table, The Workshop, and The Library. Each tab animates one uninterrupted 3D walk to its selected room; Home resets the narrative. Phone layouts retain all six credentials.

Implemented table journey: select or scroll into magazine → lift/open into one readable paper page → intentional continued downward scroll at the end → close/return magazine → open ten-year report → continue to spiral-bound opportunities notepad → return to table. Readers remain visually inside publications. Scroll beyond the beginning to close and return to the table; the next downward table gesture reopens the same object. Explicit return/continuation controls remain available. The continuous-scroll fix is publicly deployed. Idle-gap/time/delta gates were replaced with accumulated boundary movement. Local and live browser QA completed the entire scroll-only tour; Donte subsequently confirmed “It works!” on October 27, 2026. The continuous-scroll issue is resolved. Public access remains enabled.

Implemented Workshop and library journey: after the opportunities notepad, scrolling travels through the dining-room doorway to the 3D Workshop wall and pauses at its desk. The three sketchpads open in order on continued scroll, with visible controls for direct selection. Each has its own URL (`#model-{id}`) and a readable single-page explanation grounded in Donte’s model notes. A reverse scroll from the top closes the pad. Scrolling past the final pad turns to the library shelves. The Library tab and table-footer shortcut also reach the shelves directly. Six 3D shelf books and six labeled controls select curricula. Continued downward scrolling at the shelf opens Flourish Fellowship on every fresh Library visit, then overflow at the end of each preview closes it onto the shelf. A fresh scroll after a pause opens the next book in shelf order, while any other book can be clicked. Scroll distance beyond the shelf is retained while the camera eases into place; scroll input during cover transitions is buffered and applied to the opened reader. After Funds, downward overflow closes the book and flies directly Home without stopping at the table. The separate Back to shelf action and upward overflow at the beginning return to the shelf, and continued upward scrolling travels back toward the Workshop. Three previews include a chapter list and provisional sample first-chapter text. The other three announce coming soon. Direct routes `#library` and `#course-{id}` work. The library is an authored 3D first pass; detailed painterly asset fidelity remains future work.

## Confirmed user decisions

- Personal platform for Donte's work and future ventures; Village Micro Fund is a major component.
- Connected painterly house: living room → right-hand arch → dining room/table → turn into library.
- Use supplied room images as the visual targets. Build connected geometry and independent interactive objects.
- Living room: scrolling serif About narrative before room travel replaces the About Donte button; portrait is a shortcut into the inline story. Plaques/credentials link to recognition and background.
- Table: press magazine, ten-year report (Village and EnDAO), notepad (consulting, speaking, partnerships).
- Guided table order: magazine → report → notepad; preserve direct selection and return controls.
- Reader scrolling controls content while the room camera pauses. Continuous downward scrolling beyond the end must advance without stopping or clicking; a continuation button does the same. Upward scrolling beyond the beginning returns to the table.
- Library: Flourish Fellowship, AI, Blockchain; coming soon Cooperatives, Finance, Funds.
- October 28 revision: keep continuous scrolling through the library curricula in shelf order, smooth table-to-library movement, and add The Library to the top navigation. This supersedes the earlier two-tab preference.
- October 28 Workshop revision: insert a new stop at the blank blue wall before the bookshelves, visually guided by the supplied studio image; talk about the Worker’s Equity Fund, EnDAO and Time Bank; add The Workshop to the top navigation. The user asked to edit the plan first, then implement. `build-plan.md` and `camera-storyboard.md` were revised before source changes.
- October 28 correction: the Workshop reference is the desired **room design**. The desk and chair must exist in 3D, and the painting *inside* that image is the only part to mount on the wall. The original version 11 projected the entire room image as a framed plane; version 12 corrected it.
- October 28 refinement: smooth the dining-to-Workshop transition and use separate sketchpads for model exploration, with a scroll sequence like the table. A subsequent request requires a fresh Library visit to begin at Flourish Fellowship rather than the last visited curriculum. Both are implemented in version 13.
- October 28 revision: the sketchpads must lie flat on the desk rather than stand upright. After the Funds book, continued downward scrolling should return to Home. Version 14 implements both and preserves direct pad selection and Back to shelf.
- October 28 revision: Workshop sketchpads should open with the same physical book-to-page motion used on the dining table. Version 15 adds hinged covers, visible inside pages, coordinated pad/camera movement, and a reverse closing motion.
- October 28 revision: the final library book should move directly Home without a table stop; returning to The Table should restart the press-first scroll; each library book should close to the shelf with time to select another before the next opens. Version 16 implements these behaviors.
- October 28 refinement: remove the unnecessary turn toward the desk during the final Library-to-Home flight; open the dining-room notepad upward from its top spiral; move the small objects off the Time Bank sketchpad's opening path. Version 17 implements these changes.
- October 28 navigation revision: clicking a top tab should go straight to that room, without stopping at the rooms between. Version 18 implements direct tab landing in all four rooms while retaining the continuous route for scrolling.
- October 28 refinement: tab navigation must retain visible 3D travel between rooms while passing intermediate rooms without stopping; apply this to every room pair. Version 19 adds a separate continuous navigation flight, including a walking-height Home ↔ Library path that skips the table-reading stop and passes the Workshop without activating it. The build plan and camera storyboard were updated before implementation.
- October 28 motion and scale refinement: eliminate the extra left/down/right camera sweep in reverse room travel, and make the living room plus Workshop/Library wing only slightly deeper than their visible camera framing. Version 24 implements direction-space turns and an aspect-responsive front wall.
- Written lessons with downloadable resources. Each curriculum is purchased separately; each released curriculum has a free first chapter.
- Exact prices, access duration, final EnDAO URL, and future account/payment configuration remain undecided.
- User supplied `VMF_10yr.pdf` and approved using `AkuaRibbon.jpg` plus a title as a temporary cover. Current title: “Ten Years of Building Together.” The photo also appears on the press magazine and in both readers.
- User explicitly requested this maintained handoff record.
- User requested publication interiors instead of standalone reader pages, and scrolling from the table to open objects.
- Motion feedback: eliminate the small turn before opening; upward scrolling at the beginning must return to the table. Implemented one camera approach that stays in front of its target, preserved the resting object angle, and added upward exit for wheel, touch and keyboard.
- Donte confirmed the earlier **table-publication** continuous-scroll fix with “It works!” on October 27. On October 28, Donte separately reported that library continuous scroll still failed **both** at the shelves and between books. Version 10 addresses those two library gaps. Await user confirmation on their device; the live browser checks below establish a narrower result.

## Reading order / durable records

1. This handoff.
2. `../personal-website-strategy.md`: overall strategy and room/content mapping.
3. `build-plan.md`: researched specification, camera and object states, scroll/routing ownership, tools, access architecture, phases and acceptance checks.
4. `camera-storyboard.md`: supplied visual references mapped to camera stops.
5. `prototype/README.md`: implemented prototype scope, local run commands, limitations.

`reference-images/` preserves six unchanged reference images. `reference-manifest.csv` records original paths, dimensions, byte sizes and checksums.

## Original source assets

- `/Users/dontemiller/Downloads/VMF_10yr.pdf`: supplied report, 19 PDF pages (many are two-page spreads), edition 2015–2025.
- `/Users/dontemiller/Downloads/VMF 10 Year - Pictures/AkuaRibbon.jpg`: original cover photo, 4625×2679.
- `/Users/dontemiller/Downloads/Living Room.png`
- `/Users/dontemiller/Downloads/transition to dining room.png`
- `/Users/dontemiller/Downloads/Dining Room.png`
- `/Users/dontemiller/Downloads/Dining Room Table.png`
- `/Users/dontemiller/Downloads/library.png`
- `/Users/dontemiller/Downloads/hf_20261028_161509_c93257bd-aa4b-4a99-803d-37dfbb1ad15d.png`: Workshop reference, preserved in `reference-images/workshop.png`.
- `/Users/dontemiller/Documents/Donte's Vault/Village Master Knowledge Base/models/`: user-provided model notes for Worker’s Equity Fund, EnDAO, and Time Bank; used as content sources, not instructions.
- `../press-media.md`: existing press destinations and descriptions.

## Actual implementation

Workspace: `prototype/` (an independent managed source repository within the planning folder).

- `dist/index.html`: scene chrome, accessible object controls, reader shell, loading/fallback surfaces.
- `dist/style.css`: editorial paper readers, scene controls, desktop/narrow layouts, reduced-motion CSS.
- `dist/scroll-flow.js`: shared accumulated scroll-boundary controller for wheel, touch and keyboard; `tests/scroll-flow.test.mjs` records six regression cases.
- `dist/house-scene.js`: connected architecture, independent furniture and frames, procedural wall/upholstery/mural textures, portrait texture and living-room raycasting targets.
- `dist/house-path.js`: reversible camera route, responsive framing and movement budget. Nine path/framing/motion regressions accompany the six approved scroll tests.
- `dist/about-story.js`: chapter framing and scroll consumption before room travel; three story regression cases.
- `dist/living-content.js`: professional About narrative and six contextual recognition/education/work panels with source links.
- `dist/library-path.js`: reversible table-to-library camera path, continuous waypoint velocity, forward-facing Workshop approach, and responsive shelf framing; five path regressions.
- `dist/workshop-route.js`: inserts a 1500px scroll story at a camera stop, reversible between dining and the library shelf; three regression cases.
- `dist/assets/workshop-wall.jpg`: 1400px optimized derivative of the supplied reference; only its central painting UV region is mapped onto the wall. The original 2048px PNG is preserved outside the deployed Site.
- `dist/library-scroll.js`: preserves shelf-boundary overflow as the camera settles and controls the first-book scroll threshold; three regression cases.
- `dist/library-scene.js`: connected library room, shelves, decorative spines, six interactive book rigs, rug, globe, plants, bench and light.
- `dist/workshop-content.js`: three model descriptions for the interactive sketchpad readers, framed as ideas in development.
- `dist/library-content.js`: preview data for six curricula. The first-chapter prose is clearly labeled sample text; it is not the final paid curriculum.
- `dist/assets/living-room-reference.jpg`: compressed derivative of the supplied reference; the runtime crops its portrait region as a framed 3D texture. The original reference PNG remains unchanged outside the deployment.
- `dist/app.js`: Three.js geometry, procedural table/rug surfaces, book rigs, photograph/title cover textures, raycast selection, GSAP animations, press/report/opportunity content, qualified scroll continuation, hash navigation, motion preference and focus restoration.
- `dist/vendor/`: vendored Three.js 0.186.0 (`three.module.min.js` plus its relative `three.core.js` dependency), GSAP 3.13.0. Keep license headers.
- `dist/assets/akua-ribbon.jpg`: unchanged supplied photo.
- `dist/assets/vmf-10-year-report.pdf`: unchanged supplied PDF.
- `dist/assets/original-report-cover.png`: rendered original PDF cover for the full-document link.
- `server.mjs`: loopback static server with route fallback. Default port 8788.
- `package.json`: `npm run dev` and `npm run check`; no installation or build required.
- `qa/` (ignored): extracted report text, browser screenshots, narrow-preview wrapper.

The report reader is a **clearly labeled condensed web edition**, paraphrased from the supplied report, with the full original PDF available to open/download. Do not present it as a complete transcription. The source report was visually checked at the cover, founders' letter, and investment/EnDAO spread. Historical content remains attributed to the 2015–2025 edition.

The opportunities page uses mailto links to `donte@villagemicrofund.com`. It does not submit a server form or book an appointment. The EnDAO link leads to the actual report's EnDAO section pending a confirmed standalone destination.

## Verified publishing record

- Project ID: `appgprj_6ae15bcc240481919bd78aed4965cba4`
- Source manifest: `prototype/.openai/hosting.json`
- Static directory: `dist`
- Source commit: `5165d5871f1b29a141d2a1a869a4f034e03e4c84`
- Saved version ID: `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_2fff870b31648191988f7dc1a3f68ab5` (version 19)
- Deployment ID: `appgdep_6ae255acbc0c81918a7f73a11b180151`
- Native deployment status: `succeeded`, verified October 28, 2026.
- Live URL: https://donte-miller-table-study.creamhero2050.chatgpt.site
- Access: **public** as of October 27, 2026, 11:30 PM New York time. User explicitly confirmed “Make it public—anyone with the link.” Preserve public access on future deployments unless the user requests another change. Access policy revision: 2. Preserve the same Site identity.
- Packaged archive: `/private/tmp/donte-journey-19.tar.gz` (temporary convenience; source commit and repo are the durable record).

Version 19 publication, October 28, 2026: source commit `5165d5871f1b29a141d2a1a869a4f034e03e4c84`; saved version and deployment IDs above. Public audience and Site identity preserved; the same commit was pushed to GitHub `main`. Before implementation, the plan and camera storyboard specified one continuous flight per tab destination, with no intermediate stops. The separate navigation camera path uses a single eased flight, forward travel gaze, and an authored standing-height passage through the dining room for Home ↔ Library. The overhead table view is included only when Table is the destination or origin. Changing tabs mid-flight resumes from the current camera pose. Local browser QA visually sampled Home → Library and Library → Home, verified Workshop → Table, and confirmed a mid-flight destination change. Live QA verified both Home ↔ Library directions and correct room arrivals. Browser logs contain no warnings/errors. Syntax and all 32 automated checks pass. Physical touch-device QA remains outstanding.

Version 20 publication, October 28, 2026: source commit `34aede3fd0d4ba5fb0fb74e07bc1159ebfa7fa0f`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_c86abea66a748191a9fdc24147e4daf4`; deployment `appgdep_6ae259d5806481918a0e64a75b80a5e1` (`succeeded`). Same public URL and audience. Replaced the special final-curriculum return camera/gaze spline with the shared direction-aware room flight. Added the missing dining ceiling bridge and connected exterior wall behind the camera path, preserving the open east-west archways. Updated the build plan and camera storyboard with the connected-shell recommendation: fix path jerk through camera choreography and hide visible voids through enclosing architecture, without sealing room connections. Local browser QA verified Home → Library → Home plus Funds → Return Home; live QA verified Home → Library → Home and Flourish loads on its direct link. Browser warning/error logs are empty. `npm run check`, `npm test` (32/32), and `git diff --check` passed. The matching source commit was pushed to GitHub `main`; physical-device testing remains outstanding.

Version 24 publication, October 28, 2026: source commit `f2a1aab489ddaeca2fc4c7a905695088bdd41954`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_e8e9131a11588191ae91646dda7bae52`; deployment `appgdep_6ae297484d3c81919049d031de891bd6` (`succeeded`). Preserved public access and the existing Site URL. Replaced world-target interpolation with stable direction-space yaw/pitch blending so reverse and about-face routes never pass their gaze through the camera. Added a regression that checks finite unit directions and level 180-degree turns. The front shell now uses the current aspect ratio and ends at z=10.5 on wide screens, expanding only when narrower framing needs it. Local in-app browser QA verified Home → Library → Home and Workshop → Home at desktop width. Live QA repeated Home → Library → Home and returned a clean browser warning/error log. All 38 automated checks and syntax checks passed. Exact source commit pushed to GitHub `main`. Physical-device touch testing remains outstanding.

Version 21 publication, October 28, 2026: source commit `addd8db3638c2ce36d46ceed5220c54196793612`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_a6b072bb2cd08191a6bb5ed401e8baa2`; deployment `appgdep_6ae25b6b48bc8191ae0c13a0ec17e09e` (`succeeded`). Preserved public access and the existing Site URL. Live responsive verification caught that the version-20 wall sat in front of a camera backed up for narrow-screen framing. Version 21 moves the shared front wall to z=24 and extends the continuous ceiling to cover that camera envelope. Added a regression test across aspect ratios .4–.93. Verified the full living room, Home → Library → Home and Flourish direct load at a 390×844 viewport; local Funds → Return Home also passed. All 33 tests and syntax checks passed; browser warning/error logs are empty. Exact source commit pushed to GitHub `main`. Physical-device touch testing remains outstanding.

Version 18 publication, October 28, 2026: source commit `93d20072eddd6b4f7e6e1f0cc21a5718c6a6296c`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. Explicit room navigation now sets the destination camera and route state immediately; intermediate camera stops are reserved for the scroll journey. The Table resets to press-first, Library resets to Flourish-first, and Workshop resets to the first sketchpad. Local browser QA verified Home → Library → Home, Home → Workshop → Table, and the table landing; live browser QA verified Home → Library → Home. Syntax and all 29 automated checks pass. Physical touch-device QA remains outstanding.

Version 17 publication, October 28, 2026: source commit `aadbe2db503ba256f702f608108f6d6ae0df63d0`; saved version and deployment IDs above. Public audience and Site identity preserved; the same commit was pushed to GitHub `main`. The final Funds-to-Home camera flight uses a separate homeward gaze path so it does not turn back toward the Workshop desk after passing the shelves. The dining-room opportunities notepad has a top-edge hinge and flips upward. Workshop desk objects were moved clear of the Time Bank sketchpad. Local visual QA verified the return flight, the notepad opening and closing, and the unobstructed Time Bank opening; browser logs had no warnings/errors. A live browser smoke check opened the opportunities reader successfully. Syntax and all 29 automated checks pass. Physical touch-device QA remains outstanding.

Version 16 publication, October 28, 2026: source commit `1b95987c774047d48915a31eb23191356c3b9d24`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. Funds now closes into a continuous camera flight from the library through the Workshop and dining room to the living room, skipping the table camera stop. The Table tab and reverse travel back to the table reset scroll ownership to the press magazine and clear saved reader positions. Earlier curriculum books return to the shelf first with a 1.2-second scroll pause; visitors can select another title immediately or scroll again for the next in order. Local QA verified Flourish → shelf → Blockchain by click, Library → Table → scroll opens press, and Funds → Home without a table stop. Live QA verified Flourish → shelf and empty warning/error logs. Syntax and all 29 automated checks pass. Physical touch-device QA remains outstanding.

Version 15 publication, October 28, 2026: source commit `bd989412f10207eac218b176f8962b11d2184a0f`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. Each Workshop sketchpad now has a physical hinged cover and ruled inside page. Opening lifts the pad and moves the camera toward it, flips the cover, then hands off to the full reader; closing reverses the camera, cover, and pad positions. The selected pad keeps its desk orientation without the table books’ former pre-opening twist. Local and live browser QA visually verified the 3D reveal and reader; local browser logs had no warnings or errors. Syntax and all 29 automated checks pass. Physical touch-device testing remains outstanding.

Version 14 publication, October 28, 2026: source commit `2f58122ddccbca1edf4de1dd7bd2f435412b4bf4`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. The three colored, spiral-bound sketchpads are flat on the 3D desk; the computer was moved toward the wall to clear them. The pads remain independent click targets, tested by selecting EnDAO directly on the scene. The final Funds continuation now says “Return Home,” and scrolling past the end of Funds closes it and returns to `#living`. Local and live browser QA verified that route; live screenshot: `prototype/qa/live-workshop-v14.png` (ignored QA artifact). All 29 checks and syntax checks pass, and live browser logs show no warnings/errors. Physical touch-device testing remains outstanding.

Version 13 publication, October 28, 2026: source commit `5f28d4d26a258004fd8543fb01eccfe448f3090f`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. The dining-to-Workshop camera route no longer makes an early gaze detour toward the shelves. Three separate labeled 3D sketchpads now sit on the desk; each lifts and opens a ruled one-page reader. Scroll moves Worker’s Equity Fund → EnDAO → Time Bank → library; reverse scroll at a pad’s beginning returns to the desk. Fresh Library navigation and return to the shelf reset the guided starting point to Flourish Fellowship while intentional next-book progression remains sequential. Local browser QA verified the full Workshop sequence through Flourish, direct EnDAO URL, reverse scroll, and The Table → The Library reset after visiting AI; live browser QA verified the first published pad and no browser warnings/errors. JavaScript syntax and all 29 automated checks pass. Live screenshot: `prototype/qa/live-workshop-v13.png` (ignored QA artifact). Physical touch-device and narrow-viewport visual QA remain outstanding.

Version 12 publication, October 28, 2026: source commit `9c3a617339774c34b973bb2db7d91f4f1dbaea9b`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. This corrects Donte's clarified reference interpretation: the complete reference is a room design, not a framed room image. The workshop has a modeled desk with drawer pedestals, monitor, chair with upholstered back/arms, lamps, plants, cream surround and blue wall. A UV crop of only the central painting appears inside a modeled frame. The Workshop camera was widened while preserving route continuity. Browser QA verified the live room and scrolling into EnDAO with no errors/warnings; 28 automated checks and syntax checks pass. Live screenshot: `prototype/qa/live-workshop-v12.png` (ignored QA artifact). Physical touch-device and narrow-viewport visual QA remain outstanding.

Version 11 publication, October 28, 2026: source commit `bc05de24f7c80901a77d09de4e42466211477d34`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. Before implementation, `build-plan.md` and `camera-storyboard.md` were edited for the Workshop stop. The supplied 2048px studio reference is preserved in `reference-images/workshop.png` and deployed as a 1400px optimized JPEG wall texture. The camera now faces the blue wall at 76% of the table-to-shelf route and holds while scroll advances three concise model descriptions grounded in the user's `/models/` notes. Continued scrolling turns to the shelves; reverse scrolling returns through the model story. The top navigation has Home, The Table, The Workshop, The Library; `#workshop` is a direct route. Local and live in-app browser QA confirmed the artwork loads, all three model beats, library arrival, direct Workshop and Library tabs, and no browser warnings/errors. JavaScript syntax and all 28 automated checks pass. Live screenshot: `prototype/qa/live-workshop-v11.png` (ignored QA artifact). Physical touch-device QA and narrow viewport inspection remain outstanding.

Version 10 publication, October 28, 2026: source commit `a38663494dd826279b45c05650df75e5645d3759`; saved version and deployment IDs above. Public audience and Site identity preserved, and the same commit was pushed to GitHub `main`. Root cause at the shelf: scroll overflow was discarded while the camera eased toward its target, so a continuous trackpad stream could end without triggering Flourish. The new `dist/library-scroll.js` retains that overflow and opens the book when the camera arrives. During curriculum opening/closing, positive scroll input is now capped and carried into the next reader instead of discarded; the course reader no longer has a boundary settle gate. All 25 automated tests and JavaScript syntax checks pass. Local and live in-app browser checks confirmed Library tab, shelf → Flourish, and Flourish → AI by scrolling. Live screenshots: `prototype/qa/live-library-scroll-v10.png` (AI reader) and `prototype/qa/live-library-shelf-v10.png` (top navigation), both ignored QA artifacts. Small 2 px deltas are regression-tested in code; physical trackpad and touch-device QA remain unverified. User reported both failure points and has not yet confirmed the fix on their device.

Version 9 publication, October 28, 2026: source commit `a24d8ee2a07fe8e2f8052d45db80e05659444151`; saved version and deployment IDs above. The public audience and Site identity were preserved. The same commit was pushed to GitHub `main`. All 22 automated checks passed, including a new camera-velocity continuity case. Local browser QA scrolled through Flourish → AI → Blockchain → Cooperatives → Finance → Funds → shelf without selecting books; tested the new tab from Home and table, the return to Home, phone-sized three-tab layout and curriculum reader, and zero local browser warnings/errors. Live QA confirmed shelf → Flourish → AI by scrolling. Screenshot: `prototype/qa/live-library-scroll-v9.png` (ignored QA artifact). Physical-device touch remains unverified.

Version 8 publication, October 28, 2026: source commit `0c2f3be8f921cd4435f55578492797d54ec1994e`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_20be446fc6c48191924a0b84183fa097`; deployment `appgdep_6ae209394e4881919c5cdcec0d42342c`, status `succeeded` at 10:40 AM New York time. Public audience preserved. The same commit was pushed to `https://github.com/dontelamonte/donte-miller-personal-website.git` on `main`. All 21 automated checks pass, including the three new library-path cases. Local browser QA checked desktop and phone shelf framing, an opened phone curriculum page, and reverse scroll from the library to the table. Live QA confirmed public `#library`, the Flourish book opening into its reader and returning to shelf, plus downward scroll from the opportunities notepad through the table and doorway into the library. Live screenshot: `prototype/qa/live-library-v8.png` (ignored QA artifact). Do not claim physical-device touch verification.

The initial registration credential expired during implementation; a new credential was obtained for the same Site, and upload/package/deployment succeeded. Never create another Site to recover expired source access. Retrieve a fresh source repository write credential for this project ID when needed; pass it to the Sites helper through stdin, never arguments/files/output.

## Continuous scrolling fix — October 27, 2026, 11:38 PM

- User reported the continuous sequence still failed. Root cause: the wheel handler required both a 650 ms bottom dwell and an event gap over 140 ms, plus a delta over 5. An uninterrupted trackpad stream never met the idle-gap condition, and small deltas were ignored. The touch implementation also required a separate gesture starting at the bottom.
- Added shared `dist/scroll-flow.js`. It consumes movement within content, then accumulates overflow beyond the end to advance (160 px) or beyond the beginning to return to the table (100 px). No pause/restart gate or minimum individual wheel delta remains.
- Wheel input over either page, single-finger touch over the reader shell, and keyboard reading use the same controller. Browser zoom gestures are preserved. A 450 ms reveal guard discards boundary overflow while a new reader settles; movement during transitions is not carried into the next book.
- Guided advancement and scroll-opening from the table clear the next publication’s remembered position, so it opens at the beginning rather than at a previously visited ending. Direct selection still restores remembered reading position.
- Added six regression cases, including 2 px events every 10 ms (continuous trackpad stream), long-event overflow, reaching the last line without advancing, upward return, new-book reset/guard and reversing direction. All six pass; syntax/whitespace checks pass.
- Local browser QA passed table → press → report → notepad → table using downward scrolling alone. Long scrolls over the left page cross into the next object without another gesture; report/notepad both began at scroll position 0. Native public deployment succeeded (version 3). Live browser verification also confirmed press → report → notepad with scrolling alone, each next publication opening at position 0. The notepad’s downward exit completed at `#table` with all controls restored; the live QA tab had no warning/error logs. Screenshot: `prototype/qa/live-continuous-scroll-report.png`. Do not claim physical touch verification.

## Historical interaction revision — October 27, 2026

The continuous-scroll fix above supersedes the fresh-gesture requirement described in this historical record.

- Added an open two-page interior for magazine/report, stationary left page, visible gutter/stacked paper edges, and a spiral-bound ruled notepad. Narrow screens use a single framed page.
- Scrolling down from the table opens the next object without a click.
- Removed the second camera move across the overhead look-at axis, retaining a single approach with positive forward separation. Removed object straightening during opening.
- At the beginning, another upward wheel gesture closes the publication. Downward reading and upward reading inside content remain native. Reaching the top does not close in that same gesture; a fresh upward gesture is required.
- Verified wheel table → press, scroll content down → up to top while staying open, a fresh upward gesture → table, and correct hint to reopen that same publication.
- Verified continued downward wheel at the end of press opens report; Page Up from report beginning returns to table with the correct report-reopen hint. Direct notepad opening and its ruled/spiral layout were visually verified; upward wheel exits it.
- Added equivalent upward touch handling; physical mobile touch remains unverified.
- Latest local QA tab had no error/warning logs. The older unattributed browser error below is retained as historical context.
- Native private deployment succeeded for commit `9870cd56ad432a08a9a91bb5335c13e1c4ba560c`; same Site/audience retained.
- Browser screenshot: `prototype/qa/book-interior-scroll.png`.
- README updated; JavaScript/server syntax and whitespace checks passed.

## Initial prototype verification (historical baseline)

- JavaScript and server syntax checks passed with `npm run check` after the final source edits.
- Local server returned HTTP 200; actual Three.js scene rendered in the in-app browser.
- Verified all relative runtime dependencies exist. Fixed the initial missing `three.core.js` filename required by the Three.js module.
- Verified copied photo and PDF checksums equal their originals.
- Browser-tested press magazine opening and readable content.
- Scrolled through press to the bottom, then used a fresh downward gesture; confirmed magazine returned and report opened with `#report` URL.
- Verified direct `#report` load, report reader content, and full-PDF/EnDAO destinations in the rendered page.
- Used report continuation control; confirmed opportunities notepad opened with `#opportunities` URL and actual email destinations.
- Used Back to table; confirmed all three objects/resting controls restored.
- Verified reduced-motion toggle, immediate reader opening, Escape return, and browser Back restoring a report reader.
- Visually inspected 390-pixel-wide table and reader in a browser iframe. Fixed title/model crowding and overlapping mobile object controls. Narrow controls are now a separate equal-row menu; physical objects remain selectable.
- Desktop framing revised to keep the heading beside the table.
- `qa/table-desktop.png` and `qa/mobile.png` preserve browser screenshots.
- Native Sites tool verified a successful private deployment of the pushed source/archive.
- Visited the deployed URL; confirmed its owner-private ChatGPT sign-in gate. Hosted scene behavior was not re-tested past authentication; core interaction QA used the exact deployed source locally.
- The app panel opening tools returned a loading error at final handoff; the hosted URL was opened successfully in the existing browser tab instead.

## Limits and remaining work

- Living room, connecting arch, dining room, library, and selectable course books are implemented. Final course content, downloadable resources, user accounts, checkout, and paid-content access are not implemented.
- This is an authored 3D interpretation of the references. Furniture, plants, trim and procedural surfaces are simplified assets; final painterly asset fidelity and detailed carved ornament remain future work.
- The final paper-to-reader handoff currently uses a matched paper-colored dissolve; precise projected page-corner matching can be refined.
- Narrow-width layout was browser-checked; **physical iOS/Android touch and gesture testing remains outstanding**. Do not claim those devices passed.
- Rapid history changes during an opening/closing animation, interruption recovery, WebGL loss/fallback, and a broader browser/device matrix need further testing.
- External press destinations come from the existing founder context. Their links are present; each external publisher's current availability was not exhaustively reverified in this prototype pass.
- A historical browser log contained an unattributed MutationObserver error without a source URL; no prototype or vendored file contains MutationObserver. It did not recur in final version-6 local or live warning/error logs. The initial Three.js shadow warning was corrected by switching to `PCFShadowMap`.
- Font loading uses Google Fonts with local system fallbacks. Other runtime libraries are vendored.

## Exact next action

Updated October 29, 2026: the full-screen phone room is live; Donte checks it on their phone. The notepad page redesign stays paused on branch `notepad-page` until Donte gives design input.

Updated October 29, 2026: (1) Mobile polish is live; Donte reviews it on their phone. New planned work is in `build-plan.md` §19: a new About scene on the living-room wall (§19.1, live), bigger table objects on phones (§19.2 A, live), and redesigned reader pages (waiting on Donte's page images and a direction choice). If rooms still feel crowded, consider option 3 (collapse after arrival) in `readability-plan.md`. (2) Phase 5 still open: desktop scroll-through, the Worker's Equity sketchpad, and a real iPhone and Android check. (3) Continue `environment-audit.md` production order step 2: living-room hero furniture. (4) Donte confirmed the live site works on their phone (October 29); a separate Android check is still open.

Earlier milestone, still open: verify all twelve directed room-tab flights and the scroll-guided house tour on physical iOS and Android devices, paying particular attention to the new aspect-responsive walls after orientation changes. The three provisional curriculum samples still need Donte's final lessons and downloadable resources; obtain per-curriculum prices, access terms, and preferred payment provider before enabling purchase controls. Preserve the public Site identity and current room/scroll sequences.

## Resume / run instructions

1. Read this handoff and `prototype/README.md`.
2. Inspect `prototype/.openai/hosting.json` and Git status before edits; retain the same project ID.
3. From `prototype/`, run `npm run dev` for `http://127.0.0.1:8788`; loopback binding may require sandbox approval. Run `npm run check` after changes.
4. Use `cua_repl` for browser interaction. Reload its documentation if resuming from a computer-use summary.
5. Read the Sites skill at `/Users/dontemiller/.codex/plugins/cache/openai-curated-remote/sites/1.1.2/skills/sites/SKILL.md` before source synchronization/publication. Use its source helper and refreshed source credential; do not expose secrets.
6. After edits and checks, update this handoff with exact results, remaining limits, and any new verified deployment IDs/commit.

The temporary port-8788 preview server was stopped after publication. Restart it with `npm run dev` when local work resumes.

## Change log

- October 29, 2026 (Claude Code session): **Full-screen room on phones is live** at Donte's explicit request ("Release it"). Merged `full-screen-room` into `main` as `c9c41f3e7e76ac532f76f870cedcb67b9a324993` and pushed. Before push: `npm run check` passed, `npm test` 50/50, `git diff --check` clean. Vercel commit status `success`; the live page loads `app.js?v=fullscreen-42`, `style.css?v=fullscreen-24`, `text-styles.css?v=readability-22`. Live browser check at 375×812: the scene spans the full screen (0–812 px) at Home; award buttons show names only; the Table shows all three objects; no console errors. Not checked live: desktop, reduced motion, real phones. Rollback: revert `c9c41f3` on `main` or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session): **Full-screen room on phones** (Donte: "the view of the room to run the entire length of the phone screen instead of cut off"; mid-turn: "remove the 'recognition' and 'education' labels"). Cache `app.js?v=fullscreen-42`, `style.css?v=fullscreen-24`, `text-styles.css?v=readability-21`.
  - `dist/style.css`: the ≤560 px rule that drew the scene in a band (`top:135px;bottom:230px`, Table `top:225px;bottom:85px`) with fade masks now sets `#scene{inset:0;mask-image:none}`.
  - `dist/text-styles.css`: phones drop the cream header gradient (logo and tabs keep their glass); award buttons show the name and ↗ only (`content:"↗"` instead of `attr(data-kind) " ↗"`).
  - `dist/app.js`: new `tableFov(aspect)`. Backing the camera up for the taller screen put it above the ceiling, so tall phones widen the Table lens instead (about 62° at 375×812). It eases in over the final approach of the scroll tour and is used for tab navigation to the Table.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Browser QA at 375×812 on the local server: Home, About wall, Table (direct link and via the Table tab), Workshop and Library all fill the screen; all three Table objects in view; no console errors.
  - Not verified: desktop (changes are phone-only by media query / aspect < 0.9, but not re-checked), reduced motion, real phones, the live preview URL.
  - Git: branch `full-screen-room`, commit `40f81606ba8fa65b1cca133173fe957ae64804a0`, pushed. Not merged; not deployed to production.
  - Follow-up (Donte, mid-turn: "remove the arrows from the buttons at home on mobile"): the phone award buttons drop the ↗ too (`::before{content:none}`), cache `readability-22`. Checked at 375×812; check 50/50 tests, diff clean. Commit `7fb1778cfe198d44b173bfb4d73d744764d36611`, pushed to `full-screen-room`.
  - Next: Donte reviews and approves release.
- October 29, 2026 (Claude Code session): **Story return and "Scroll down" hints are live** at Donte's explicit request ("Release it").
  - Merged `story-return` into `main` as `6eb028c776c7d48ca2c13fe7fb40c4223374bf1b` and pushed.
  - Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - Vercel commit status `success`. The live page loads `app.js?v=story-return-41`, and its HTML hints read "Scroll down".
  - Verified live at 375×812: the table hint reads "Scroll down"; scrolling up from the Table lands on the About wall at "100% OF MY STORY", with the house hint "Scroll down". No console errors.
  - Not re-checked live: desktop, reduced motion, real devices.
  - Rollback: revert `6eb028c` on `main` and push, or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session):
  - **Donte tested the live site on their phone: it works** (About wall, table zoom and earlier releases). The physical-device check is done for Donte's phone; Android was not reported separately.
  - **Notepad redesign paused** at Donte's request, for more design input. The draft is committed on branch `notepad-page` (`dc005a9`, pushed; preview only). It has Caveat handwriting in blue ink, hand-drawn checkboxes, body text on the ruled lines, and a sticky note for the email. Known issue: the masthead label shows too small, because a more specific readability rule overrides it.
  - **Story return** on branch `story-return` (`4e2d1888ea081f8fe86375ccdd54367605c60c2c`, pushed; not merged, not live; cache `story-return-41`).
    - `dist/app.js`: `navigateRoom` gains an `aboutEnd` option. Scrolling up from the Table swaps the flight's final view for `aboutWallView` and, on arrival, calls `showAboutEnd()`: story at 100%, wall view on, text visible. Tabs and resets still land on the Home view.
  - **Hints**, at Donte's request: every visible scroll hint now reads just "Scroll down". This covers the room chips (`app.js` house hint and table hint), the Workshop card hint, and the reader footer (`index.html`). Screen-reader announcements keep their fuller wording.
  - **Verified locally:**
    - 1280×800: scrolling up from the Table lands on the wall at 100%; scrolling down returns to the Table; reading backwards counts down (72% after 10 steps); the first line turns back to Home.
    - 390×844: the Home tab gives the normal Home view; scrolling up from the Table gives the wall at 100%; all hints read "Scroll down".
  - **Checks:** `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - **Not verified:** reduced-motion mode, real devices for these two changes.
- October 29, 2026 (Claude Code session): **About wall is live** at Donte's explicit request ("Release it").
  - Merged `about-wall` into `main` as `a0c3d67fc9cd2fe2ac521230489a5ee6b1c39ed4` and pushed.
  - Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - Vercel commit status `success`. The live page loads `app.js?v=about-wall-39` and `text-styles.css?v=readability-19`, and `/assets/about-wall.webp` returns 200 (181,998 bytes).
  - Verified live at 375×812: one scroll at Home turns to the wall, the 3D shelves are above the story, and the story starts at 0%. No console errors.
  - An earlier live check jumped to the press magazine. The browser recorded a click from Donte in that page, and a clean re-run behaved correctly.
  - Not re-checked live: desktop, the walk to the table, real devices, performance on low-end phones.
  - Rollback: revert `a0c3d67` on `main` and push, or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session): **About wall: turn right on the way to the table** (Donte's request). On `about-wall` (`64727eb38546485127d1c60d3f09886329e0cef5`, pushed; not merged, not live).
  - `dist/navigation-route.js`: `blendViewDirections` gains a `'right'` turn option, and flights leaving the living room use it. From the About wall this makes a half-turn past the sofa instead of past the front wall. From Home it is the same as the shortest turn, so that view is unchanged.
  - Verified locally at 1280×800: early in the flight the sofa and portrait come into view, and it lands at the table.
  - `npm test` 50/50; `git diff --check` clean.
- October 29, 2026 (Claude Code session): **About wall scene built** (build-plan §19.1) on branch `about-wall` (`c875bd10a9bb2578193ff40c6f1f0b6d89e2c1ab`, pushed; not merged, not live).
  - **Decisions from Donte during the build:**
    - The étagère, the paintings and the plants are 3D objects, not a flat picture.
    - There is no pause at Home between the About wall and the walk to the table.
  - **`dist/house-path.js`:**
    - New `ABOUT_WALL_X`, `ABOUT_PANEL_LEFT_Z` (10), `ABOUT_PANEL_HEIGHT` (7.6) and `aboutWallView(aspect)`.
    - Phones: camera 10.5 from the wall, centred on the shelves. Desktop: up to 10 from the wall, shelves on the left, open wall on the right.
  - **`dist/house-scene.js`:**
    - The west wall is a painted canvas (blue `#2f4559`, brush texture, copper skirting and a moulding panel behind the text).
    - In front of it, laid out from the reference's pixel positions:
      - a two-tower étagère (cabinets, shelves, turned posts with knobs, a top shelf and cornice, a plinth);
      - six framed paintings, with artwork cropped from the reference;
      - five plates (cropped artwork) and seven porcelain vases;
      - stacks of books;
      - one instanced leaf mesh for the vines, shelf plants and fig (about 1,000 leaves);
      - 220 instanced orange blossoms.
  - **`dist/app.js`:**
    - New `aboutTurn` state and `setAboutTurn` / `resetAboutTurn` / `turnToAboutWall`.
    - The first scroll at Home turns to the wall (1.5 s, power2.inOut). The story fades in only once the turn is about 94% complete, and starts from its top (`ABOUT_STORY_START`).
    - Scrolling past the end flies straight from the wall to the table. Scrolling up from the start turns back to Home.
    - Tabs, resets and direct links clear the wall view. A direct `#about` link opens on the wall.
    - The about wall image is loaded alongside the portrait.
  - **`dist/text-styles.css`:** with `html[data-about-wall]`, the story box sits on the right on desktop (430 px, 20 px text). On tablets and phones it sits below the shelves (phones: 38vh, 17 px text). The room buttons hide while the wall is in view.
  - **New asset:** `dist/assets/about-wall.webp` (the reference cropped above the floor, 182 KB).
  - **Verified locally:**
    - 1280×800: turn, text hidden during the turn then shown, story 0→100%, direct flight to the table (already moving through the arch at 0.9 s), Home view unchanged.
    - 390×844: wall framing, scrolling up returns Home, the Table tab from the wall.
  - **Checks:** `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - **Not verified:** real devices, performance on low-end phones (the extra meshes and leaves), tablet sizes, reduced-motion mode.
  - **Not done:** scrolling up from the table returns to Home, not to the end of the story.
- October 29, 2026 (Claude Code session): **About wall image received.** Saved as `reference-images/about-wall.webp` (1024×1024, 210,672 bytes) and recorded in `reference-manifest.csv`. It shows a deep-blue wall with copper trim and a pair of wooden étagères with plants, plates and paintings.
  - Donte's decisions:
    - The whole wall is styled after the image, with the shelving scene on the left-to-middle of the wall. This replaces the earlier "framed piece" choice.
    - The story text scrolls up the right side, beside the shelves.
  - `build-plan.md` §19.1 updated. Recommended build: paint the wall to match, and place the shelving scene as a cut-out painted panel. An optional later pass adds a few 3D pieces in front of it for depth.
  - No site changes. A higher-resolution source image would help on phones.
- October 29, 2026 (Claude Code session): **Bigger table objects on phones are live** at Donte's explicit request ("Release it").
  - Merged `table-phone-zoom` into `main` as `0c111380db4d0e62fc8d697df2b8fc10d66a0915` and pushed.
  - Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - Vercel commit status `success`. The live page loads `app.js?v=environment-34`, which contains the phone framing constants.
  - Verified live at 375×812: the Table shows the level row, larger and with margins at both edges, with labels and hint in place. No console errors.
  - Not re-checked live: opening books (checked locally), desktop, real devices.
  - Rollback: revert `0c11138` on `main` and push, or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session): **Table phone layout revised.** Donte did not like the staggered layout and asked for the report to be level with the other books. On `table-phone-zoom` (`edfacfaeb99a1e9cd0b45befa44a8b041f8a4d00`, pushed; not merged, not live; cache `environment-34`).
  - Phones now keep a level row with narrower gaps: press x −1.62, report 0, notepad 1.5 (desktop −1.75 / 0 / 1.72). The pen is still hidden on phones.
  - The camera centres on the row (`TABLE_PHONE_CENTER` −0.13) with a half-width of 2.75; 2.45 put the outer books against the screen edges.
  - At 375×812, the objects are about 25–35% of the screen width (the magazine looks largest because it is nearest). On the live site they are about 22%.
  - Verified locally: 375×812 and 360×740 fit with margins; the report opens and returns to its place in the row.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - Not verified: real devices.
- October 29, 2026 (Claude Code session):
  - **Decisions from Donte**, recorded in `build-plan.md` §19: the About image is a framed piece; phones get option A; pages follow direction 1 ("true to the object").
  - **§19.2 A built** on branch `table-phone-zoom` (`84104b0cb06ba00c8a5efa2a539461d77d4c03c9`, pushed; not merged, not live; cache `environment-33`).
  - Finding: the camera alone could only gain about 10%, because the row already filled about 86% of a phone's width.
  - `dist/app.js` changes:
    - New `TABLE_LAYOUT` and `layoutTable()`. On portrait screens (aspect under 0.9), the report sits behind (z −1) and the press and notepad in front (z 0.95, x ±1.2). Both the live position and the stored home position update, and the layout switches on resize.
    - The pen is hidden on phones.
    - The phone table camera moves closer along the same viewing angle, fitted to a half-width of 2.5 (`TABLE_PHONE_HALF_WIDTH`).
  - Result: each object is about a third of a 390 px screen's width (was about a fifth), and the cover text is readable.
  - Verified locally:
    - 390×844 and 360×740: nothing cut off, labels and hint fit.
    - The report and press magazine open into their readers and return to their new spots.
    - 1280×800: the original row and pen.
    - No console errors.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean.
  - Not verified: real devices, and rotating a phone mid-visit.
- October 29, 2026 (Claude Code session): **Plan update, no site changes.** Added `build-plan.md` §19 at Donte's request, with a pointer in §15 and the new assets listed in §17.
  - §19.1: the About story moves to the blank wall left of the couch. The camera turns left, the wall shows Donte's image, and then the text fades in. Scrolling on turns back right and walks straight to the table.
  - §19.2: closer table framing on phones (options A, B and C; recommends A).
  - §19.3: redesigned pages for the 12 readers (four directions; recommends "true to the object" built on Donte's images).
  - Suggested order: 19.2 A, then 19.1, then 19.3.
  - Waiting on Donte: the wall image, the page images, and whether the wall image is a full-wall mural or a framed piece.
- October 29, 2026 (Claude Code session): **Mobile polish is live** at Donte's explicit request ("Release it"). Merged `mobile-polish` into `main` as `e29817f6db76ad6cb235751c6e31f4215423b04e` and pushed. Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Vercel commit status `success`. The live page loads `app.js?v=environment-32` and `text-styles.css?v=readability-18`. Verified live at 390×844: Table wordmark on glass (cream on indigo at 45%); Table intro note hidden, card 106 px tall; table hint reads "Scroll down to open the press magazine." with no arrow; award buttons navy with a "Recognition ↗" label; Home hint "Scroll down to read my story". No console errors. Not re-checked live: desktop, the book reset (verified locally), real devices. Rollback: revert `e29817f` on `main` and push, or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session): **Wordmark readability** (Donte: the logo isn't clearly visible at the top of the Table). On `mobile-polish` (`5a4e3fc32d22001ebd799237041b6506611344c2`, pushed; not merged, not live). Cause: the Table was the only room where the wordmark used dark ink with no backing, over the dark wall; between about 561 and 960 px the tab bar also overlapped it. `dist/text-styles.css` (cache `readability-18`): the wordmark sits on the same light indigo glass as the tabs and Reduce motion, in cream with a brass dot, in every room. Reading views keep their plain wordmark (verified: no backing, rust dot). From 561 to 960 px the tabs drop "The" so they clear the wordmark. Checked at 693×750 (Table, no overlap), 390×844 (Table) and 1280×800 (Home). Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Not verified: real devices.
- October 29, 2026 (Claude Code session): **Phone text boxes, options 1 + 2** at Donte's request ("Build 1 + 2"), on `mobile-polish` (`bb671febc665fc821858de1c757828d22fa91aba`, pushed; not merged, not live). `dist/text-styles.css` (cache `readability-17`), phones only (≤560 px):
  - Headline-only room cards: the sentence under the Home welcome, Table and Library headlines is hidden (the bottom hint already says what to do). Headlines are 28 px with tighter padding. The About story passage is unaffected (only the welcome stage is trimmed).
  - Slimmer Workshop card: the description and "Continue to the library" button are hidden; the three sketchpads sit in one row of 44 px buttons.
  - Measured share of a 390×844 screen, before → after: Home welcome 11% → 5%; Table intro 19% → 11%; Workshop card 35% → 15%; Library intro 17% → 9%. At 360×740 the Workshop buttons fit with no overflow and the card clears the bottom hint.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Local browser QA at 390×844 and 360×740. Not verified: real devices, desktop (rules are phone-only), Vercel preview build at time of writing.
- October 29, 2026 (Claude Code session): **Phase 5 phone scroll-through + mobile polish** (branch `mobile-polish`, `4021412e362319b2c0ad67473780af3a41bc5a58`, pushed; not merged, not live). Cache ids `environment-32`, `readability-16`.
  - Scroll-through on the live site at 375×812, by scripted wheel scrolling, with an automatic check every few steps for text off the screen edge and text under 11 px. Readers: Press → Report → Opportunities → back to the Table. Courses: all six, each closes to the shelf with the right "next" book; Funds returns Home. Sketchpads: EnDAO → Time Bank → Workshop. No overflow, no text under 11 px, no console errors. Cooperatives, Finance and Funds are short "coming soon" books (expected). Not covered: the Worker's Equity sketchpad, desktop size, real devices.
  - Donte's requests: (a) the phone award buttons (`dist/text-styles.css`) now match the Library book menu: a navy tile with a cream name and a small brass label (e.g. "Recognition ↗"). The arrow moved from the name into the label (`dist/index.html`). (b) Scroll hints no longer use down arrows and say "Scroll down …" (`dist/index.html`, `dist/app.js`). The reader footer now reads "SCROLL DOWN TO READ · UP AT TOP TO CLOSE" and fits on one line at 390 px. The "Download PDF ↓" link is unchanged. (c) A Table book closed at (or within 40 px of) its end now reopens at the top; a book closed partway still resumes where it was (`dist/app.js`, close handler). Verified locally: closed at 1310/1310 → reopened at 0; closed at 500 → reopened at 500.
  - Proposed, not built: options to shrink phone text boxes (`readability-plan.md`). Measured share of a 390×844 screen: Workshop card 35%, About story card 20%, Table intro 19%, Library intro 17%, Library menu 17%, award grid 14%.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Local browser QA at 390×844 (Home, Library, Workshop, the press magazine).
- October 29, 2026 (Claude Code session): **Readability Phase 4 is live** at Donte's explicit request ("Release it"). Merged `readability-phase-4` into `main` as `7a10bb20bf26d6fca3c15b177bec1b9a41969bfb` and pushed. Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Vercel commit status `success`. Verified live on `https://www.dontelamonte.com` at 390×844: page loads `text-styles.css?v=readability-15` containing the Phase 4 rules. In the report, section labels are 11 px, body text 15 px, page footer 11 px and reading-header tabs 13 px, with no header overflow. In the Village Micro Fund panel, the lead is 22 px, body 15 px, footer 11 px and fits. No console errors. Not re-checked live: other readers, desktop, the full scroll-through, real devices. Rollback: revert `7a10bb2` on `main` and push, or promote the previous Vercel deployment.
- October 29, 2026 (Claude Code session): **Readability Phase 4** on branch `readability-phase-4` (`ef6ad009ade51e7dd65cedfcf8937a560970b599`, Vercel preview `success`; not merged, not live). `dist/text-styles.css` (cache `readability-15`):
  - Labels raised from 6–10 px to at least 11 px: reader, course and sketchpad toolbars; mastheads; folios; page footers; section eyebrows; panel headers and footers.
  - 13 px: notes, hints and links, including the sketchpad continuation hint that had a forced 11 px.
  - Reading copy: press 14 px; report sections 16 / 15 px; sketchpad and course 16 / 15 px; panel body 15 px. The panel lead paragraph stays at 22 px (a first version accidentally shrank it; fixed).
  - Reading-header tabs 13 px.
  - Phones: the reader title is hidden in the page footer (it's already in the toolbar) and the panel footer label is hidden, so both footers stay on one line.
  - Verified in the browser at 390×844: press, report, opportunities, Flourish course, EnDAO sketchpad and Forbes panel, with the reading header fitting (no overflow) and footers measured on one line. At 1280×800: press, Morehouse panel, Time Bank sketchpad. No console errors. `npm run check` passed, `npm test` 50/50.
  - Not checked: every report and press section to the end, scroll-to-next flow with the taller content, real devices.
- October 29, 2026 (Claude Code session): **Readability release is live** at Donte's explicit request ("Release it"). Merged `readability-preview` into `main` as `c7a581c7f279ec54978a16da4e5690f2f31e9d75` and pushed. Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Vercel commit status `success`. Verified live on `https://www.dontelamonte.com`: page loads `text-styles.css?v=readability-10` (200), `<html data-text-style>` is set, the tab bar background computes to `rgba(16, 42, 59, 0.45)`, all six `data-kind` plaque labels are present, `/compare.html` returns 404, and the console has no errors. Browser screenshots of live Home at desktop width and at 390×844 show the lighter blue tabs and placards and the phone plaque buttons. Only Home was re-checked live. The app cache identifier is still `environment-31` (`app.js` unchanged). Rollback: revert `c7a581c` on `main` and push, or promote the previous Vercel deployment. Remaining: Phase 4 small text in panels and readers, real-device check.
- October 29, 2026 (Claude Code session): **Donte chose the lighter blue.** On branch `readability-preview` (`f5d44065115e63cc917e130aa969b1ab19740a80`, Vercel preview `success`; not merged, not live):
  - Lighter indigo glass (`#102a3b` at 45%, 14 px blur, soft text shadow) is now the default via `<html data-text-style>`. The `?text=` switch, the other variants and `compare.html` were removed. Stylesheet `text-styles.css?v=readability-10`.
  - Fixes found in browser QA: the About story card uses a deeper tint of the same blue (76%) because its long passage was hard to read over the sofa fringe on phones; the Workshop card was moved onto the lighter glass and raised on phones to clear its hint; the tab hover underline applies only on mouse devices (it stuck on Home); the Library card widened to 640 px so its heading fits on one line and clears the course covers.
  - Donte asked for nicer Recognition & Education buttons. On phones they are now small indigo plaques with a brass inner frame, a brass category label (`data-kind`: Recognition ×3, Education, Fellowship, Founder) and serif names. The redundant section heading is hidden, and arrows are joined to names with non-breaking spaces. Desktop is unchanged (click areas over the wall plaques).
  - Verified in the browser: Home (welcome, About story at full opacity), Table, Workshop and Library at 390×844, with element-overlap measurements (nav/intro, buttons/hints, Workshop card/hint, credential grid/hint); Home, Workshop and Library at 1280×800; press reader and Flourish course with the tabs inside the reading header; the Echoing Green card opening its panel. No console errors. With no input, a fresh `#library` load offers Flourish first (a hint naming AI came from a scroll in the pane).
  - Not done or verified: Phase 4 (7–9 px text inside detail panels and reader headers/footers); sketchpad reader and phone reading modes; real devices; the 4.5:1 worst-case rule (the light tint relies on blur and text shadow). `npm run check` passed, `npm test` 50/50, `git diff --check` clean.
- October 29, 2026 (Claude Code session): **Readability preview** on branch `readability-preview` (latest `463d69bc1e987399627a24715065dd31a85ae0e4`, Vercel preview `success`; not merged, not live). `dist/text-styles.css` holds the style options; each is active only with `?text=` in the URL, and without it the site is unchanged. Options: `glass` (indigo 78%, first draft), `glass-light` (indigo 45%), `grey-light` (charcoal 40%), `paper`, `glass-scrim`. All use the type floor from `readability-plan.md`, full-opacity tabs with a brass current-room marker, and on phones: tabs without "The", 44 px tap targets, room text placed below the tab bar (fixes the Table overlap), and the duplicate room-name footer chips hidden. `dist/compare.html` shows four live copies side by side (current, glass, lighter blue, lighter grey) with Room and Phone/Desktop switches; it is for the preview only and must not be merged to `main`. Donte found the first glass draft too prominent, so the lighter blue and grey were added. Browser-checked: Home and Table at 390×844 (fixed footer chips overlapping the buttons; verified no overlap afterwards), and all options on Home (phone) and Table (desktop) in the comparison page. Edge shading looked muddy over the beige phone page. Not checked: Workshop and Library at phone width in the new styles, reading modes, real devices, and the worst-case contrast of the lighter tints (below 4.5:1 over pure white; they rely on blur and a text shadow). `npm test` 50/50. Next: Donte picks a tint.
- October 29, 2026 (Claude Code session): Donte reported that visitors struggle to read the tabs and on-scene text, mostly on phones. Audited `dist/style.css`. Causes: 7–10 px interface type, tabs dimmed to 65% opacity, text directly over the moving scene with only a text shadow, and a header color scheme that flips at the Table. Wrote `readability-plan.md`: three design options (indigo glass placards and tab bar, recommended; paper placards; edge scrims as a supplement only), a type-size floor, WCAG AA worst-case contrast rule with an automated test, phone tab layout, and five phases on preview branches. Linked from `build-plan.md` §15 and added to the docs mirror. Plan only; no site code changed, nothing deployed. Waiting on Donte's choice of tab style.
- October 29, 2026 (Claude Code session): **Version 31 released to production** at Donte's explicit request ("Release v31"). Merged `v31-environment` into `main` as merge commit `324827a2139be399d69d5287ab7398c83cfdaad9` and pushed. Before pushing: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Vercel commit status `success`. Verified live: `https://www.dontelamonte.com` serves `app.js?v=environment-31`; `/environment-materials.js` and `/house-scene.js` return 200; the live `house-scene.js` contains the tassel fix (no `tassel.rotation`). Live Home loaded in the browser pane, the loading overlay cleared, and the console had no errors. Not re-tested on the live site: Table, Workshop, Library rooms, tab flights, physical devices. Rollback: revert `324827a` on `main` and push, or promote the previous deployment in Vercel.
- October 29, 2026 (Claude Code session): **v31 browser visual QA** on local `v31-environment` (loads `app.js?v=environment-31`), compared with `research/environment-2026-10-29/` before screenshots. Viewports: 663×701 (matching the before shots), 1280×800, and 390×844 (Home, Table, Workshop, Library). Results:
  - Home: woven sofa fabric and ribbed domed shades read better than v30. **Regression found and fixed:** the new cylinder fringe was flipped (`rotation.z=PI`) and looked like a row of upturned flowerpots. Removed the flip in `dist/house-scene.js`, so the tassels are narrow at the hem and flared at the bottom; re-checked visually.
  - Table: composition unchanged from before; chairs show wood and fabric texture. Publications and controls in place.
  - Workshop: oval leaf placeholders replaced by thin trailing vines beside the painting (clear improvement). The Time Bank sketchpad opened by button with an unobstructed lift/flip and its reader displayed.
  - Library: textured spines; the globe sits on the top shelf. At 663×701 the globe sits just behind the end of the "Ideas to take with you." heading; at 1280×800 and 390×844 it is clear. Minor and left as is. With no user input, `#library` stayed on the shelf for about 12 s (no unintended auto-open).
  - Browser console: no warnings or errors in any check.
  - Test-harness notes, not site bugs: a hidden browser pane throttles animation frames, which left the loading overlay and one Library frame stuck until frames ran. Confirmed the overlay fades normally once frames run.
  - **Pre-existing, also on live v30:** at 390×844 the Table's "WELCOME. PULL UP A CHAIR." eyebrow sits under the room tabs. Not addressed in v31.
  - Checks: `npm run check` passed; `npm test` 50/50; `git diff --check` clean. Commit `e36a75b7a88f84021f7a5b705ec7daa8f3fc24e3` pushed to `v31-environment`; Vercel preview status `success`. Not merged to `main`, not live. Physical-device testing, all twelve tab flights and scroll-boundary journeys were not re-run in this pass.
- October 29, 2026 (Claude Code session): Donte moved hosting to Vercel at `dontelamonte.com`. Verified: apex redirects to `https://www.dontelamonte.com/` (served by Vercel), which loads `app.js?v=one-scroll-30` (version 30). Vercel commit status is `success` for `main` `26d6fb1` and for preview branch `v31-environment`. Only `dist/` is served; `/docs/HANDOFF.md`, `/README.md` and `/dist/index.html` return 404. Pushing to `main` now deploys production, so Claude Code can publish releases. `CLAUDE.md` deployment rules were rewritten for Vercel (merge to `main` only after QA and Donte's approval; verify status and cache identifier after release). The ChatGPT Sites host is legacy. The preview URL for v31 was not retrieved: the status link points to the Vercel dashboard and the Vercel CLI is not installed.
- October 29, 2026 (Claude Code session, continued): Donte chose to publish the planning docs to the public GitHub repo. Added `prototype/scripts/sync-docs.sh`, which copies this handoff, `CLAUDE.md`, `build-plan.md`, `camera-storyboard.md`, `environment-audit.md`, `reference-manifest.csv` and `../personal-website-strategy.md` into the repo's `docs/` folder. Originals here stay canonical. Scanned the docs for secrets first and found none. Docs committed to `main` as `d8e304f`; that commit is outside `dist/`, so the live site and deployment are unchanged. `CLAUDE.md` now requires syncing the docs after every handoff update.
- October 29, 2026 (Claude Code session): Read all planning docs and the prototype. Found version 31 environment work (`environment-materials.js` plus material/silhouette edits to `app.js`, `house-scene.js`, `library-scene.js`, `index.html` cache `environment-31`, `package.json` check script) uncommitted and unrecorded here, though `environment-audit.md` describes it as the "first pass implemented". `npm run check` passed; `npm test` 50/50 passed; `git diff --check` clean. No browser visual QA, live check or device test was done. Committed it as `0f50fec813ad13524c70b0205d7d1cd36bfe0c69` on new branch `v31-environment` and pushed it to GitHub; `main` (`29979bf`, live v30) unchanged. Not deployed. Added `CLAUDE.md` (handoff record + GitHub sync rules) and updated Current status and Exact next action. Workbooks referenced as `../../outputs/` resolve to `core/outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/` and were confirmed present.
- October 27, 2026: Confirmed three-room house, separate written-curriculum purchases, free first chapters and downloads.
- October 28, 2026: Diagnosed the final Library-to-Home turn as a separate hand-authored gaze flight. Reused the direction-aware room-tab flight for the final curriculum return. Added the dining ceiling bridge and shared perimeter wall sections while keeping the east-west archways open. Live responsive verification found the front wall obscured Home on narrow screens, so moved the perimeter beyond the camera envelope and extended the roof to meet it. Added a ratio-based camera clearance check. Published the correction as public Site version 21, confirmed the 390×844 Home and Library → Home experience, ran all 33 checks, verified empty browser warning/error logs, and pushed the matching source commit to GitHub `main`.
- October 28, 2026: Removed the reverse-flight pre-turn swing by interpolating normalized viewing directions instead of world targets. Made the living and east-wing front walls respond to the camera framing, keeping wide-screen rooms compact while preserving narrow-screen clearance. Verified Home ↔ Library and Workshop → Home locally, passed 38 automated checks, and published public Site version 24 from commit `f2a1aab489ddaeca2fc4c7a905695088bdd41954`.
- October 27, 2026: Completed researched build plan/storyboard; preserved and checked five room references.
- October 27, 2026: Report/photo supplied; inspected source report and began prototype.
- October 27, 2026: Created maintained handoff at user's request during implementation.
- October 27, 2026: Implemented table/book rigs/readers and guided continuation; passed syntax and core browser checks; refined desktop/narrow composition.
- October 27, 2026, 10:44 PM: Privately deployed source commit `6f02d689b8bf0358bfdb551bf91770fce1ab7e57`; native deployment verified succeeded.

- October 27, 2026, 11:18 PM: Implemented physical book interiors/notepad, scroll-to-open, removed the two-stage overhead camera turn, and added scroll-up-to-table. Syntax passed; wheel opening and upward return verified locally. Remaining QA and publication in progress.

- October 27, 2026, 11:23 PM: Published revised publication interiors and bidirectional scroll behavior as commit `9870cd56ad432a08a9a91bb5335c13e1c4ba560c`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_459ec5c27e0081918bb4f909e7686984`, deployment `appgdep_6ae16a961b5081919a5f7b42a1013393` (`succeeded`).

- Final handoff: opened the same private hosted URL; it displays the expected ChatGPT sign-in gate. Hosted behavior beyond authentication was not re-tested; browser QA used the exact published source locally. Temporary preview process (port 8788) stopped after successful publication.

- October 27, 2026, 11:30 PM: User reported the private sign-in gate prevented access. Initial attempt to make it public was rejected by automatic approval review because “unlock it” did not specify the audience. User then explicitly selected “Make it public—anyone with the link.” Native access update succeeded with `access_mode: public`, revision 2. Reloaded the hosted URL and confirmed the actual application replaces the sign-in gate. No source edit or redeployment was required.

- October 27, 2026, 11:38 PM: Investigated continuous-scroll stall; replaced pause-dependent boundary logic with accumulated overflow and added regression coverage. Local browser checks/publication in progress.

- October 27, 2026, 11:42 PM: Public deployment succeeded for source `bf49f46545631f29b14867deaac263d269e2ce1b`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_3f918be03ac88191a611d3034bbaa3c5` (version 3), deployment `appgdep_6ae16f1de1e88191b368555ffe930d60`. Site remains public.

- October 27, 2026, 11:45 PM: Completed public-host browser verification of press → report → notepad → table using downward scrolling only, without clicking continuation controls. The live page loads `/app.js?v=continuous-scroll-3`. Confirmed report/notepad start at top, clean local/live warning/error logs, and restored table controls. Six regression tests passed, including uninterrupted 2 px trackpad-style samples at 10 ms intervals. Temporary local preview server stopped after verification. Physical-device touch remains outstanding.

- October 27, 2026, 11:46 PM: Donte confirmed “It works!” and requested this handoff update. Marked the continuous-scroll issue resolved and recorded the working published baseline. No source changes or redeployment were needed. Remaining full-house/library work and physical-device QA remain outstanding.

## Living-room milestone — October 28, 2026 (implemented)

Donte authorized starting the proposed next milestone: build the living room from supplied references; connect living room → right archway → dining room → approved table through scroll-controlled camera movement; portrait opens About; plaques open recognition/education details; retain the approved continuous book sequence. Library remains a later milestone. Preserve source commit `bf49f46545631f29b14867deaac263d269e2ce1b` as the approved table baseline. Implement on the same public Site.

Source context read: founder profile, personal journey, body of work, press/media, awards/recognition, storyboard and room reference manifest. Use professional/public biographical details; personal-journey sensitive details are not necessary for this milestone. Echoing Green’s primary directory confirms 2022 Global Fellow. Morehouse is education. Founder context disagrees on Forbes recognition year; avoid a year unless independently resolved.

- Implementation milestone: connected Three.js living room/arch/dining architecture, reference-derived portrait texture, independent framed plaques, sofa/lamps/rugs/plants/lantern, scroll camera route, room menu and living detail panels implemented. Added `house-path.js`, `house-scene.js`, `living-content.js` and five camera/clearance regression cases. Initial syntax and all 11 tests passed. Browser verified portrait panel and dining-room rendering; visual framing and device/navigation QA in progress. The scene is an authored 3D interpretation with simplified furniture, not final photoreal/painterly asset fidelity.

- Local QA milestone: tested About panel, Echoing Green source link, Morehouse education panel, browser Back to the living room, 390×844 responsive layout with a focused portrait view and all six credentials in a menu, and reduced-motion room navigation. Mobile framing initially revealed fog/overly distant framing; corrected the camera fit, fog range and mobile scene layout. Phone-width wheel continuation press → report passed. These are responsive browser checks, not physical-device touch tests.

- Final checks: all 11 tests pass, covering the six approved continuous-scroll regressions and five camera-path/framing/clearance checks. Browser Back, recognition panels and reduced-motion room selection passed. Added an explicit guard so room URL synchronization cannot replace direct publication hashes during startup. Final direct-link/book-sequence checks and publication in progress.

- October 28, 2026, 8:43 AM: Final connected-house update publicly deployed as version 5: source `84dcf38f4a8581a63de8e4903f497c5595868fe4`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_2881470c92bc8191822e3b956ef829e7`, deployment `appgdep_6ae1edfb8a408191906204941a5f3a48` (`succeeded`). An intermediate version 4 was followed by a small detail-panel animation fix: added the missing `living-panel-paper` ID that caused GSAP null-target warnings.
- Display title updated to “Donte Miller — Make yourself at home.” Existing public URL/audience preserved. No new Site created.
- Supporting primary references: Echoing Green fellow directory (`https://fellows.echoinggreen.org/fellow/donte-miller/`), Atlanta 500 Business 2026 (`https://www.atlantamagazine.com/news-culture-articles/2026-atlanta-500-business/`) and education background in its 2024 edition. Georgia Trend years remain sourced to supplied founder context; its panel links the publication home page rather than inventing a precise profile URL. About excludes sensitive personal-journey details and avoids unverified current metrics/board roles.

- Final live verification: opened the published living-room homepage, selected the portrait, confirmed the About content and panel animation, and used Escape to return to `#living` with focus restored. Latest live warning/error logs were empty after the missing-panel-ID correction. Screenshot: `prototype/qa/live-living-room.png`. Desktop and 390×844 phone layouts were visually checked; browser Back, reduced-motion navigation, direct report hash, and scroll continuation to report/notepad/table were exercised locally. Physical mobile touch remains unverified. Browser viewport override reset. Temporary local preview server stopped; live public tab remains on the living-room homepage.

## Navigation, story and reader refinement — October 28, 2026 (published)

User requested exactly two navigation tabs, “Home” and “The Table”; the table shortcut should pass into the dining room and look down, with no separate dining-room tab. User reported jerky movement and suggested lower eye level. Implementing a lower 3.1-unit starting eye level, reduced table rise (7.8 vs 9.8), constant 46-degree lens, C1 continuous shape-preserving camera/gaze curves, and per-frame critically damped scroll following rather than restarting a tween on every wheel event. Table shortcut traverses the full route with one slower continuous animation. Old `#dining` links remain a compatibility alias to the table. Approved book continuation logic remains unchanged.

- Additional user correction during this pass: move the pen off the notepad and beside it because it intersects the opening page. Pen is now a separate named table-level group, outside the animated notepad rig and its selectable meshes; it stays on the table while the notepad lifts/opens.

- User added a scrollytelling About request: replace the About Donte button with serif text in the Home view. The actual four About paragraphs now unfold as five scroll chapters (welcome + four paragraphs), before any room travel starts. The Table shortcut bypasses the narrative and follows the room route. Home resets it; upward scroll can read backward. The portrait remains a shortcut into the inline story rather than opening the old About modal.

- Additional reader request: magazine and report now use a single paper page on desktop and phone, with a left binding shadow and stacked paper edges. Hidden facing cover removed from the visual layout. Content images are present in the single reading column. Existing scroll-boundary controller is unchanged. All 18 current tests and JavaScript syntax checks pass. Final desktop/mobile browser verification and public publication pending.

- Local verification completed: all five Home chapters in order before room travel; reverse story scroll; continuous Table shortcut ending at the lower table view; exactly two tabs; pen beside notepad at rest and outside the open paper; single-page magazine and report at 1280×720 and 390×844; downward magazine → report → notepad → table with scrolling alone; reduced-motion phone navigation. Local warning/error logs empty. Physical-device touch remains unverified. Screenshots: `prototype/qa/single-page-magazine.png`, `prototype/qa/single-page-report.png`, `prototype/qa/table-pen-beside.png`.

- October 28, 2026, 9:27 AM: Version 6 publicly deployed. Source `a8e740954a9dfe3c8a0a44412f0d06954672328c`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_4a2f4f34de908191bc3d48a45e494318`, deployment `appgdep_6ae1f834c058819188eb455d895b64be` (`succeeded`). Same public Site identity and audience retained. All 18 tests, JavaScript syntax and whitespace checks passed before helper committed/pushed/packaged the exact source. Runtime loads `/app.js?v=smooth-house-6` and matching CSS query. Live handoff verification completed: existing public tab reloaded version 6 with Home/The Table controls, report opened as a single page, latest live warning/error logs empty. Screenshot `prototype/qa/live-single-page-report.png`.

- Final cleanup: owned loopback preview server stopped after successful publication. Existing public browser tab retained for user review; single-page report screenshot saved as `prototype/qa/live-single-page-report.png`. Latest test source commit is clean in the prototype repository. This handoff lives outside that nested source repository and includes the post-publication IDs.

- October 28, 2026: Published the exact version-6 source to the public GitHub repository `https://github.com/dontelamonte/donte-miller-personal-website`. Local and remote `main` both resolve to `a8e740954a9dfe3c8a0a44412f0d06954672328c`; the local worktree is clean and tracks `origin/main`. GitHub reports `main` as the default branch and the repository as public. The GitHub CLI was installed through Homebrew and authorized by Donte for this push.

## Continuous About passage — October 28, 2026 (published)

Donte asked for the Home story to read as continuous text rather than separate paragraph cards. The four existing About paragraphs are now joined into one flowing passage and translated through a compact viewport in direct proportion to scroll. The welcome state stays at the beginning; the full passage still consumes its existing scroll distance before room travel starts, and scrolling upward reverses it. The panel is 214 px or less tall on desktop and 184 px or less on phones, placed below the modeled couch back in the checked views. Its dark blue background is substantially more translucent, with a small blur to keep the type legible. The progress label now shows the passage percentage instead of chapter numbers.

- Published public Site version 7: source `95e0bfc4d2f04629e9f68c51bc96dbe7ad29b922`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_3bfde0155280819191955ed27e6653fd`, deployment `appgdep_6ae2016eaf808191a31284be4b6be46f` (`succeeded`). Public URL and access mode are unchanged. The same commit was pushed to GitHub `main`.
- Verification: all 18 tests and JavaScript checks passed. Local desktop and 390×844 responsive views showed a continuous passage, readable translucent panel, and panel top below the couch back. The public deployment was reloaded and showed the new single passage and percentage counter. Live screenshot: `prototype/qa/live-continuous-about.png`. Physical-device touch remains unverified.

## About reveal, direct room tabs, and persistent navigation — October 28, 2026 (published)

Donte asked for the Home-to-About transition to feel smoother, for Home ↔ Library tab flights to stop making extra camera turns, and for the room tabs to remain available while viewing the table, publications, or Workshop. The About story now eases from 0 to full opacity and rises 22 px into its existing story position over the first 260 px of story scroll. Home ↔ Library now uses a four-pose route: Home, the living-room arch, the library-side arch, and the Library endpoint. The reverse route follows those exact poses in reverse, staying at walking height and passing through the intermediate rooms without stopping at the table or Workshop.

The room navigation remains present above the publication reader, curriculum books, and model sketchpads. In reading modes, the header uses a compact persistent bar; the reader/book stage starts below it so the controls do not cover the content. Workshop keeps the existing persistent header.

- Published public Site version 22 at `https://donte-miller-table-study.creamhero2050.chatgpt.site`: source commit `a4149a0bddb445e5b7deb66dc5e45ee6347575fa`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_1a2af86145948191944fdc8d9f0ab12a`, deployment `appgdep_6ae26cab7fb08191a5d4c6ec365212f6` (`succeeded`). Public audience unchanged. Matching source commit pushed to GitHub `main`.
- Verification: `npm run check`, all 34 tests, and `git diff --check` passed. Tests cover the easing curve and identical forward/reverse Home ↔ Library route. Local browser preview showed the About reveal, table navigation, and persistent reader controls. The published site was opened and checked in the press reader and Workshop; all four room tabs were visible above the reader and Workshop scene. Physical-device touch remains unverified.

## Site action and transition test plan — October 28, 2026

Created workbook `outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/site-action-transition-test-plan.xlsx` with 97 action/transition acceptance cases, the 34 existing unit tests, and a phased implementation/QA plan to enclose all four rooms with four walls. Tests are marked `Not Run` until executed; existing path/scroll unit coverage is clearly distinguished from browser acceptance. Areas include all room-tab direction pairs, Home/About and six credential plaques, table object entry/reading/reversal, workshop model pads, six curriculum books, navigation/history, responsive/accessibility/recovery, external links, and house-shell visual/camera checks.

Four-wall plan: map each room footprint, camera rail, portal, and void sightline; build a continuous floor/ceiling and four-sided wall shell for Home, Dining Room, Workshop, and Library; make doorways/arches deliberate openings aligned to the route; preserve the blue Workshop wall/art, desk/chair, feature props, and hit targets; then tune inside-facing materials, lighting, and camera bounds/collision. QA forward and reverse intermediate frames on phone and desktop, checking corners, seams, portals, camera clipping, prop occlusion, and all existing interactions. This is a plan only; no scene geometry has been edited or republished in this request.

## Four-wall enclosure implementation and first test run — October 28, 2026

Implemented the enclosure plan locally. The existing rear and front wall planes were retained, the front wall moved from `z=24` to `z=22` so reverse travel reads as an interior, and the previously open side-wall returns were extended to meet it. New returns close the living-room west exterior, the living/dining divider, the dining/Workshop-Library divider, and the east exterior of the Workshop/Library volume. Ceiling spans now derive from the shared rear/front bounds. Both arched east-west portals remain clear. Feature walls, the Workshop painting/desk/chair, Library shelves, furniture and interactive hit targets remain in place.

Added two enclosure-boundary tests that sample the complete Home → Table and Table → Library camera rails at multiple phone, square, desktop and wide aspect ratios. All 36 automated tests pass, along with JavaScript syntax checks and whitespace validation. Local browser QA covered normal-motion Home → Library and Library → Home intermediate frames, reduced-motion room endpoints, Press, the ten-year report, the opportunities notepad, the Forbes plaque, Worker’s Equity Fund sketchpad, Flourish Fellowship book, and direct navigation from an open reader/model/course. No void, blocked portal, lost header, or interaction regression was observed in those checks. The maintained test workbook now records 36 unit tests and nine browser cases as passed; the remaining cases stay `Not Run`.

- Published public Site version 23 at `https://donte-miller-table-study.creamhero2050.chatgpt.site`: source commit `adc6f6fcdf8193d21409246058ff06c7da2aca97`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_b96e0d13164c8191902afd38bb0f6d1a`, deployment `appgdep_6ae293945d60819193bdcfdc05a597ac` (`succeeded`). Public access and URL were preserved. The matching commit was pushed to GitHub `main`.

## Simplified tab routes — version 25 record

**Version 25 is publicly deployed.** Donte reported that version 24 still made unnecessary movements, especially Table ↔ Library and tab clicks. Rebuilt all room-tab routes using only endpoint poses and doorway approach points. Table ↔ Library no longer backs away from the table or visits Workshop presentation points. Gaze now has independent eased departure, level passage heading and eased arrival; it never tracks the route's vertical tangent. Workshop ↔ Library blends directly between endpoint directions. All 41 tests and syntax checks pass, including sampling all twelve directed tab curves at three aspect ratios for doorway clearance and every route for pitch bounds. Local browser QA captured Table → Library and Library → Table at intermediate points and verified Home → Table → Workshop → Home arrivals. Browser warning/error log was empty. Physical-device smoothness still needs user confirmation. Source `baf9c6691e834017be1326ca6d666e1922ce57b1` is synced to GitHub main.

Version 25 publication: saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_fec736e7a5888191bdda6025abef2e4a`; deployment `appgdep_6ae29d76d7f081919781bb96fff48854` succeeded. Public audience preserved. This change targets room-tab flights and their shared return-home flight; the scroll-guided tour still deliberately visits the Workshop. The test spreadsheet was not modified in this pass; these results are recorded here and in the repository's automated tests.


## Reversed Table → Workshop flight — October 28, 2026

**Version 26 is publicly deployed.** Table → Workshop now replays the established Workshop → Table camera movement in reverse, including both position and gaze timing. This removes the independently authored outward turn. All 42 automated tests, syntax checks and whitespace checks pass. The new regression compares 201 samples in each direction at phone, square and desktop aspect ratios, checking mirrored camera positions and viewing directions. No new browser visual or physical-device check was performed for this focused update; user confirmation of the feel remains pending. Source `865bc40789e59a842a733ce8548766d4e2a1a09f` is synced to GitHub main.

Version 26 publication: saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_05b2cfbbd6c08191aebfa0a5d57db0b6`; deployment `appgdep_6ae2a003312c8191a0c84bb2b9e19342` succeeded. Public audience preserved. The change applies to room-tab navigation; the scroll-guided tour is unchanged. Test spreadsheet not modified; results recorded here and in automated tests.


## One right turn and direct desk approach — October 28, 2026

**Version 27 is publicly deployed.** Latest user feedback supersedes the version-26 exact reverse-gaze choice. Table → Workshop now turns right once directly toward the desk, completes that turn during the first 38% of the tab flight, and holds the destination heading for the approach. The scroll route also replaces its old backward step (z=8.1) with a forward approach (x=1.2, y=4.5, z=4.6). Other room-tab gaze paths remain unchanged. All 43 automated tests, JavaScript syntax and whitespace checks pass. Local desktop browser QA inspected the tab departure, doorway/approach intermediate frames and desk arrival. Scroll geometry was verified by automated sampling; physical-device feel remains for user confirmation.

Version 27 publication: source `cacfff6f13f5cf8fa8f45406a26e6520f9892e8b`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_3a94f2fc84288191a9e7880e177fcc7c`, deployment `appgdep_6ae2a1cecf0c819180093fce759bb7d0` succeeded. Matching source pushed to GitHub main. Public audience preserved. Test spreadsheet not changed; results recorded here and in automated tests. Next action: user review of Table → Workshop using tabs and the continuous tour.


## Workshop return turns left — October 28, 2026

**Version 28 is publicly deployed.** Workshop → Table now blends directly left from the desk heading to the table heading rather than detouring through a west-facing about-face. The scroll route also uses a direction-space gaze during the table approach/departure to remove small direction reversals from independently interpolated world targets. Position routes and other tab pairs are unchanged. All 45 automated tests, syntax and whitespace checks pass, including left-turn regressions for both tab and reverse-scroll routes. No new browser motion QA was performed for version 28; user review in Chrome remains the next action.

Published source `eb82014121efbe5f898a5aa6e640f6524ae604f3`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_1e6feab583788191b0777dba3f229b7e`; deployment `appgdep_6ae2a4bcbf348191b5b8a562cb611132` succeeded. GitHub main synced. Public access preserved. Spreadsheet unchanged.

Browser discrepancy investigation: Chrome and chat-browser DOM script tags both showed version 27 before this fix. This ruled out an old top-level app version at the time of inspection, but no browser-specific root cause was established. Chrome logs showed extension warnings, not evidence that extensions caused camera behavior. User clarified the problematic direction is Workshop → Table. Avoid claiming a cache or Chrome-specific fault.


## Consistent left Workshop → Home departure — October 28, 2026

**Version 29 is publicly deployed.** Workshop → Home explicitly takes a left departure turn toward the west passage. Previously shortest-angle interpolation could choose opposite sides of an almost-180-degree turn as responsive Workshop framing changed the initial direction. The narrow chat browser and wider Chrome window can therefore differ despite loading the same release. The new departure rule is scoped to Workshop → Home; position paths and other room pairs remain unchanged.

All 46 automated tests, syntax and whitespace checks pass. New regression samples the departure across phone, square and desktop aspect ratios and requires left-only yaw progression and west-facing passage arrival. Live Chrome and chat tabs were both reloaded and confirmed to load `/app.js?v=left-home-29`. Both were navigated to Workshop, then Home: intermediate screenshots showed the left turn past the shelves with the desk moving right, and both arrived at Home. Physical-device touch not tested; workbook unchanged.

Publication: source `3a11f85a09b2db60b456b8e121e0c3bf79320ab3`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_122e20d6b0b0819181bd087a5fd26200`, deployment `appgdep_6ae2a6893840819192e44dcb68fda91d` succeeded. GitHub main synced; public access preserved. Next action: user review of the left return in their usual browser/window.
