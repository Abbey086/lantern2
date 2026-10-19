/* Icons + illustrations (inline SVG, no external assets) */
const P = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  menu:'<path d="M4 8h16"/><path d="M4 16h10"/>',
  back:'<path d="m15 6-6 6 6 6"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  filter:'<path d="M4 7h9"/><path d="M19 7h1"/><circle cx="16" cy="7" r="2.2"/><path d="M4 17h1"/><path d="M11 17h9"/><circle cx="8" cy="17" r="2.2"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 18v4"/>',
  sparkle:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
  shield:'<path d="M12 3 4 6v6c0 4.4 3.2 7.7 8 9 4.8-1.3 8-4.6 8-9V6l-8-3Z"/><path d="M12 8v4"/><path d="M12 15h.01"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  cloud:'<path d="M7 16a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 7.5a4.2 4.2 0 0 1-.5 8.5H7Z"/><path d="M8 19.5l.8-1.5M12 19.5l.8-1.5M16 19.5l.8-1.5"/>',
  wind:'<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  minus:'<path d="M5 12h14"/>',
  copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  speaker:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
  bookmark:'<path d="M6 3h12v18l-6-4.5L6 21V3Z"/>',
  trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  play:'<path d="M7 4.5v15l12-7.5-12-7.5Z"/>',
  alert:'<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>'
};
const ic = (n, s = 20, sw = 2, fill = 'none') =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${fill}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[n] || ''}</svg>`;
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-ic]').forEach(el => {
    el.innerHTML = ic(el.dataset.ic, +el.dataset.s || 20, +el.dataset.sw || 2);
    el.removeAttribute('data-ic');
  });
}

/* ---------- Illustrations (flat, soft, no outlines — matches the reference mood) ---------- */
const artLantern = (u = 'a') => `<svg viewBox="0 0 260 300" fill="none" aria-hidden="true">
<defs>
<radialGradient id="lg${u}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFF3B0" stop-opacity=".95"/><stop offset=".55" stop-color="#FFE27A" stop-opacity=".35"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient>
<linearGradient id="lf${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC93C"/><stop offset="1" stop-color="#FF7A2F"/></linearGradient>
<linearGradient id="lw${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFBE6"/><stop offset="1" stop-color="#FFE9A8"/></linearGradient>
</defs>
<circle cx="130" cy="164" r="128" fill="url(#lg${u})"/>
<ellipse cx="130" cy="274" rx="62" ry="9" fill="#000" opacity=".12"/>
<path d="M104 68c0-36 52-36 52 0" stroke="#161616" stroke-width="8" stroke-linecap="round"/>
<path d="M96 96 108 70h44l12 26Z" fill="#161616"/>
<rect x="88" y="94" width="84" height="14" rx="7" fill="#161616"/>
<path d="M98 108h64l14 124H84Z" fill="url(#lw${u})"/>
<path d="M130 126c18 22 24 38 24 54a24 24 0 0 1-48 0c0-16 6-32 24-54Z" fill="url(#lf${u})"/>
<path d="M130 160c10 12 13 20 13 28a13 13 0 0 1-26 0c0-8 3-16 13-28Z" fill="#FFF6D0"/>
<path d="M119 108l-5 124M141 108l5 124" stroke="#161616" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>
<path d="M98 108 84 232M162 108l14 124" stroke="#161616" stroke-width="6" stroke-linecap="round"/>
<rect x="76" y="230" width="108" height="16" rx="8" fill="#161616"/>
<rect x="90" y="246" width="80" height="12" rx="6" fill="#161616"/>
</svg>`;

const artHeart = u => `<svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
<defs><linearGradient id="hg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF9AA8"/><stop offset="1" stop-color="#FF5A6E"/></linearGradient></defs>
<ellipse cx="80" cy="146" rx="40" ry="7" fill="#000" opacity=".1"/>
<path d="M80 136C26 100 18 62 42 42c18-14 34-4 38 10 4-14 20-24 38-10 24 20 16 58-38 94Z" fill="url(#hg${u})"/>
<path d="M44 58c2-8 10-12 17-10" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>
<path d="M128 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill="#FFC93C"/>
</svg>`;

const artMoon = u => `<svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
<defs><linearGradient id="mg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#FFB638"/></linearGradient></defs>
<ellipse cx="80" cy="148" rx="36" ry="6" fill="#000" opacity=".1"/>
<path d="M100 18A58 58 0 1 0 136 106 46 46 0 0 1 100 18Z" fill="url(#mg${u})"/>
<path d="M128 40l2.5 6.5 6.5 2.5-6.5 2.5-2.5 6.5-2.5-6.5-6.5-2.5 6.5-2.5 2.5-6.5Z" fill="#fff"/>
<circle cx="140" cy="76" r="3.5" fill="#fff"/>
<circle cx="112" cy="124" r="3" fill="#fff" opacity=".8"/>
</svg>`;

const artSun = u => `<svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
<defs><radialGradient id="sg${u}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#FF9F2E"/></radialGradient></defs>
<g stroke="#FFB638" stroke-width="8" stroke-linecap="round">
<path d="M80 14v16M80 130v16M14 80h16M130 80h16M33 33l11 11M116 116l11 11M127 33l-11 11M44 116l-11 11"/></g>
<circle cx="80" cy="80" r="34" fill="url(#sg${u})"/>
<path d="M62 70c3-8 10-12 18-12" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
</svg>`;

const artSpeak = () => `<svg viewBox="0 0 320 300" fill="none" aria-hidden="true">
<ellipse cx="150" cy="268" rx="90" ry="9" fill="#000" opacity=".08"/>
<rect x="34" y="52" width="190" height="124" rx="34" fill="#fff"/>
<path d="M78 170l-6 40 44-34Z" fill="#fff"/>
<rect x="64" y="84" width="112" height="12" rx="6" fill="#E6E6E6"/>
<rect x="64" y="110" width="132" height="12" rx="6" fill="#E6E6E6"/>
<rect x="64" y="136" width="84" height="12" rx="6" fill="#B9E26F"/>
<circle cx="224" cy="196" r="48" fill="#161616"/>
<rect x="213" y="170" width="22" height="38" rx="11" fill="#fff"/>
<path d="M203 198a21 21 0 0 0 42 0" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
<path d="M224 220v10" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
<path d="M262 160a44 44 0 0 1 0 72" stroke="#B9E26F" stroke-width="5" stroke-linecap="round" opacity=".9"/>
<path d="M276 148a62 62 0 0 1 0 96" stroke="#B9E26F" stroke-width="5" stroke-linecap="round" opacity=".45"/>
</svg>`;

const artJournal = () => `<svg viewBox="0 0 300 300" fill="none" aria-hidden="true">
<ellipse cx="150" cy="270" rx="86" ry="9" fill="#000" opacity=".08"/>
<rect x="74" y="44" width="150" height="196" rx="26" fill="#F9D6DD" transform="rotate(-9 150 142)"/>
<rect x="76" y="38" width="150" height="196" rx="26" fill="#fff"/>
<path d="M176 38h30v62l-15-12-15 12V38Z" fill="#FF4B3E"/>
<path d="M118 122c-22-14-26-30-17-39 8-7 15-2 17 4 2-6 9-11 17-4 9 9 5 25-17 39Z" fill="#FF7A8A"/>
<rect x="100" y="150" width="96" height="10" rx="5" fill="#E6E6E6"/>
<rect x="100" y="172" width="70" height="10" rx="5" fill="#E6E6E6"/>
<rect x="100" y="194" width="84" height="10" rx="5" fill="#B9E26F"/>
<circle cx="214" cy="222" r="30" fill="#161616"/>
<rect x="203" y="219" width="22" height="16" rx="4" fill="#fff"/>
<path d="M207 219v-5a7 7 0 0 1 14 0v5" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
</svg>`;

/* little decorative marks (the orange sparkle / purple ring in the reference) */
const decor = `
<svg class="dec" style="left:12%;top:16%;width:22px" viewBox="-14 -14 28 28" aria-hidden="true"><path d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3Z" fill="#FFA726"/></svg>
<svg class="dec" style="right:14%;top:32%;width:24px" viewBox="-14 -14 28 28" aria-hidden="true"><path d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3Z" fill="#FFC93C"/></svg>
<svg class="dec" style="left:30%;bottom:14%;width:20px" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="#B388FF" stroke-width="2.5"/></svg>
<svg class="dec" style="right:24%;bottom:22%;width:16px" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="#FF7A8A" stroke-width="2.5" stroke-linecap="round"/></svg>`;
