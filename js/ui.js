/* Theme, router, toast, sheets, confirm */
const TABS = ['view-home','view-scenarios','view-journal','view-settings'];
let cur = null;

function applyTheme(){
  document.documentElement.dataset.theme = S.s.theme;
  document.body.classList.toggle('rm', S.s.motion);
  $('careLink').classList.toggle('hidden', !S.s.careLink);
  const m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = getComputedStyle(document.documentElement).getPropertyValue('--bd').trim() || '#D9F3A8';
}

/* ---------- router (with real history so the phone's back gesture works) ---------- */
function show(id){
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  $(id).classList.remove('hidden');
  cur = id;
  $('tabbar').classList.toggle('hidden', !TABS.includes(id));
  document.querySelectorAll('.nb').forEach(t => {
    const on = t.dataset.go === id;
    t.classList.toggle('on', on);
    on ? t.setAttribute('aria-current', 'page') : t.removeAttribute('aria-current');
  });
  const main = $('main'); main.scrollTop = 0;
  if (typeof onShow === 'function') onShow(id);
}
function go(id, o = {}){
  closeSheets(true);
  if (id === cur) { $('main').scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const d = (history.state && history.state.d) || 0;
  const tab = TABS.includes(id);
  if (o.replace || (tab && TABS.includes(cur))) history.replaceState({ v: id, d }, '');
  else history.pushState({ v: id, d: d + 1 }, '');
  show(id); haptic(6);
}
function back(){
  if (history.state && history.state.d > 0) history.back();
  else go('view-home', { replace: true });
}
window.addEventListener('popstate', e => {
  closeSheets(true);
  const id = e.state && e.state.v;
  if (id && $(id)) show(id);
});
document.querySelectorAll('.nb').forEach(t => t.onclick = () => {
  if (t.dataset.go === 'view-search') openSearch(); else go(t.dataset.go);
});

/* ---------- toast (optional action, e.g. Undo) ---------- */
let tT;
function hideToast(){ $('toast').classList.remove('show'); $('toast').style.pointerEvents = 'none'; }
function toast(m, act, fn){
  const t = $('toast'); t.textContent = '';
  const s = document.createElement('span'); s.textContent = m; t.append(s);
  if (act) { const b = document.createElement('button'); b.textContent = act; b.onclick = () => { hideToast(); fn && fn(); }; t.append(b); }
  t.style.pointerEvents = act ? 'auto' : 'none';
  t.classList.add('show');
  clearTimeout(tT); tT = setTimeout(hideToast, act ? 5200 : 2400);
}

/* ---------- sheets / drawer ---------- */
let lastFocus = null;
function openSheet(id){
  closeSheets(true);
  lastFocus = document.activeElement;
  const el = $(id); el.classList.add('open'); $('scrim').classList.add('open');
  el.tabIndex = -1; setTimeout(() => el.focus({ preventScroll: true }), 60);
}
function closeSheets(silent){
  const was = document.querySelector('.sheet.open');
  document.querySelectorAll('.sheet.open').forEach(s => s.classList.remove('open'));
  $('scrim').classList.remove('open');
  if (!silent && was && lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheets(); });

/* swipe a bottom sheet down to dismiss */
(function(){
  let y0 = null, el = null;
  document.querySelectorAll('.sheet:not(.drawer) .grab').forEach(g => {
    g.addEventListener('touchstart', e => { y0 = e.touches[0].clientY; el = g.closest('.sheet'); el.style.transition = 'none'; }, { passive: true });
    g.addEventListener('touchmove', e => { if (y0 === null) return; const dy = Math.max(0, e.touches[0].clientY - y0); el.style.transform = `translateY(${dy}px)`; }, { passive: true });
    g.addEventListener('touchend', e => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0; el.style.transition = ''; el.style.transform = '';
      if (dy > 80) closeSheets(); y0 = null;
    });
  });
})();

function askConfirm(o, fn){
  $('cfTitle').textContent = o.title; $('cfBody').textContent = o.body;
  const b = $('cfOk'); b.textContent = o.ok; b.onclick = () => { closeSheets(true); fn(); };
  openSheet('sheet-confirm');
}

/* ---------- drawer ---------- */
function openDrawer(){
  $('drawerLinks').innerHTML = [
    ['home','Home','view-home'],['compass','Scenarios','view-scenarios'],['book','Journal','view-journal'],
    ['sparkle','Plan and pricing','view-pricing'],['gear','Settings','view-settings']
  ].map(([i, l, v]) => `<button class="dr-item" onclick="closeSheets(true);go('${v}')"><span class="ico">${ic(i, 19)}</span>${l}</button>`).join('');
  openSheet('drawer');
}

/* live clock for the desktop presentation frame */
(function tick(){ const d = new Date(); $('clock').textContent = d.getHours() % 12 || 12; $('clock').textContent += ':' + String(d.getMinutes()).padStart(2, '0'); setTimeout(tick, 15000); })();
