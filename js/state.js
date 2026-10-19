/* App state, persisted to localStorage. Only user-facing preferences live here. */
const LS = 'lantern:v2';
const THEMES = ['lime','blossom','sky','sun'];
const FREE_LIMIT = 3;
const DEF = {
  plan: 'free', bill: 'm', journal: [], searches: { d: '', n: 0 }, recent: [], onboarded: false,
  s: { trans:'web', why:true, auto:false, theme:'lime', motion:false, haptic:true,
       lang:'en-US', rate:.95, careLink:true, bound:'standard' }
};
let stored = {};
try { stored = JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) {}
let S = { ...DEF, ...stored };
S.s = { ...DEF.s };
for (const k in DEF.s) if (stored.s && k in stored.s) S.s[k] = stored.s[k];   // drops legacy keys (incl. any old stored API key)
if (!THEMES.includes(S.s.theme)) S.s.theme = 'lime';                           // migrates the old gradient themes
if (!Array.isArray(S.journal)) S.journal = [];
if (!Array.isArray(S.recent)) S.recent = [];
const save = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} };
save();
const haptic = ms => { if (S.s.haptic && navigator.vibrate) navigator.vibrate(ms || 8); };
let lastSit = '', lastIntent = 'normal', lastVerses = [], scCache = {};
