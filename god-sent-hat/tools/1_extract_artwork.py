import numpy as np
from PIL import Image, ImageFilter, ImageDraw
src = Image.open('src.png').convert('RGB')
im = np.asarray(src).astype(np.float32); L = im.mean(2)
def boxmean(a, r):
    p = np.pad(a, r+1, mode='edge'); c = p.cumsum(0).cumsum(1); k = 2*r+1
    s = c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]
    return s[:a.shape[0], :a.shape[1]] / (k*k)
m = boxmean(L, 3); sd = np.sqrt(np.clip(boxmean(L*L, 3) - m*m, 0, None))
sds = boxmean(sd, 3)
mask = Image.fromarray(((sds > 11) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))
mk = np.asarray(mask) > 127
from scipy import ndimage
def drop_small(fg, maxarea):
    lab, n = ndimage.label(fg)
    sizes = ndimage.sum(np.ones_like(lab), lab, range(n + 1))
    small = sizes < maxarea; small[0] = False
    return small[lab]
mk = mk & ~drop_small(mk, 400)     # remove specks
mk = mk | drop_small(~mk, 500)     # fill pinholes (letter gaps/counters are far bigger)
sm = np.stack([boxmean(im[..., i], 4) for i in range(3)], -1)
white = ((sm.max(2) - sm.min(2)) < 70) & (sm.mean(2) > 140)
up = lambda a, b: np.asarray(Image.fromarray((a*255).astype(np.uint8)).resize((src.width*2, src.height*2), Image.BICUBIC).filter(ImageFilter.GaussianBlur(b))) > 127
M = up(mk, 2.5); W = up(white, 3)
np.save('M.npy', M); np.save('W.npy', W)
for name, top in [('clean_white-gold.png', (255,255,255)), ('clean_black-gold.png', (0,0,0))]:
    out = np.zeros(M.shape + (4,), np.uint8)
    out[M & W] = top + (255,); out[M & ~W] = (204,164,59,255)
    img = Image.fromarray(out); img.crop(img.getbbox()).save(name)
a = Image.open('clean_white-gold.png'); bg = Image.new('RGBA', a.size, (20,20,20,255)); bg.alpha_composite(a)
bg.convert('RGB').resize((a.width//2, a.height//2)).save('preview.png'); print(a.size)
