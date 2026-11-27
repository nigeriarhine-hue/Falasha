// Realistic walking-woman trophy figurine, drawn in a 600 x 1200 box (base included).
// Exported for the shirt builder; run directly to preview.
const METAL = `
 <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#7A560C"/><stop offset=".16" stop-color="#E9BC4C"/><stop offset=".3" stop-color="#FFF3C2"/>
  <stop offset=".46" stop-color="#F0C455"/><stop offset=".7" stop-color="#B9861C"/><stop offset=".86" stop-color="#E6B847"/><stop offset="1" stop-color="#6E4C08"/></linearGradient>
 <linearGradient id="metalV" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#FFF0B5"/><stop offset=".45" stop-color="#E3AF35"/><stop offset="1" stop-color="#8A630F"/></linearGradient>
 <radialGradient id="afro" cx=".35" cy=".3" r=".8">
  <stop offset="0" stop-color="#E8B640"/><stop offset=".55" stop-color="#B07E14"/><stop offset="1" stop-color="#6E4C08"/></radialGradient>
 <radialGradient id="metalR" cx=".38" cy=".32" r=".75">
  <stop offset="0" stop-color="#FFF3C2"/><stop offset=".45" stop-color="#E6B443"/><stop offset="1" stop-color="#7A560C"/></radialGradient>`;
const EDGE = '#5E4106';
const figure = (plaque = '') => `
<g id="figure">
  <!-- gown + torso: hips swayed, mermaid hem, slit on her left -->
  <path fill="url(#metal)" d="M282 192 C255 198 228 206 224 230 C222 258 230 280 234 300 C240 330 252 350 258 372
    C250 400 226 432 220 472 C216 524 234 600 246 680 C254 760 250 860 240 960 C234 992 220 1012 200 1032 L424 1032
    C410 990 396 930 384 860 C374 800 366 750 364 700 C368 640 376 560 372 472 C366 440 344 404 342 372
    C346 345 358 322 364 300 C370 280 378 252 376 228 C372 206 345 198 318 192 Z"/>
  <!-- stepping leg through the slit, with a pointed pump -->
  <path fill="url(#metal)" d="M326 690 C328 770 334 830 338 868 C342 918 348 962 350 1000 L374 1000 C372 958 372 904 374 860 C377 806 374 740 368 690 Z"/>
  <path d="M328 688 C332 780 340 880 350 1000" fill="none" stroke="${EDGE}" stroke-width="3"/>
  <path d="M370 690 C376 760 374 820 374 860 C372 910 372 958 374 1000" fill="none" stroke="${EDGE}" stroke-width="2" opacity=".6"/>
  <path fill="url(#metalV)" stroke="${EDGE}" stroke-width="3" d="M344 996 L380 996 C392 1010 402 1022 398 1036 L340 1036 Z"/>
  <!-- slit edge and gown folds -->
  <path d="M262 700 C266 820 258 920 236 1010" fill="none" stroke="${EDGE}" stroke-width="2.5" opacity=".55"/>
  <path d="M300 760 C302 860 296 950 290 1028" fill="none" stroke="${EDGE}" stroke-width="2.5" opacity=".45"/>
  <!-- waist sash -->
  <path d="M256 372 C285 384 318 384 344 372" fill="none" stroke="${EDGE}" stroke-width="3" opacity=".7"/>
  <!-- both hands on hips: the arms form the two trophy-handle loops -->
  <path fill="url(#metal)" stroke="${EDGE}" stroke-width="2" d="M238 212 C198 228 162 272 146 324 C138 352 144 376 162 396
    C186 420 212 438 232 450 L248 432 C226 418 204 398 186 376 C176 362 176 346 184 330 C200 294 224 264 250 246 Z"/>
  <ellipse cx="244" cy="445" rx="18" ry="13" fill="url(#metalR)" stroke="${EDGE}" stroke-width="2" transform="rotate(35 244 445)"/>
  <g transform="translate(606 0) scale(-1 1)">
  <path fill="url(#metal)" stroke="${EDGE}" stroke-width="2" d="M238 212 C198 228 162 272 146 324 C138 352 144 376 162 396
    C186 420 212 438 232 450 L248 432 C226 418 204 398 186 376 C176 362 176 346 184 330 C200 294 224 264 250 246 Z"/>
  <ellipse cx="244" cy="445" rx="18" ry="13" fill="url(#metalR)" stroke="${EDGE}" stroke-width="2" transform="rotate(35 244 445)"/>
  </g>
  <!-- neck, head (chin slightly lifted), elegant high bun -->
  <path fill="url(#metal)" d="M285 156 L317 156 L322 198 L278 198 Z"/>
  <path d="M280 196 C292 204 308 204 320 196" fill="none" stroke="${EDGE}" stroke-width="2.5" opacity=".6"/>
  <!-- afro (deeper gold, soft curl edge) framing the face -->
  <path d="M389.4,82.0 L393.0,89.4 L390.8,96.6 L384.4,102.5 L379.9,108.4 L379.3,115.5 L378.7,123.2 L373.8,128.7 L365.6,131.6 L358.9,134.9 L355.5,141.4 L352.6,149.2 L346.6,153.9 L338.3,154.5 L330.5,154.9 L324.2,159.0 L317.7,164.6 L309.9,166.4 L302.0,162.9 L294.8,158.5 L287.6,158.0 L279.5,160.0 L271.8,159.1 L266.1,153.6 L261.4,147.4 L255.0,144.5 L246.1,144.0 L238.2,141.4 L234.3,134.8 L232.7,127.1 L228.9,121.2 L222.0,116.7 L216.5,110.9 L216.6,103.3 L220.0,95.5 L220.9,88.6 L217.4,82.0 L214.4,74.9 L216.5,68.0 L222.0,62.1 L225.4,56.1 L224.6,48.4 L223.9,40.1 L228.0,33.8 L235.8,30.4 L242.7,26.9 L246.7,20.7 L250.5,13.6 L257.3,10.0 L266.2,10.6 L274.3,11.3 L280.7,7.9 L286.9,2.5 L294.3,0.3 L302.0,2.9 L309.2,5.9 L316.6,5.0 L325.1,1.9 L333.3,2.1 L339.4,7.5 L344.1,14.2 L350.2,17.9 L358.4,19.5 L365.3,23.1 L368.1,30.4 L368.8,38.5 L372.1,44.4 L379.1,48.6 L385.3,53.8 L386.4,61.0 L384.5,68.5 L385.0,75.2 Z" fill="url(#afro)" stroke="${EDGE}" stroke-width="2" stroke-opacity=".6"/>
  <path d="M250 70 C262 40 292 24 320 28" fill="none" stroke="#FFE9A8" stroke-width="6" stroke-linecap="round" opacity=".45"/>
  <ellipse cx="301" cy="118" rx="39" ry="49" fill="url(#metalR)" transform="rotate(-3 301 118)"/>
  <!-- drop earrings -->
  <path d="M264 136 L264 152" stroke="url(#metalV)" stroke-width="4"/><circle cx="264" cy="158" r="6" fill="url(#metalR)"/>
  <path d="M338 136 L338 152" stroke="url(#metalV)" stroke-width="4"/><circle cx="338" cy="158" r="6" fill="url(#metalR)"/>
  <!-- specular highlights -->
  <path d="M244 300 C250 330 258 350 262 368" fill="none" stroke="#FFF8DC" stroke-width="7" stroke-linecap="round" opacity=".7"/>
  <path d="M238 520 C244 600 256 680 258 760" fill="none" stroke="#FFF8DC" stroke-width="7" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="288" cy="112" rx="8" ry="15" fill="#FFF8DC" opacity=".5"/>
</g>
<!-- round two-tier trophy base -->
<g id="base">
  <ellipse cx="300" cy="1036" rx="124" ry="16" fill="url(#metalV)"/>
  <rect x="176" y="1036" width="248" height="46" fill="url(#metal)"/>
  <ellipse cx="300" cy="1082" rx="124" ry="16" fill="url(#metal)"/>
  <ellipse cx="300" cy="1086" rx="164" ry="20" fill="url(#metalV)"/>
  <rect x="136" y="1086" width="328" height="84" fill="url(#metal)"/>
  <ellipse cx="300" cy="1170" rx="164" ry="20" fill="url(#metal)"/>
  ${plaque ? `<rect x="244" y="1100" width="112" height="58" rx="6" fill="#141414" stroke="url(#metalV)" stroke-width="4"/>
  <text x="300" y="1146" text-anchor="middle" font-family="CG" font-weight="700" font-size="50" style="font-variant-numeric:lining-nums;font-feature-settings:'lnum' 1" fill="#F2C75A">${plaque}</text>` : ''}
</g>`;
module.exports = { METAL, figure };
if (require.main === module) (async () => {
  const fs = require('fs'); const { chromium } = require('playwright');
  const F = __dirname + '/fonts'; const b64 = f => fs.readFileSync(f).toString('base64');
  const css = `@font-face{font-family:CG;font-weight:700;src:url(data:font/woff2;base64,${b64(F + '/fontsource-cormorant-garamond-5.3.0/package/files/cormorant-garamond-latin-700-normal.woff2')})}`;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 600, height: 1230 } });
  await p.setContent(`<style>${css}body{margin:0;background:#151515}</style><svg viewBox="0 -30 600 1230" width="600" height="1230"><defs>${METAL}</defs>${figure()}</svg>`);
  await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: 'figure.png' }); await b.close();
})();
