const { chromium } = require('playwright');
const path = require('path');
const F = '/tmp/claude-0/-home-user-Falasha/d481a706-366a-5e35-80f9-a0b533d1a606/scratchpad/fonts';
const OUT = '/home/user/Falasha/god-sent-hat';
const b64=f=>require('fs').readFileSync(f).toString('base64');
const fontCss = `
@font-face{font-family:Pac;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-pacifico-5.3.0/package/files/pacifico-latin-400-normal.woff2`)})}
@font-face{font-family:PF;font-weight:700;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-playfair-display-5.3.0/package/files/playfair-display-latin-700-normal.woff2`)})}
@font-face{font-family:PF;font-weight:900;src:url(data:font/woff2;base64,${b64(`${F}/fontsource-playfair-display-5.3.0/package/files/playfair-display-latin-900-normal.woff2`)})}`;
// cross with thick arms (>= 0.05in = 15px at 300dpi; we use ~30px)
const cross = (c, h) => `<svg width="${h*0.62}" height="${h}" viewBox="0 0 62 100"><rect x="22" y="0" width="18" height="100" fill="${c}"/><rect x="0" y="24" width="62" height="18" fill="${c}"/></svg>`;
const designs = {
  'A-script': c => `<div style="display:flex;align-items:center;gap:34px">${cross(c,250)}<span style="font-family:Pac;font-size:250px;line-height:1;color:${c};padding-bottom:40px">God Sent</span></div>`,
  'B-serif-caps': c => `<div style="display:flex;align-items:center;gap:46px;font-family:PF;font-weight:900;font-size:250px;letter-spacing:10px;color:${c};line-height:1"><span>GOD</span>${cross(c,200)}<span>SENT</span></div>`,
  'C-minimal': c => `<div style="display:flex;flex-direction:column;align-items:center;color:${c}">${cross(c,150)}<span style="font-family:PF;font-weight:700;font-size:190px;letter-spacing:30px;line-height:1;margin-top:14px">GOD SENT</span></div>`,
};
const threads = { white: '#FFFFFF', black: '#000000' };
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1500, height: 525 } }); // 5in x 1.75in @300dpi
  for (const [n, fn] of Object.entries(designs)) for (const [tn, tc] of Object.entries(threads)) {
    await p.setContent(`<style>${fontCss}html,body{margin:0;background:transparent}#w{width:1500px;height:525px;display:flex;align-items:center;justify-content:center}</style><div id="w">${fn(tc)}</div>`);
    await p.evaluate(() => document.fonts.ready);
    // shrink to fit inside 1440x480 safe area
    await p.evaluate(() => { const e = document.querySelector('#w>*'); const r = e.getBoundingClientRect(); const s = Math.min(1, 1440/r.width, 480/r.height); e.style.transform = `scale(${s})`; });
    await p.screenshot({ path: `${OUT}/files/god-sent-hat-${n}-${tn}-thread.png`, omitBackground: true });
  }
  // mockups
  const hats = { Black:'#1b1b1b', Navy:'#1f2a44', 'Spruce':'#2f4a3a', Khaki:'#c9b48a', Stone:'#d8d2c4', White:'#f4f4f2', Pink:'#f2c6cf', 'Light Blue':'#b9cde3' };
  const fs = require('fs');
  const m = await b.newPage({ viewport: { width: 1700, height: 760 }, deviceScaleFactor: 1 });
  for (const n of Object.keys(designs)) {
    const cards = Object.entries(hats).map(([hn, hc]) => {
      const dark = ['Black','Navy','Spruce'].includes(hn);
      const img = fs.readFileSync(`${OUT}/files/god-sent-hat-${n}-${dark?'white':'black'}-thread.png`).toString('base64');
      return `<div class="c"><svg viewBox="0 0 360 260" width="360" height="260">
        <path d="M40 190 Q40 40 180 30 Q320 40 320 190 Z" fill="${hc}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
        <path d="M180 30 L180 190" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
        <circle cx="180" cy="32" r="7" fill="${hc}" stroke="rgba(0,0,0,.3)"/>
        <path d="M20 190 Q180 175 340 190 Q330 245 180 245 Q30 245 20 190 Z" fill="${hc}" stroke="rgba(0,0,0,.3)" stroke-width="2" filter="brightness(.9)"/>
        <image href="data:image/png;base64,${img}" x="90" y="110" width="180" height="63"/></svg>
        <div class="l">${hn} · ${dark?'white':'black'} thread</div></div>`; }).join('');
    await m.setContent(`<style>body{margin:0;background:#eeeae4;font-family:Inter,sans-serif}h1{margin:28px 40px 0;font-size:28px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:28px 40px}.c{background:#fff;border-radius:14px;padding:16px;text-align:center}.l{font-size:16px;color:#444}</style><h1>God Sent dad hat · design ${n} · Yupoong 6245CM front embroidery (5" × 1.75")</h1><div class="g">${cards}</div>`);
    await m.screenshot({ path: `${OUT}/mockups/mockup-${n}.png`, fullPage: false });
  }
  await b.close();
})();
