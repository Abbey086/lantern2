/* Settings: one generic binding layer for toggles, selects, segmented controls and swatches */
const SWATCH={lime:['#CFF08F','Lime'],blossom:['#F7C8DC','Blossom'],sky:['#BFE2F7','Sky'],sun:['#FFD89B','Sun']};
$('swatches').innerHTML=THEMES.map(t=>`<button class="sw" role="radio" data-theme-pick="${t}" style="background:${SWATCH[t][0]}" aria-label="${SWATCH[t][1]}"></button>`).join('');

function syncControls(){
  document.querySelectorAll('[data-tg]').forEach(t=>{const on=!!S.s[t.dataset.tg];t.classList.toggle('on',on);t.setAttribute('aria-checked',on);});
  document.querySelectorAll('[data-set]').forEach(el=>{el.value=S.s[el.dataset.set];});
  document.querySelectorAll('[data-seg]').forEach(g=>g.querySelectorAll('button').forEach(b=>{const on=b.dataset.v===String(S.s[g.dataset.seg]);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);}));
  document.querySelectorAll('[data-theme-pick]').forEach(b=>{const on=b.dataset.themePick===S.s.theme;b.classList.toggle('on',on);b.setAttribute('aria-checked',on);});
}
function setPref(k,v){S.s[k]=v;save();syncControls();applyTheme();if(k==='motion')autoplay();haptic(6);}
document.addEventListener('click',e=>{
  const tg=e.target.closest('[data-tg]');if(tg)return setPref(tg.dataset.tg,!S.s[tg.dataset.tg]);
  const sg=e.target.closest('[data-seg] button');if(sg)return setPref(sg.closest('[data-seg]').dataset.seg,sg.dataset.v);
  const sw=e.target.closest('[data-theme-pick]');if(sw)return setPref('theme',sw.dataset.themePick);
});
document.addEventListener('change',e=>{
  const el=e.target.closest('[data-set]');if(!el)return;
  setPref(el.dataset.set,el.type==='range'?parseFloat(el.value):el.value);
});
syncControls();
function openFilters(){syncControls();openSheet('sheet-filters');}
