/* Journal */
function renderJournal(){
  const n=S.journal.length;
  $('jEmpty').classList.toggle('hidden',n>0);
  $('jActions').classList.toggle('hidden',n===0);
  if(!n&&!$('jArt').innerHTML)$('jArt').innerHTML=artJournal();
  $('jList').innerHTML=S.journal.map((j,i)=>`<article class="card p-5">
    <div class="flex items-center justify-between gap-3">
      <span class="rounded-full bg-field px-3 py-1 text-[11px] font-bold text-muted">${new Date(j.d).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</span>
      <button onclick="delJ(${i})" class="-mr-2 -mt-2 grid h-11 w-11 place-items-center rounded-full text-[#C2271B]" aria-label="Delete ${esc(j.ref)}">${ic('trash',18)}</button>
    </div>
    <h2 class="mt-1 text-[17px] font-extrabold tracking-tight">${esc(j.ref)}</h2>
    <div class="verse-panel mt-3" style="font-size:16px">${esc(j.text)}</div>
    <p class="mt-3 text-[12.5px] font-medium italic leading-relaxed text-muted">You wrote: “${esc(j.sit)}”</p></article>`).join('');
}
function delJ(i){
  const [it]=S.journal.splice(i,1);save();renderJournal();haptic(10);
  toast('Verse removed','Undo',()=>{S.journal.splice(i,0,it);save();renderJournal();});
}
function clearJournal(){
  askConfirm({title:'Clear your whole journal?',body:`This removes all ${S.journal.length} saved verses from this device. You can export them first.`,ok:'Clear journal'},()=>{S.journal=[];save();renderJournal();toast('Journal cleared');});
}
function exportJournal(){
  const b=new Blob([JSON.stringify(S.journal,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lantern-journal.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);toast('Exported lantern-journal.json');
}
function eraseAll(){
  askConfirm({title:'Erase everything?',body:'This deletes your journal, settings and plan from this device. It can’t be undone.',ok:'Erase everything'},()=>{try{localStorage.removeItem(LS);}catch(e){}location.reload();});
}
