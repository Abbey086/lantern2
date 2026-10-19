/* Voice input */
let rec=null;
function mic(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return toast('Voice input isn’t supported in this browser. Try Chrome or Safari.');
  if(rec){rec.stop();return;}
  const input=$('sitInput'),base=input.value.trim();
  rec=new SR();rec.lang=S.s.lang;rec.interimResults=true;
  rec.onresult=e=>{let t='';for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;input.value=(base?base+' ':'')+t;syncInput();};
  rec.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed')toast('Microphone is blocked. Allow it in your browser settings.');else if(e.error==='no-speech')toast('I didn’t catch anything. Try again.');};
  rec.onend=()=>{$('micBtn').classList.remove('listening');$('micBtn').setAttribute('aria-label','Speak your situation');rec=null;};
  try{rec.start();$('micBtn').classList.add('listening');$('micBtn').setAttribute('aria-label','Stop listening');toast('Listening… speak naturally');haptic(10);}catch(e){rec=null;}
}
