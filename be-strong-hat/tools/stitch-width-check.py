import numpy as np, sys
from PIL import Image
from scipy import ndimage
im = Image.open(sys.argv[1]); a = np.asarray(im)
alpha = a[..., 3] > 127
ys, xs = np.nonzero(alpha); h = ys.max() - ys.min() + 1
ppi = h / float(sys.argv[2])                      # logo height in inches on the hat
r = max(1, int(0.05 * ppi / 2))
yy, xx = np.mgrid[-r:r+1, -r:r+1]; disk = xx*xx + yy*yy <= r*r
cols = {}
cs, cnt = np.unique(a[alpha][:, :3], axis=0, return_counts=True)
pal = cs[cnt > 0.02 * cnt.sum()].astype(int)       # the thread colours (>2% of pixels)
near = np.argmin(((a[..., :3].astype(int)[..., None, :] - pal[None, None]) ** 2).sum(-1), -1)
for i, c in enumerate(pal):
    m = alpha & (near == i)
    if m.sum() < 200: continue
    lost = m & ~ndimage.binary_opening(m, structure=disk)
    cols[tuple(c)] = (m.sum(), lost.sum())
    a = a.copy(); a[lost] = (255, 0, 0, 255)
for c, (t, l) in cols.items(): print('colour', c, f'too-thin {100*l/t:.1f}%')
out = Image.new('RGBA', im.size, (30,30,30,255)); out.alpha_composite(Image.fromarray(a))
out.convert('RGB').resize((1500, round(1500*im.height/im.width))).save(sys.argv[3]); print('ppi', round(ppi), 'r', r)
