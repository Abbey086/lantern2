/* Home: hero carousel, mood shortcuts, starter cards */
const SLIDES=[
 {t:'Racing thoughts?',s:'For anxious days and nights',big:'Peace',cta:'Find calm',art:()=>artLantern('b1'),p:'My mind is racing and I cannot stop worrying'},
 {t:'Carrying a loss?',s:'For grief and heavy days',big:'Comfort',cta:'Find comfort',art:()=>artHeart('b2'),p:'I am grieving and everything feels heavy'},
 {t:'Running on empty?',s:'For burnout and tired days',big:'Rest',cta:'Find rest',art:()=>artMoon('b3'),p:'I am burned out and I need rest'},
 {t:'A good day?',s:'Mark the moment',big:'Thanks',cta:'Give thanks',art:()=>artSun('b4'),p:'I am grateful today and want to mark this moment'}];
const MOODS=[['Anxious','wind','I feel anxious and overwhelmed right now'],['Sad','cloud','I am carrying sadness today'],['Grateful','heart','I feel grateful and want to mark this moment'],['Lost','compass','I feel lost and need direction'],['Tired','moon','I am exhausted and running on empty']];
const HOME_PICKS=[0,2,5,7];

function renderHome(){
  $('banner').innerHTML=SLIDES.map((x,i)=>`<article class="slide" role="group" aria-roledescription="slide" aria-label="${i+1} of ${SLIDES.length}">
    <span class="wm" aria-hidden="true">${x.big.slice(0,2)}</span>
    <div class="art" aria-hidden="true">${x.art()}</div>
    <div class="relative flex h-full flex-col items-start">
      <h2 class="text-[17px] font-extrabold leading-tight tracking-tight">${x.t}</h2>
      <p class="mt-0.5 text-[12px] font-medium text-[#3b3b3b]">${x.s}</p>
      <p class="big mt-2.5">${x.big}</p>
      <button class="cta mt-auto" data-p="${esc(x.p)}" onclick="runPrompt(this.dataset.p)" ${i?'tabindex="-1"':''}>${x.cta}</button>
    </div></article>`).join('');
  $('bannerDots').innerHTML=SLIDES.map((_,i)=>`<button aria-label="Go to slide ${i+1}" onclick="slideTo(${i})"></button>`).join('');
  $('moods').innerHTML=MOODS.map((m,i)=>`<button class="circle-btn" onclick="mood(${i})"><span class="circle">${ic(m[1],24,1.8)}</span>${m[0]}</button>`).join('');
  $('homeCards').innerHTML=HOME_PICKS.map((i,k)=>starterCard(i,k)).join('');
  setDot(0);
}
function mood(i){openSearch(MOODS[i][2],{focus:false});}

/* carousel: dots follow scroll, gentle autoplay that stops when the person touches it */
let slideI=0,autoT=null,userTouched=false;
function setDot(i){slideI=i;document.querySelectorAll('#bannerDots button').forEach((b,k)=>{b.classList.toggle('on',k===i);});
  document.querySelectorAll('#banner .cta').forEach((b,k)=>b.tabIndex=k===i?0:-1);}
function slideTo(i){const b=$('banner');b.scrollTo({left:i*(b.clientWidth+12),behavior:'smooth'});}
$('banner').addEventListener('scroll',()=>{const b=$('banner');const i=Math.round(b.scrollLeft/(b.clientWidth+12));if(i!==slideI)setDot(i);},{passive:true});
['pointerdown','touchstart','focusin','wheel'].forEach(ev=>$('banner').addEventListener(ev,()=>{userTouched=true;},{passive:true}));
function autoplay(){
  clearInterval(autoT);
  if(S.s.motion||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  autoT=setInterval(()=>{ if(cur!=='view-home'||document.hidden||userTouched||document.querySelector('.sheet.open'))return; slideTo((slideI+1)%SLIDES.length); },4800);
}
renderHome();
