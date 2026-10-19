/* Search page: input, recent searches, saved verses, popular searches, quota */
const POP_PICKS=[0,2,3,5,7,9];

function onShow(id){
  if(id==='view-search')renderSearchPage();
  if(id==='view-home')autoplay();
  if(id==='view-journal')renderJournal();
}
function openSearch(text,o={}){
  if(text!==undefined)$('sitInput').value=text;
  go('view-search');syncInput();
  const want=o.focus===undefined?text===undefined:o.focus;
  if(want){const el=$('sitInput');el.focus({preventScroll:true});el.setSelectionRange(el.value.length,el.value.length);}
}
function syncInput(){
  const el=$('sitInput');el.style.height='auto';el.style.height=Math.min(el.scrollHeight,132)+'px';
  const has=!!el.value.trim();
  $('clearBtn').classList.toggle('hidden',!el.value);
  el.closest('.field').classList.toggle('has-text',!!el.value);
  $('findBtn').setAttribute('aria-disabled',has?'false':'true');
}
function clearInput(){$('sitInput').value='';syncInput();$('sitInput').focus();}
$('sitInput').addEventListener('input',syncInput);
$('sitInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();search();}
});

function updateQuota(){
  const q=$('quota');
  if(S.plan!=='free'){q.textContent='';q.classList.add('hidden');return;}
  const d=new Date().toDateString();const used=S.searches.d===d?S.searches.n:0;const left=Math.max(0,FREE_LIMIT-used);
  q.classList.remove('hidden');
  q.textContent=left?`${left} of ${FREE_LIMIT} free searches left today`:'No free searches left today';
}
function addRecent(t){S.recent=[t,...S.recent.filter(x=>x!==t)].slice(0,6);save();}
function clearRecent(){S.recent=[];save();renderSearchPage();toast('Recent searches cleared');}
function runRecent(i){const t=S.recent[i];if(t){$('sitInput').value=t;search(t);}}

function renderSearchPage(){
  /* recent */
  $('recentWrap').classList.toggle('hidden',!S.recent.length);
  $('recentList').innerHTML=S.recent.map((t,i)=>`<button class="chip max-w-full" title="${esc(t)}" onclick="runRecent(${i})"><span class="text-muted">${ic('clock',14,2)}</span><span class="truncate" style="max-width:230px">${esc(t)}</span></button>`).join('');
  /* saved */
  const seen=new Set(),uniq=S.journal.filter(j=>!seen.has(j.ref)&&seen.add(j.ref)).slice(0,8);
  const tints=['#DCF3B0','#F8DCE2','#D6EAF8','#FFE3C4','#E6DEFA','#FFF1BF'];
  $('savedList').innerHTML=uniq.length?uniq.map((j,i)=>{
    const k=j.ref.lastIndexOf(' ');const book=j.ref.slice(0,k),cv=j.ref.slice(k+1);
    return `<button class="circle-btn shrink-0" style="min-width:68px" onclick="go('view-journal')" aria-label="Saved verse ${esc(j.ref)}"><span class="circle" style="width:56px;height:56px;background:${tints[i%tints.length]}">${ic('bookmark',22,1.8,'currentColor')}</span><span class="text-center leading-tight">${esc(book)}<br><span class="text-muted">${esc(cv)}</span></span></button>`;
  }).join(''):`<button onclick="openSearch()" class="flex w-full items-center gap-3 rounded-2xl border border-dashed border-[#d2d2d2] bg-white/60 px-4 py-3.5 text-left text-[12.5px] font-medium text-muted"><span class="text-ink/60">${ic('bookmark',20)}</span>Verses you save will show up here.</button>`;
  /* popular */
  $('popList').innerHTML=POP_PICKS.map(i=>{const s=STARTERS[i],[icon,bg]=CAT[s[0]];
    return `<button class="pop" onclick="runPrompt(STARTERS[${i}][4])"><span class="av" style="background:${bg}">${ic(icon,17,1.9)}</span><span class="min-w-0"><b>${esc(s[2])}</b><span class="s">${esc(s[0])}</span></span></button>`;}).join('');
  updateQuota();syncInput();
}
