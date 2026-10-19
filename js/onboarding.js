/* First-run onboarding (3 steps: swipe, tap dashes, or use the button) */
const OB=[
 {t:'Lantern: a verse for what you’re going through',p:'Tell Lantern what you’re carrying. It finds scripture that meets you there.',art:()=>artLantern('ob1')},
 {t:'Type it or say it out loud',p:'Write in your own words or tap the mic. No keywords, no hunting through chapters.',art:artSpeak},
 {t:'Keep what helps, privately',p:'Save verses to a journal that stays on this device. If you ever feel unsafe, support is one tap away.',art:artJournal}];
let obI=0,obX=null;

function buildOnboarding(){
  $('obTrack').innerHTML=OB.map(o=>`<div class="ob-slide"><div>${o.art()}</div></div>`).join('');
  $('obDecor').innerHTML=decor;
  $('obDash').innerHTML=OB.map((_,i)=>`<button role="tab" aria-label="Step ${i+1} of ${OB.length}" onclick="obGo(${i})"></button>`).join('');
}
function obGo(i,instant){
  i=Math.max(0,Math.min(OB.length-1,i));
  const changed=i!==obI;obI=i;
  $('obTrack').style.transform=`translateX(${-100*i}%)`;
  document.querySelectorAll('#obDash button').forEach((b,k)=>{b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i);});
  const set=()=>{$('obTitle').textContent=OB[i].t;$('obText').textContent=OB[i].p;$('obNext').textContent=i===OB.length-1?'Get started':'Next';$('obSkip').classList.toggle('hidden',i===OB.length-1);};
  if(instant||!changed){set();return;}
  const t=$('obTxt');t.classList.add('swap');setTimeout(()=>{set();t.classList.remove('swap');},180);haptic(6);
}
function obNext(){obI<OB.length-1?obGo(obI+1):finishOnboarding();}
function openOnboarding(){
  closeSheets(true);
  $('onboard').classList.remove('hidden');
  requestAnimationFrame(()=>$('onboard').classList.remove('out'));
  $('main').inert=true;$('tabbar').inert=true;
  obGo(0,true);$('onboard').focus({preventScroll:true});
}
function finishOnboarding(){
  S.onboarded=true;save();
  $('onboard').classList.add('out');
  setTimeout(()=>$('onboard').classList.add('hidden'),480);
  $('main').inert=false;$('tabbar').inert=false;
  go('view-home',{replace:true});
}
$('obNext').onclick=obNext;
/* swipe + keyboard */
const st=$('obStage');
st.addEventListener('pointerdown',e=>{obX=e.clientX;});
st.addEventListener('pointerup',e=>{if(obX===null)return;const dx=e.clientX-obX;obX=null;if(Math.abs(dx)>45)obGo(obI+(dx<0?1:-1));});
st.addEventListener('pointercancel',()=>{obX=null;});
$('onboard').addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')obGo(obI+1);else if(e.key==='ArrowLeft')obGo(obI-1);else if(e.key==='Escape')finishOnboarding();
});
buildOnboarding();
