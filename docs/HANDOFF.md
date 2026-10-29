# Donte Miller personal website — handoff

Last updated: October 29, 2026 (America/New_York)

## Purpose and update rule

Latest research deliverable (October 28, 2026): `../../outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/house-3d-asset-catalog.xlsx`. Contains 60 current semantic asset groups across all four rooms, 65 possible additions, and 68 verified NVIDIA SimReady candidates. Four sheets: Review, Current assets, Room ideas, SimReady matches. Inventory is grounded in v29 scene source; repeated mesh components are grouped. The full paginated HF top-level directory was searched and all 68 candidate folders/root USD files were verified. Native hyperlinks (336), counts, formula scan and sheet previews checked. Candidate geometry, appearance, polygon counts and browser performance are NOT yet reviewed. Source metadata snapshots retained in `research/simready-2026-10-28/`. No changes made to the live website in this research task. Recommended next step: preview a small Workshop shortlist (monitor, keyboard, chair, pen/art supplies), then convert a single candidate to optimized GLB and compare with the custom painterly style before adding more.

This is the maintained working record for the personal website. Update it at meaningful implementation milestones and before ending work. Preserve confirmed decisions, verified results, unresolved issues, publication identity, and the exact next action. Never store credentials, tokens, or secrets here. Read this file before resuming.

Record-keeping and GitHub rules are in `CLAUDE.md` in this folder (added October 29, 2026). Follow them for every change.

## Current status

**Version 31 (environment first pass) is built, committed and pushed to GitHub branch `v31-environment` (`0f50fec813ad13524c70b0205d7d1cd36bfe0c69`). It is NOT deployed and has had no browser visual QA.** `main` still equals live version 30. See the October 29 Claude Code entry in the Change log.

**Version 30 is publicly deployed.** Room boundaries now trigger the entire existing camera journey with one nonzero scroll/swipe: Home (after About) → Table → Workshop (after notepad) → Library (after models), and reverse. Book/story reading remains distance-based. Momentum and held-touch guards prevent chaining rooms after arrival. Uses the existing tab-flight path and yaw rules, including left Workshop returns. Fresh arrivals reset sequences as before.

Validation: 50 automated tests pass plus syntax/whitespace checks. Local browser: one small upward wheel gesture Workshop → Table, then Table → Home; full arrival verified at Table. Home story overflow initiates Table travel. Physical-device touch has not been tested. Source `29979bf4d887b8b5d3e15b5483eaa174cbdda788`; saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_7e1c730c4118819195678c07bfc26633`; deployment `appgdep_6ae34c49b4e88191baac7d649fcfb9e6` succeeded, public audience preserved, GitHub main synced. Cache identifier `one-scroll-30`. Next: user mobile review. Workshop shortlist thumbnail review completed below.

### Workshop shortlist preview — October 29

Preview board: `../../outputs/01a17e65-f2e8-7ff3-87ee-f74b56c4d69d/workshop-shortlist/index.html`. Eight publisher thumbnails loaded and visually reviewed: monitor, keyboard, two office chairs, worn blue metal pen, wooden paintbrush, blue/orange dropper paint bottles. Recommend keeping existing wooden chair (both alternatives look corporate/institutional); shortlist monitor/keyboard for utility and pen/brush for strongest visual fit, with paint bottles as optional accents. Monitor thumbnail shows rear only. No 3D model import, geometry review, conversion, mobile performance measurement or live asset replacement has occurred. Next technical step: download monitor package with its dependencies/license, inspect USD in an isolated scene, convert to GLB with verified materials, and compare in a separate preview before site integration. Maintain clearance beside all opening sketchpads. Source package sizes are not GLB sizes.

### Previous release

**Version 29 is publicly deployed.** Workshop → Home explicitly takes a left departure turn toward the west passage. Previously shortest-angle interpolation could choose opposite sides of an almost-180-degree turn as responsive Workshop framing changed the initial direction. The narrow chat browser and wider Chrome window can therefore differ despite loading the same release. The new departure rule is scoped to Workshop → Home; position paths and other room pairs remain unchanged.

All 46 automated tests, syntax and whitespace checks pass. New regression samples the departure across phone, square and desktop aspect ratios and requires left-only yaw progression and west-facing passage arrival. Live Chrome and chat tabs were both reloaded and confirmed to load `/app.js?v=left-home-29`. Both were navigated to Workshop, then Home: intermediate screenshots showed the left turn past the shelves with the desk moving right, and both arrived at Home. Physical-device touch not tested; workbook unchanged.

Publication: source `3a11f85a09b2db60b456b8e121e0c3bf79320ab3`, saved version `appgprj_6ae15bcc240481919bd78aed4965cba4~appgver_122e20d6b0b0819181bd087a5fd26200`, deployment `appgdep_6ae2a6893840819192e44dcb68fda91d` succeeded. GitHub main synced; public access preserved. Next action: user review of the left return in their usual browser/window.

Live public URL: https://donte-miller-table-study.creamhero2050.chatgpt.site

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

Updated October 29, 2026: (1) Run browser visual QA of branch `v31-environment` against the before screenshots in `research/environment-2026-10-29/` (Home, Table, Workshop, Library at desktop and 390×844), fix regressions, then publish v31 through ChatGPT Sites and merge the branch into `main`. (2) Continue `environment-audit.md` production order step 2: living-room hero furniture. (3) Physical iOS/Android device pass (below) is still outstanding.

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

- October 29, 2026 (Claude Code session, continued): Donte chose to publish the planning docs to the public GitHub repo. Added `prototype/scripts/sync-docs.sh`, which copies this handoff, `CLAUDE.md`, `build-plan.md`, `camera-storyboard.md`, `environment-audit.md`, `reference-manifest.csv` and `../personal-website-strategy.md` into the repo's `docs/` folder. Originals here stay canonical. Scanned the docs for secrets first and found none. Docs committed to `main`; that commit is outside `dist/`, so the live site and deployment are unchanged. `CLAUDE.md` now requires syncing the docs after every handoff update.
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
