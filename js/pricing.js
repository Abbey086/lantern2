/* Plans & pricing (simulated locally) */
const TIERS=[
 {id:'free',name:'Lantern Free',m:0,y:0,f:[['3 verse searches a day',1],['WEB translation',1],['Journal, 10 entries',1],['Care resources, always',1],['Voice input',0],['Accent colors and export',0]],cta:'Current plan'},
 {id:'plus',name:'Lantern Plus',m:4.99,y:3.99,hot:1,flag:'Most loved',f:[['Unlimited searches',1],['All 4 translations',1],['Voice in and read-aloud',1],['Unlimited journal and export',1],['4 accent colors',1],['Care-plan mode',0]],cta:'Go Plus'},
 {id:'shep',name:'Lantern Shepherd',m:9.99,y:7.99,flag:'For care teams',f:[['Everything in Plus',1],['Trusted-contact sharing',1],['Priority support',1],['Offline scripture packs',1],['Small-group and clergy tools',1],['Early features',1]],cta:'Choose Shepherd'}];
const CMP=[['Daily searches','3','unl','unl'],['Translations','1','4','4'],['Voice input','–','yes','yes'],['Read-aloud','–','yes','yes'],['Journal','10','unl','unl'],['Accent colors','1','4','4'],['Export','–','yes','yes'],['Care-plan mode','–','–','yes'],['Contact sharing','–','–','yes'],['Priority support','–','–','yes']];
const PLAN_NAME={free:'Free',plus:'Plus',shep:'Shepherd'};
const cell=v=>v==='yes'?`<span class="inline-grid h-5 w-5 place-items-center rounded-full" style="background:var(--ac)">${ic('check',12,3.2)}</span>`:v==='unl'?'<span class="font-extrabold">∞</span>':v;
function renderPricing(){
  $('billM').classList.toggle('on',S.bill==='m');$('billY').classList.toggle('on',S.bill==='y');
  $('billM').setAttribute('aria-pressed',S.bill==='m');$('billY').setAttribute('aria-pressed',S.bill==='y');
  $('tiers').innerHTML=TIERS.map(t=>{const p=S.bill==='m'?t.m:t.y,cur=S.plan===t.id;return `<div class="card relative w-full md:w-1/3 p-5 ${t.hot?'ring-2 ring-ink':''}">
    ${t.flag?`<span class="absolute -top-3 right-5 rounded-full px-3 py-1 text-[11px] font-extrabold" style="background:${t.hot?'var(--ac)':'#fff'};box-shadow:0 2px 8px rgba(0,0,0,.1)">${t.flag}</span>`:''}
    <h2 class="text-[16px] font-extrabold">${t.name}</h2>
    <p class="mt-1 text-[32px] font-extrabold leading-none tracking-tight">$${p}<span class="text-[13px] font-semibold text-muted"> /month${S.bill==='y'&&p?', billed yearly':''}</span></p>
    <ul class="mt-4 flex flex-col gap-2.5">${t.f.map(f=>`<li class="flex items-center gap-2.5 text-[13px] font-medium ${f[1]?'text-[#333]':'text-[#aaa]'}"><span class="grid h-5 w-5 shrink-0 place-items-center rounded-full ${f[1]?'':'bg-field'}" style="${f[1]?'background:var(--ac)':''}">${ic(f[1]?'check':'minus',12,3.2)}</span>${f[0]}</li>`).join('')}</ul>
    <button onclick="choosePlan('${t.id}')" class="${cur?'btn-soft':'btn-black'} mt-5" ${cur?'aria-current="true"':''}>${cur?'Current plan':t.cta}</button></div>`;}).join('');
  $('cmpTable').innerHTML=`<div class="grid grid-cols-4 gap-1 border-b border-line py-3 text-[11px] font-bold text-muted"><span>Feature</span><span class="text-center">Free</span><span class="text-center">Plus</span><span class="text-center">Shep.</span></div>`+CMP.map(r=>`<div class="grid grid-cols-4 items-center gap-1 border-b border-line py-3 font-medium text-[#555] last:border-0"><span>${r[0]}</span><span class="text-center font-bold">${cell(r[1])}</span><span class="text-center font-bold">${cell(r[2])}</span><span class="text-center font-bold">${cell(r[3])}</span></div>`).join('');
}
function setBill(b){S.bill=b;save();renderPricing();haptic(6);}
function choosePlan(id){S.plan=id;save();renderPlanBadge();renderPricing();updateQuota();toast(id==='free'?'Switched to Free':`Lantern ${PLAN_NAME[id]} is on`);haptic(20);}
function renderPlanBadge(){$('planTxt').textContent=PLAN_NAME[S.plan]+' plan';}
renderPlanBadge();renderPricing();
