/* Scenario starters */
const STARTERS=[
 ['Anxiety','Comfort','Panic before a big day','Calm for racing thoughts before interviews, exams and hard conversations.','I cannot stop worrying about tomorrow\'s interview'],
 ['Anxiety','Comfort','Cannot sleep at 2am','Verses for the ceiling-staring hours when thoughts will not settle.','My mind will not shut off and I cannot sleep'],
 ['Grief','Comfort','Losing someone I love','Scripture that sits with you in the valley of loss.','My grandfather passed away last week'],
 ['Relationships','Hope','Mending a friendship','Words for repair, apology and second chances.','I hurt my best friend and I want to fix it'],
 ['Relationships','Hope','Apologizing after a fight','Courage to say sorry first, and mean it.','We fight every night and I want to apologize'],
 ['Work','Strength','Burned out at work','Rest as holy, not weakness.','I am burned out and exhausted at my job'],
 ['Work','Strength','Money worries','Provision and peace for the budget that will not balance.','I am scared about rent and money this month'],
 ['Faith','Guidance','Doubting my faith','Honest verses for honest doubt.','I am doubting whether I even believe anymore'],
 ['Faith','Guidance','A big decision ahead','Guidance sized for the next step, not the whole map.','I have to choose between two job offers in different cities'],
 ['Loneliness','Comfort','Feeling invisible and lonely','Presence for the empty-room feelings.','I feel completely alone and forgotten'],
 ['Gratitude','Gratitude','A thankful heart','Mark the recovery, name the gifts.','I am so grateful for my recovery this year'],
 ['Forgiveness','Hope','When I have messed up','Mercy for the person in the mirror.','I cannot forgive myself for my past mistakes']];

/* category → icon + pastel (kept fixed so cards stay lively on every accent color) */
const CAT={
  Anxiety:['wind','#DCF3B0'], Grief:['cloud','#D6EAF8'], Relationships:['users','#F8DCE2'], Work:['briefcase','#FFE3C4'],
  Faith:['star','#E6DEFA'], Loneliness:['moon','#DCE6FA'], Gratitude:['sun','#FFF1BF'], Forgiveness:['heart','#F8DCE2']
};
let curCat='All';
const CATS=['All',...new Set(STARTERS.map(s=>s[0]))];

function starterCard(i,k=0){
  const s=STARTERS[i],[icon,bg]=CAT[s[0]];
  return `<button class="sc animate-fadeup" style="animation-delay:${k*45}ms" onclick="openScenario(${i})" aria-label="${esc(s[2])}, ${esc(s[0])}">
    <span class="art" style="background:${bg}"><span class="tag">${esc(s[1])}</span><span class="orb">${ic(icon,28,1.8)}</span></span>
    <h3>${esc(s[2])}</h3><p>${esc(s[0])}</p></button>`;
}
function renderCats(){
  $('catChips').innerHTML=CATS.map(c=>`<button role="tab" aria-selected="${c===curCat}" onclick="setCat('${c}')" class="chip ${c===curCat?'on':''}">${c}</button>`).join('');
}
function setCat(c){curCat=c;renderCats();renderScen();haptic(6);}
function renderScen(){
  const list=STARTERS.map((s,i)=>({s,i})).filter(x=>curCat==='All'||x.s[0]===curCat);
  $('scCount').textContent=list.length+(list.length===1?' starter':' starters');
  $('scList').innerHTML=list.map(({i},k)=>starterCard(i,k)).join('');
}
function openScenario(i){
  const s=STARTERS[i],[icon,bg]=CAT[s[0]];
  $('ssTag').textContent=s[0]+' · '+s[1];
  $('ssTitle').textContent=s[2];$('ssDesc').textContent=s[3];
  $('ssPrompts').innerHTML=[s[4],'Today especially: '+s[4]].map(p=>
    `<button data-p="${esc(p)}" onclick="runPrompt(this.dataset.p)" class="rounded-2xl bg-field px-4 py-3.5 text-left text-[13.5px] font-semibold leading-snug press">“${esc(p)}”</button>`).join('');
  $('ssGo').onclick=()=>runPrompt(s[4]);
  openSheet('sheet-scenario');
}
function runPrompt(p){
  closeSheets(true);$('sitInput').value=p;search(p);
}
renderCats();renderScen();
