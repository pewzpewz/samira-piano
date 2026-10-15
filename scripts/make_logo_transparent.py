from PIL import Image
from pathlib import Path

src = Path(r"D:\cursor\samira-piano\public\logo.png")
# Keep a backup of the original opaque file once
backup = Path(r"D:\cursor\samira-piano\public\logo-original.png")
if not backup.exists():
    backup.write_bytes(src.read_bytes())

img = Image.open(backup if backup.exists() else src).convert("RGBA")
pixels = img.load()
w, h = img.size

corners = [pixels[0, 0], pixels[w - 1, 0], pixels[0, h - 1], pixels[w - 1, h - 1]]
br = sum(c[0] for c in corners) // 4
bg = sum(c[1] for c in corners) // 4
bb = sum(c[2] for c in corners) // 4
print("bg sample", br, bg, bb)

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        dist_white = ((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2) ** 0.5
        dist_bg = ((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2) ** 0.5
        if dist_white < 28 or dist_bg < 22:
            pixels[x, y] = (r, g, b, 0)
        elif dist_white < 48:
            alpha = int(255 * (dist_white - 28) / 20)
            pixels[x, y] = (r, g, b, max(0, min(255, alpha)))

img.save(src, "PNG")
print("saved", src, img.size)
