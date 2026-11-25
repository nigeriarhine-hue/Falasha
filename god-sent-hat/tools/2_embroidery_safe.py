import numpy as np, sys
from PIL import Image, ImageFilter
from scipy import ndimage
M = np.load('M.npy'); W = np.load('W.npy')
ys, xs = np.nonzero(M); h = ys.max() - ys.min()
ppi = h / 1.75                          # logo stitched 1.75" tall
min_line = 0.05 * ppi                   # Printful min line thickness
print(f'px per inch {ppi:.0f}, 0.05in = {min_line:.0f}px')
r = int(sys.argv[1]) if len(sys.argv) > 1 else int(min_line / 2)
yy, xx = np.mgrid[-r:r+1, -r:r+1]; disk = xx*xx + yy*yy <= r*r
# open each colour separately so thin bits under the minimum are removed
def safe(c):
    o = ndimage.binary_opening(c, structure=disk)
    lab, n = ndimage.label(o); s = ndimage.sum(o, lab, range(n+1)); keep = s > (min_line**2) * 4; keep[0] = False
    o = keep[lab]
    return np.asarray(Image.fromarray((o*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))) > 127
SW, SG = safe(M & W), safe(M & ~W)
np.save('SW.npy', SW); np.save('SG.npy', SG)
out = np.zeros(M.shape + (4,), np.uint8); out[:] = (20,20,20,255)
out[SG] = (255,204,0,255); out[SW] = (255,255,255,255)
Image.fromarray(out).resize((M.shape[1]//2, M.shape[0]//2)).save('safe_preview.png')
print('r', r)
