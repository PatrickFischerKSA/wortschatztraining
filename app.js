// PWA service worker registration
if('serviceWorker' in navigator){
 navigator.serviceWorker.register('sw.js');
}

// Dummy question pools
const questions={
  kinder:[
    {q:"Synonym für fröhlich?", type:"text", a:"heiter"},
    {q:"Gegenteil von laut?", type:"text", a:"leise"}
  ],
  profi:[
    {q:"Wortfamilie zu Angst (Verb)?", type:"text", a:"fürchten"},
    {q:"Antonym zu oberflächlich?", type:"text", a:"gründlich"}
  ]
};

let current=null;

function loadProgress(){
 return JSON.parse(localStorage.getItem("ws_progress")||"{}");
}
function saveProgress(p){
 localStorage.setItem("ws_progress",JSON.stringify(p));
}

document.getElementById("newQuestion").onclick=()=>{
 let mode=document.getElementById("modeSelect").value;
 let pool=questions[mode];
 current=pool[Math.floor(Math.random()*pool.length)];
 document.getElementById("question").textContent=current.q;
 document.getElementById("answers").innerHTML='<input id="ans"><button id="check">Prüfen</button>';
 document.getElementById("feedback").textContent="";
 document.getElementById("check").onclick=check;
};

function check(){
 let val=document.getElementById("ans").value.trim().toLowerCase();
 if(val===current.a.toLowerCase()){
   document.getElementById("feedback").textContent="Richtig!";
   let prog=loadProgress();
   prog[current.q]=(prog[current.q]||0)+1;
   saveProgress(prog);
 } else {
   document.getElementById("feedback").textContent="Falsch";
 }
}

document.getElementById("speakBtn").onclick=()=>{
 if(!current)return;
 let u=new SpeechSynthesisUtterance(current.q);
 speechSynthesis.speak(u);
};
