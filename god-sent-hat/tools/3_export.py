import numpy as np, os, shutil
from PIL import Image
OUT = '/home/user/Falasha/god-sent-hat'
M = np.load('M.npy'); W = np.load('W.npy'); SW = np.load('SW.npy'); SG = np.load('SG.npy')
GOLD = (255, 204, 0)   # Printful thread "Gold" #FFCC00
def rgba(white_mask, gold_mask, top):
    out = np.zeros(M.shape + (4,), np.uint8)
    out[gold_mask] = GOLD + (255,); out[white_mask] = top + (255,)
    im = Image.fromarray(out); return im.crop(im.getbbox())
for d in ['files', 'mockups']:
    shutil.rmtree(f'{OUT}/{d}', ignore_errors=True); os.makedirs(f'{OUT}/{d}')
os.makedirs(f'{OUT}/source', exist_ok=True); shutil.copy('src.png', f'{OUT}/source/god-sent-embroidery-render.png')
variants = {'dark-hats_white-gold': (255,255,255), 'light-hats_black-gold': (0,0,0)}
for n, top in variants.items():
    safe = rgba(SW, SG, top)
    # Printful front file: 1500x525 canvas (5" x 1.75" @300dpi), logo 1.75" tall, centred
    h = 525; w = round(safe.width * h / safe.height)
    canvas = Image.new('RGBA', (1500, 525), (0,0,0,0))
    canvas.alpha_composite(safe.resize((w, h), Image.LANCZOS), ((1500 - w)//2, 0))
    canvas.save(f'{OUT}/files/PRINTFUL-UPLOAD_hat-front_{n}.png', dpi=(300,300))
    safe.save(f'{OUT}/files/logo-embroidery-safe_{n}.png', dpi=(300,300))
    rgba(M & W, M & ~W, top).save(f'{OUT}/files/logo-full-detail_{n}.png', dpi=(300,300))
    print(n, 'on hat:', f'{w/300:.2f}" x 1.75"')
