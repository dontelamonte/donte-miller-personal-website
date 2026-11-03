"""Generate uncropped, colour-profile-preserving mobile JPEGs. Requires Pillow."""
from hashlib import sha256
import json
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parents[1] / "dist" / "assets"
OUTPUT = ASSETS / "mobile"
OUTPUT.mkdir(exist_ok=True)
SPECS = [
    ("akua-ribbon.jpg", "akua-ribbon.jpg", 1536),
    ("living-room-reference.jpg", "living-room-reference.jpg", 1024),
    ("workshop-wall.jpg", "workshop-wall.jpg", 1024),
    ("original-report-cover.png", "original-report-cover.jpg", 560),
]
manifest = {}
for source, name, width in SPECS:
    source_path = ASSETS / source
    source_bytes = source_path.read_bytes()
    with Image.open(source_path) as original:
        target_size = (width, round(original.height * width / original.width))
        image = original.convert("RGB").resize(target_size, Image.Resampling.LANCZOS)
        profile = original.info.get("icc_profile")
        options = {"quality": 90, "subsampling": 0, "optimize": True, "progressive": True}
        if profile:
            options["icc_profile"] = profile
        image.save(OUTPUT / name, **options)
        manifest[source] = {
            "mobile": name,
            "sourceDimensions": list(original.size),
            "mobileDimensions": list(image.size),
            "sourceBytes": len(source_bytes),
            "mobileBytes": (OUTPUT / name).stat().st_size,
            "sourceSha256": sha256(source_bytes).hexdigest(),
            "sourceIccSha256": sha256(profile).hexdigest() if profile else None,
            "crop": "none",
        }
(OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
startup = [manifest[name] for name in ["akua-ribbon.jpg", "living-room-reference.jpg", "workshop-wall.jpg"]]
before = sum(item["sourceBytes"] for item in startup)
after = sum(item["mobileBytes"] for item in startup)
print(f"Three large scene images: {before:,} → {after:,} bytes ({(1-after/before)*100:.1f}% smaller).")
print("Original images, composition, colour profiles and scene settings are unchanged.")
