// Separate, individually downloadable mockups and artwork previews.
const fs = require('fs'); const { chromium } = require('playwright');
const OUT = process.env.OUT || '/home/user/Falasha/walking-trophy-tee';
const img = f => 'data:image/png;base64,' + fs.readFileSync(`${OUT}/files/${f}.png`).toString('base64');
const tee = (fill, back) => `<path d="M190 40 Q300 ${back ? 70 : 110} 410 40 L560 110 L600 260 L500 290 L490 680 L110 680 L100 290 L0 260 L40 110 Z" fill="${fill}" stroke="rgba(0,0,0,.25)" stroke-width="3"/>
  <path d="M190 40 Q300 ${back ? 70 : 110} 410 40" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="${back ? 3 : 10}"/>`;
const shirts = [
  ['black-front', '#151515', false, 'PRINTFUL-FRONT-center-chest_dark-shirts', 150, 185, 300, 100],
  ['black-back', '#151515', true, 'PRINTFUL-BACK_dark-shirts', 150, 95, 300, 400],
  ['white-front', '#f3f2ee', false, 'PRINTFUL-FRONT-center-chest_light-shirts', 150, 185, 300, 100],
  ['white-back', '#f3f2ee', true, 'PRINTFUL-BACK_light-shirts', 150, 95, 300, 400],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 1400 } });
  for (const f of fs.readdirSync(`${OUT}/mockups`)) fs.unlinkSync(`${OUT}/mockups/${f}`);
  for (const [n, fill, back, file, x, y, w, h] of shirts) {
    await p.setViewportSize({ width: 1200, height: 1400 });
    await p.setContent(`<body style="margin:0;background:#e9e6e0"><svg viewBox="-40 -20 680 740" width="1200" height="1400">${tee(fill, back)}<image href="${img(file)}" x="${x}" y="${y}" width="${w}" height="${h}"/></svg></body>`);
    await p.screenshot({ path: `${OUT}/mockups/mockup-tee-${n}.png` });
  }
  // artwork previews on shirt colour
  for (const [n, file, bg, W, H] of [
    ['back-on-black', 'PRINTFUL-BACK_dark-shirts', '#151515', 1200, 1600], ['back-on-white', 'PRINTFUL-BACK_light-shirts', '#f3f2ee', 1200, 1600],
    ['front-on-black', 'PRINTFUL-FRONT-center-chest_dark-shirts', '#151515', 1800, 600], ['front-on-white', 'PRINTFUL-FRONT-center-chest_light-shirts', '#f3f2ee', 1800, 600]]) {
    await p.setViewportSize({ width: W, height: H });
    await p.setContent(`<body style="margin:0;background:${bg}"><img src="${img(file)}" style="width:${W}px;height:${H}px;display:block"></body>`);
    await p.screenshot({ path: `${OUT}/mockups/preview-${n}.png` });
  }
  await b.close();
})();
