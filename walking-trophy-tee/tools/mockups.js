const fs = require('fs'); const { chromium } = require('playwright');
const OUT = process.env.OUT || '/home/user/Falasha/walking-trophy-tee';
const img = f => 'data:image/png;base64,' + fs.readFileSync(`${OUT}/files/${f}.png`).toString('base64');
// simple relaxed-fit tee outline, 600 x 700
const tee = (fill, back) => `<path d="M190 40 Q300 ${back ? 70 : 110} 410 40 L560 110 L600 260 L500 290 L490 680 L110 680 L100 290 L0 260 L40 110 Z" fill="${fill}" stroke="rgba(0,0,0,.25)" stroke-width="3"/>
  <path d="M190 40 Q300 ${back ? 70 : 110} 410 40" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="${back ? 3 : 10}"/>`;
const card = (label, fill, back, file, x, y, w, h) => `<div class="c"><svg viewBox="0 0 600 700" width="330" height="385">${tee(fill, back)}
  <image href="${img(file)}" x="${x}" y="${y}" width="${w}" height="${h}"/></svg><div class="l">${label}</div></div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1530, height: 520 } });
  // back print 12x16 area -> ~300 x 400 on the mock tee; left chest 4x4 -> ~95 x 95 on wearer's left (viewer's right)
  const cards = [
    card('Black · front', '#151515', false, 'PRINTFUL-FRONT-left-chest_dark-shirts', 350, 150, 100, 100),
    card('Black · back', '#151515', true, 'PRINTFUL-BACK_dark-shirts', 150, 95, 300, 400),
    card('White · front', '#f3f2ee', false, 'PRINTFUL-FRONT-left-chest_light-shirts', 350, 150, 100, 100),
    card('White · back', '#f3f2ee', true, 'PRINTFUL-BACK_light-shirts', 150, 95, 300, 400),
  ].join('');
  await p.setContent(`<style>body{margin:0;background:#e9e6e0;font-family:Inter,sans-serif}h1{margin:22px 30px 0;font-size:24px}.g{display:flex;gap:18px;padding:16px 30px}.c{background:#fff;border-radius:14px;padding:12px;text-align:center}.l{font-size:16px;color:#444}</style>
   <h1>WALKING TROPHY · Bella+Canvas 6400 women's relaxed tee</h1><div class="g">${cards}</div>`);
  await p.screenshot({ path: `${OUT}/mockups/mockup-tees.png` });
  await b.close();
})();
