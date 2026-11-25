# GOD SENT dad hat (matches the GOD SENT Christian graphic tee)

Blank: Printful Classic Dad Hat, Yupoong 6245CM (about $14.02 base cost).
Placement: front embroidery, centred. Logo stitches at about **2.4" wide × 1.75" tall**.

## Final logo
This is the design you chose (`source/god-sent-embroidery-render.png`): "GOD" in white brush script, "SENT" in gold, a gold brush cross, and a gold brush-stroke underline.
That picture is a mockup with glow and stitch texture, so it can't be uploaded as it is. Printful would stitch the glow and background as a box.
These files rebuild it as flat artwork with exactly 2 thread colours on a transparent background.

## Files (`files/`)
| File | Use |
|---|---|
| **`PRINTFUL-UPLOAD_hat-front_dark-hats_white-gold.png`** | **Upload this** for Black, Navy, Dark Grey, Spruce, Burgundy |
| `PRINTFUL-UPLOAD_hat-front_light-hats_black-gold.png` | Upload for White, Light Blue, Stone (gold is weaker on light hats) |
| `logo-embroidery-safe_*.png` | Transparent logo, simplified for stitching |
| `logo-full-detail_*.png` | Transparent logo with all the brush splinters. Use it for Etsy graphics, banners and printed products, **not** for embroidery |

The upload files are 1500 × 525 px (5" × 1.75" at 300 DPI), with the logo centred.

**Why there are two versions:** at hat size, the fine brush splinters on the cross, the letters and the underline are thinner than Printful's minimum stitchable line (0.05"). The embroidery-safe version removes those bits so nothing stitches as a ragged thread. See `mockups/full-detail-vs-embroidery-safe.png`.

**Thread colours** (pick them in Printful's thread picker):
- White **#FFFFFF**, or Black **#000000** for light hats.
- Gold **#FFCC00**, the Printful thread closest to the gold in the chosen design.

## Printful setup
1. Product Templates → Classic Dad Hat (Yupoong 6245CM) → Embroidery → Front.
2. Upload the `PRINTFUL-UPLOAD_…` file and centre it at full height. Don't make it bigger.
3. Set the thread colours as above and check Printful's stitch preview.
4. Printful usually charges a one-time digitization fee per design.
5. Optional, for a 3D puff look like the render: choose 3D puff embroidery if Printful offers it on this hat. Puff suits bold shapes, so use the embroidery-safe file.

`tools/` contains the scripts that rebuilt the artwork from the render (Python with numpy, scipy and Pillow, plus Playwright for the mockups).

## Etsy listing copy (draft)
**Title:** God Sent Hat, Christian Embroidered Dad Hat, Faith Baseball Cap, Jesus Hat, Religious Gift, Church Hat, Matching God Sent Shirt

**Description:**
Pair it with our God Sent tee. This relaxed dad hat carries the GOD SENT brush lettering and gold cross, embroidered in white and gold thread.
- 100% cotton chino twill, unstructured 6-panel, low profile
- Adjustable strap with antique buckle
- Embroidered design (not printed)
- Made to order and shipped from our print partner

**Tags (13):** god sent hat, christian hat, faith hat, jesus hat, embroidered dad hat, christian gift, religious gift, church hat, bible verse hat, cross hat, christian apparel, matching set, blessed hat
