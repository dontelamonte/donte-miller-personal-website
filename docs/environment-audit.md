# Phase 3 — environment audit and production queue

October 29, 2026. Baseline: published version 30. First refinement: version 31.

## Scope and evidence

Compared the six supplied room references with the actual browser views of Home, Table, Workshop and Library, and inspected scene geometry/material source. Screenshots are in `research/environment-2026-10-29/`. The dining-room frontal composition is assessed from its reference and scene source; a separate settled frontal camera is not currently exposed by the room tabs. This audit is not a completed camera-clearance or physical-phone performance certification.

The connected shell and interactive furniture already exist. The largest remaining difference is authored shape and surface character: simple straight-edged furniture, flat surfaces, sparse planting, generic rug patterns and uniform shelves. This is a production pass on the existing experience, not a framework migration or a change to the navigation sequence.

## Room-by-room findings

| Room | Reference character | Baseline finding | First pass | Remaining work |
| --- | --- | --- | --- | --- |
| Living | Plush indigo sofa, rust piping/tassels, domed porcelain lamps, aged red wall, ornamental frames | Composition and credentials are recognizable; shade cones and triangular sofa fringe look schematic; fabric appears flat | Woven/painted upholstery; shared plaster and wood surfaces; domed shades with radial ribs; finer cylindrical fringe | Softer sofa silhouette, back-cushion piping, carved side tables, more convincing porcelain decoration, frame ornament, reference-like rug |
| Dining/Table | Oval blue wood table, warm wood chairs, rust rug, blue mural, delicate plants | Table and publication positions work; tabletop already has grain; chairs are simple and rug pattern is generic | Textured chair wood and rust upholstery, shared wall/trim treatment | End armchairs versus front stools, mural wear and side niches, richer rug motif, bamboo-like plants, lantern detail; inspect room-arrival composition during travel |
| Workshop | Aged blue drawers, warm wooden desktop, chair, central painting, trailing greenery, working materials | Room is modeled correctly, but wall/desk are flat and hanging leaves resemble oversized oval placeholders; overlay obscures much of desk at narrow widths | Painted drawer finish, wood grain, softer plaster, woven seat, thin instanced leaves with curved stems around painting | Round chair and desktop edges, drawer seams/handles, pinned sketches and side art, floor rug, reference-like working clutter placed outside pad opening paths; review overlay size separately |
| Library | Uneven warm shelves, old books, trailing plants, globe, central low desk and layered rug | One broad regular shelf grid and uniformly plain spines; globe floats in upper book row | Shared wood and fabric/book surfaces; globe moved onto top shelf | Shape three distinct shelf cases, add central low cabinet, varied book stacks and spine artwork, trailing greenery, globe map, richer rug; preserve six readable curriculum targets |

## Production order

1. **Shared surface foundation and obvious silhouette fixes — first pass implemented.** Four shared 512×512 procedural texture families (plaster, wood, fabric, painted wood); cached materials for repeated book colors. No external model payload. Existing cameras, routes, object IDs and interaction hinges retained.
2. **Living-room hero furniture.** Refine sofa/cushion seams, side tables, porcelain and rug. Match the welcome composition before refining hidden decorative detail.
3. **Dining-room furnishing pass.** Differentiate two end chairs from stools; refine plants, mural/niches and lantern. Keep publications and pen clearance.
4. **Workshop furnishing pass.** Refine desk/chair shapes and arrange small decor at desk edges. SimReady shortlist is optional supporting research; inspect/convert one candidate before integration.
5. **Library composition pass.** Three shelf silhouettes, central cabinet, book stacks and greenery; preserve the large interactive course covers and their opening volume.
6. **Lighting and device gate.** Consistent warm directional light/contact shadows; inspect all twelve tab journeys and forward/reverse scroll boundaries. Measure initial transfer, decoded texture memory, draw calls and frame times on desktop and agreed phones. Correct clipping before adding detail.

## Acceptance and limits

- Preserve one-scroll room travel, tab destination behavior, fresh sequence resets, top-bound notepad/sketchpad opening and library pause.
- No new decorative objects in the desk/table opening envelopes or doorway camera corridors.
- Compare the same camera and viewport before/after; keep artwork and labels readable.
- Procedural textures are an interim authored surface foundation, not a claim of final reference fidelity.
- Four 512px RGBA texture families are approximately 4 MiB uncompressed base texture data, before mipmaps and renderer overhead; this is an estimate, not a whole-scene measurement.
- Unit and syntax checks do not establish visual quality, accessibility or physical-device performance. Phase 3 remains open until the visual/device gates pass.
