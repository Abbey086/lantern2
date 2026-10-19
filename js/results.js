/* Search flow and results view */
let reqId=0,speakingId=null;
const refOf=v=>`${v.book} ${v.chapter}:${v.verse.join('-')}`;

async function search(text,reroll){
  text=(text!==undefined?text:$('sitInput').value).trim();
  if(!text){toast('Tell Lantern what you’re carrying first');$('sitInput').focus();return;}
  let counted=false;
  if(S.plan==='free'&&!reroll){
    const d=new Date().toDateString();
    if(S.searches.d!==d)S.searches={d,n:0};
    if(S.searches.n>=FREE_LIMIT){openSheet('sheet-limit');return;}
    S.searches.n++;save();counted=true;updateQuota();
  }
  const id=++reqId;
  lastSit=text;lastIntent=classify(text);
  if(!reroll)addRecent(text);
  $('sitInput').blur();speechSynthesis&&speechSynthesis.cancel();speakingId=null;
  renderLoading();
  if(cur!=='view-results')go('view-results');
  try{
    const verses=await getVerses(text,lastIntent,reroll?lastVerses.map(v=>v.book+' '+v.chapter).join(', '):null);
    if(id!==reqId)return;
    lastVerses=verses;renderResults();
    if(S.s.auto)lastVerses.forEach((v,i)=>setTimeout(()=>speakEl('vt'+i,true),i*50));
  }catch(e){
    if(id!==reqId)return;
    if(counted){S.searches.n=Math.max(0,S.searches.n-1);save();updateQuota();}
    renderError();
  }
}
function reroll(){search(lastSit,true);}

function careHTML(intent){
  if(intent==='harm')return `<div class="animate-pop rounded-3xl p-5" style="background:#FFF3DA;color:#7A4B00">
    <h2 class="text-[16px] font-extrabold">Before the verses, a word of care</h2>
    <p class="mt-2 text-[13px] font-medium leading-relaxed">Lantern can't help plan harm or anything illegal, and it won't leave you alone with it either. What you're feeling deserves a human voice tonight.</p>
    <ul class="mt-2 list-disc pl-5 text-[13px] font-medium leading-relaxed"><li>US: call or text <b>988</b> · emergency <b>911</b></li><li>International: <a class="font-extrabold underline" href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a></li></ul></div>`;
  return `<div class="care-soft animate-pop rounded-3xl p-5">
    <h2 class="text-[16px] font-extrabold">You are not alone</h2>
    <p class="mt-2 text-[13px] font-medium leading-relaxed">I am not a mental health professional. If you are feeling overwhelmed or having thoughts of suicide, please reach out for immediate support:</p>
    <ul class="mt-2 list-disc pl-5 text-[13px] font-medium leading-relaxed"><li><b>US:</b> call or text <b>988</b>, 24/7</li><li><b>International:</b> <a class="font-extrabold underline" href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a></li></ul>
    <p class="mt-2 text-[13px] font-medium leading-relaxed">You deserve help and care. The verses below are meant to offer hope and remind you of God's enduring love and the value of your life. <b>Your life matters, and help is available.</b></p>
    <div class="mt-3.5 flex gap-2.5"><a href="tel:988" class="btn-black" style="min-height:48px">Call 988</a><a href="sms:988" class="btn-soft" style="background:#fff;color:#8B1F14">Text 988</a></div></div>`;
}
function setEcho(){$('resEcho').firstElementChild.textContent='“'+lastSit+'”';}
function renderLoading(){
  setEcho();
  /* safety first: the care card appears instantly from the local check, before any network call */
  $('careSlot').innerHTML=lastIntent!=='normal'?careHTML(lastIntent):'';
  $('rerollBtn').classList.add('hidden');
  $('verseSlot').setAttribute('aria-busy','true');
  $('verseSlot').innerHTML=`<p class="sr-only">Finding verses for you…</p>`+[0,1,2].map(()=>`<div class="card p-5">
    <div class="flex items-center justify-between"><div class="skel h-5 w-36"></div><div class="skel h-5 w-9"></div></div>
    <div class="skel mt-4 h-[104px] w-full" style="border-radius:16px"></div>
    <div class="skel mt-4 h-3 w-full"></div><div class="skel mt-2 h-3 w-4/5"></div></div>`).join('');
}
function renderError(){
  $('verseSlot').setAttribute('aria-busy','false');
  $('verseSlot').innerHTML=`<div class="card px-6 pb-6 pt-7 text-center">
    <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-field">${ic('alert',26,1.8)}</div>
    <h2 class="mt-3 text-[17px] font-extrabold">Lantern couldn’t find verses</h2>
    <p class="mx-auto mt-1.5 max-w-[250px] text-[13px] font-medium leading-relaxed text-muted">Check your connection and try again. Your words are saved, and this didn’t use a free search.</p>
    <button class="btn-black mt-5" onclick="search(lastSit,true)">${ic('refresh',18)}Try again</button>
    <button class="btn-soft mt-2.5" onclick="openSearch(lastSit,{focus:true})">Edit my words</button></div>`;
}
function renderResults(){
  setEcho();
  $('careSlot').innerHTML=(lastIntent!=='normal'||lastVerses.some(v=>v.mayneedprohelp))?careHTML(lastIntent==='normal'?'crisis':lastIntent):'';
  $('verseSlot').setAttribute('aria-busy','false');
  $('rerollBtn').classList.remove('hidden');
  $('verseSlot').innerHTML=lastVerses.map((v,i)=>`
    <article class="card animate-fadeup p-5" style="animation-delay:${i*90}ms">
      <div class="flex items-center justify-between gap-3"><h2 class="text-[18px] font-extrabold tracking-tight">${esc(refOf(v))}</h2><span class="rounded-full bg-field px-2.5 py-1 text-[11px] font-bold text-muted">${i+1} of ${lastVerses.length}</span></div>
      <div id="vt${i}" class="verse-panel mt-3.5"><div class="skel h-4 w-full"></div><div class="skel mt-2.5 h-4 w-11/12"></div><div class="skel mt-2.5 h-4 w-2/3"></div></div>
      ${S.s.why&&v.whythisverse?`<div class="mt-3.5"><p class="text-[12px] font-bold text-[#4a7a00]">Why this verse</p><p class="mt-1 text-[13.5px] font-medium leading-relaxed text-[#444]">${esc(v.whythisverse)}</p></div>`:''}
      <div class="mt-4 flex gap-2">
        <button data-save="${i}" onclick="saveVerse(${i})" class="act">${ic('bookmark',16,2)}Save</button>
        <button onclick="copyVerse(${i},this)" class="act">${ic('copy',16,2)}Copy</button>
        <button data-speak="${i}" onclick="speakEl('vt${i}')" class="act">${ic('speaker',16,2)}Listen</button>
      </div>
    </article>`).join('');
  refreshSaveBtns();
  lastVerses.forEach((v,i)=>scripture(v).then(t=>{const el=$('vt'+i);if(el){el.textContent=t.trim();el.dataset.ready='1';}}));
}
const isSaved=i=>{const r=refOf(lastVerses[i]);return S.journal.some(j=>j.ref===r&&j.sit===lastSit);};
function refreshSaveBtns(){
  document.querySelectorAll('[data-save]').forEach(b=>{const on=isSaved(+b.dataset.save);b.classList.toggle('on',on);
    b.innerHTML=ic('bookmark',16,2,on?'currentColor':'none')+(on?'Saved':'Save');b.setAttribute('aria-pressed',on);});
}
function saveVerse(i){
  const v=lastVerses[i],r=refOf(v),el=$('vt'+i);
  if(!el||!el.dataset.ready)return toast('The verse is still loading');
  const idx=S.journal.findIndex(j=>j.ref===r&&j.sit===lastSit);
  if(idx>-1){S.journal.splice(idx,1);toast('Removed from your journal');}
  else{S.journal.unshift({d:new Date().toISOString(),sit:lastSit,ref:r,why:v.whythisverse,text:el.textContent});toast('Saved to your journal');}
  save();renderJournal();refreshSaveBtns();haptic(14);
}
function copyVerse(i,btn){
  const v=lastVerses[i],el=$('vt'+i);
  if(!el||!el.dataset.ready)return toast('The verse is still loading');
  const txt=`"${el.textContent}" — ${refOf(v)}`;
  (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{toast('Verse copied');btn.innerHTML=ic('check',16,2.4)+'Copied';setTimeout(()=>{btn.innerHTML=ic('copy',16,2)+'Copy';},1600);}).catch(()=>toast('Couldn’t copy. Select the text instead.'));
}
function speakEl(id,quiet){
  const el=$(id);if(!el)return;
  if(!('speechSynthesis' in window))return quiet||toast('Reading aloud isn’t supported in this browser');
  if(!el.dataset.ready)return quiet||toast('The verse is still loading');
  const i=id.slice(2);
  if(speakingId===id&&!quiet){speechSynthesis.cancel();return;}
  const u=new SpeechSynthesisUtterance(el.textContent);u.rate=parseFloat(S.s.rate);
  u.onstart=()=>{speakingId=id;setSpeakBtn(i,true);};
  u.onend=u.onerror=()=>{if(speakingId===id)speakingId=null;setSpeakBtn(i,false);};
  if(!quiet)speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
function setSpeakBtn(i,on){const b=document.querySelector(`[data-speak="${i}"]`);if(!b)return;b.classList.toggle('on',on);b.innerHTML=ic(on?'stop':'speaker',16,2)+(on?'Stop':'Listen');}
