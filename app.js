// Registrierung des Service Workers für Offline-Modus
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// ---------------------- FRAGEPOOL --------------------------

const questions = [
  // Emotionen – Level 1
  {theme:'emotionen', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „ängstlich“:', answer:'furchtsam', tip:'Beginnt mit F...'},
  {theme:'emotionen', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „fröhlich“:', answer:'heiter', tip:'Klingt ähnlich wie „weiter“. '},
  {theme:'emotionen', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „traurig“ (ohne „un-“):',
    options:['betrübt','glücklich','melancholisch','bedrückt'], correctIndex:1,
    tip:'Denk an ein stark positives Gefühl.'},
  {theme:'emotionen', level:1, type:'mc', subtype:'synonym',
    prompt:'Welches Wort passt als Synonym zu „wütend“?',
    options:['zornig','ruhig','gelassen','schüchtern'], correctIndex:0,
    tip:'Es beginnt mit Z.'},

  // Emotionen – Level 2
  {theme:'emotionen', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „hoffnungslos“ (ohne „un-“):', answer:'zuversichtlich',
    tip:'Beginnt mit Z und drückt Vertrauen in die Zukunft aus.'},
  {theme:'emotionen', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „gereizt“:', answer:'reizbar',
    tip:'Fast gleich, aber als Adjektiv mit -bar.'},
  {theme:'emotionen', level:2, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „verlegen“?',
    options:['beschämt','ängstlich','stolz','überheblich'], correctIndex:0,
    tip:'Man wird rot im Gesicht.'},
  {theme:'emotionen', level:2, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „gelassen“ (ohne „un-“):',
    options:['nervös','zufrieden','ruhig','fröhlich'], correctIndex:0,
    tip:'Denk an Lampenfieber.'},

  // Emotionen – Level 3 (Wortfamilien)
  {theme:'emotionen', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Angst“ (Verb):', answer:'fürchten',
    tip:'Es beginnt mit F und beschreibt das Gefühl aktiv.'},
  {theme:'emotionen', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Freude“ (Adjektiv):', answer:'freudig',
    tip:'Endung -ig.'},
  {theme:'emotionen', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Zorn“?',
    options:['zornig','zornlos','zornigkeit','zornvoll'], correctIndex:0,
    tip:'Die häufigste Adjektivform.'},

  // Wahrnehmung – Level 1
  {theme:'wahrnehmung', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „glänzend“:', answer:'schimmernd',
    tip:'Beginnt mit Sch...'},
  {theme:'wahrnehmung', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „duftend“:', answer:'wohlriechend',
    tip:'Zweite Silbe: -riech-.'},
  {theme:'wahrnehmung', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „laut“ (ohne „un-“):',
    options:['schrill','leise','grell','hart'], correctIndex:1,
    tip:'Wie beim Flüstern.'},

  // Wahrnehmung – Level 2
  {theme:'wahrnehmung', level:2, type:'mc', subtype:'synonym',
    prompt:'Synonym für „hell“ im Sinn von Licht:',
    options:['dunkel','leuchtend','trüb','verraucht'], correctIndex:1,
    tip:'Es hat mit Licht zu tun und beginnt mit L.'},
  {theme:'wahrnehmung', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „rauh“ (Oberfläche):', answer:'glatt',
    tip:'Gegenteil von sandig-schroff.'},
  {theme:'wahrnehmung', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „grell“ (Licht):', answer:'blendend',
    tip:'Man kneift die Augen zu.'},

  // Wahrnehmung – Level 3
  {theme:'wahrnehmung', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Geruch“ (Verb):', answer:'riechen',
    tip:'Grundform mit r- am Anfang.'},
  {theme:'wahrnehmung', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Sicht“ (Verb):', answer:'sehen',
    tip:'Das ganz gewöhnliche Verb für sehen.'},
  {theme:'wahrnehmung', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Klang“?',
    options:['klingen','klanglos','klangvoll','verklungen'], correctIndex:0,
    tip:'Die Grundform als Verb.'},

  // Fortbewegung – Level 1
  {theme:'fortbewegung', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „rennen“:', answer:'sprinten',
    tip:'Sportliches Wort mit s...'},
  {theme:'fortbewegung', level:1, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „gehen“?',
    options:['spazieren','liegen','sitzen','stehen'], correctIndex:0,
    tip:'Gemütliche Fortbewegung.'},
  {theme:'fortbewegung', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „stehen bleiben“ (ohne „un-“):',
    options:['laufen','schlafen','liegen','denken'], correctIndex:0,
    tip:'Das Gegenteil ist Bewegung.'},

  // Fortbewegung – Level 2
  {theme:'fortbewegung', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „langsam“ (ohne „un-“):', answer:'schnell',
    tip:'Denk an Tempo.'},
  {theme:'fortbewegung', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „kriechen“ (sehr langsam fortbewegen):', answer:'robben',
    tip:'Wie eine Robbe am Strand.'},
  {theme:'fortbewegung', level:2, type:'mc', subtype:'synonym',
    prompt:'Synonym für „marschieren“:',
    options:['schreiten','hocken','fahren','schlafen'], correctIndex:0,
    tip:'Soldaten tun das oft im Gleichschritt.'},

  // Fortbewegung – Level 3
  {theme:'fortbewegung', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Reise“ (Verb):', answer:'reisen',
    tip:'Grundform mit -n am Ende.'},
  {theme:'fortbewegung', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Lauf“ (Verb):', answer:'laufen',
    tip:'Ganz normales Verb.'},
  {theme:'fortbewegung', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Sprung“?',
    options:['springen','sprungvoll','sprunglos','versprungen'], correctIndex:0,
    tip:'Das Verb zur Bewegung.'},

  // Kommunikation – Level 1
  {theme:'kommunikation', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „flüstern“:', answer:'murmeln',
    tip:'Leises Sprechen, beginnt mit m...'},
  {theme:'kommunikation', level:1, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „reden“?',
    options:['sprechen','rennen','sitzen','schlafen'], correctIndex:0,
    tip:'Alltagssprache.'},
  {theme:'kommunikation', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „schweigen“ (ohne „un-“):',
    options:['reden','glotzen','laufen','träumen'], correctIndex:0,
    tip:'Man tut es mit dem Mund und der Stimme.'},

  // Kommunikation – Level 2
  {theme:'kommunikation', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „streiten“ (ohne „un-“):', answer:'sich einigen',
    tip:'Man findet gemeinsam eine Lösung.'},
  {theme:'kommunikation', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „diskutieren“:', answer:'debattieren',
    tip:'Gebrauch in politischen Runden.'},
  {theme:'kommunikation', level:2, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „antworten“?',
    options:['reagieren','rennen','schweigen','werfen'], correctIndex:0,
    tip:'Man tut dies nach einer Frage.'},

  // Kommunikation – Level 3
  {theme:'kommunikation', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Erzählung“ (Verb):', answer:'erzählen',
    tip:'Grundform.'},
  {theme:'kommunikation', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Bericht“ (Verb):', answer:'berichten',
    tip:'Endet auf -en.'},
  {theme:'kommunikation', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Frage“?',
    options:['fragen','fragend','fraglos','alle'], correctIndex:3,
    tip:'Mehrere Formen gehören dazu.'},

  // Natur – Level 1
  {theme:'natur', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „windig“:', answer:'stürmisch',
    tip:'Sehr starker Wind.'},
  {theme:'natur', level:1, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „Bach“?',
    options:['Flüsschen','Berg','Wolke','Sand'], correctIndex:0,
    tip:'Ein kleines Gewässer.'},
  {theme:'natur', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „trocken“ (ohne „un-“):',
    options:['nass','staubig','sandig','heiss'], correctIndex:0,
    tip:'Wie ein Schwamm voller Wasser.'},

  // Natur – Level 2
  {theme:'natur', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „kahl“ (Baum, ohne „un-“):', answer:'belaubt',
    tip:'Mit vielen Blättern.'},
  {theme:'natur', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „Wiese“:', answer:'Grasfläche',
    tip:'Fläche mit Gras, zusammengesetztes Wort.'},
  {theme:'natur', level:2, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „Gipfel“ (Berg)?',
    options:['Spitze','Tal','Ufer','Wolke'], correctIndex:0,
    tip:'Der höchste Punkt.'},

  // Natur – Level 3
  {theme:'natur', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Regen“ (Verb):', answer:'regnen',
    tip:'Verbform mit -n am Ende.'},
  {theme:'natur', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Wald“ (Adjektiv):', answer:'waldig',
    tip:'Adjektiv mit -ig.'},
  {theme:'natur', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Schnee“?',
    options:['schneien','beschneien','verschneit','alle'], correctIndex:3,
    tip:'Mehrere Wörter mit „Schnee-“ gehören dazu.'},

  // Schule – Level 1
  {theme:'schule', level:1, type:'text', subtype:'antonym',
    prompt:'Antonym zu „faul“ (ohne „un-“):', answer:'fleissig',
    tip:'Typische Lehrerlob-Vokabel.'},
  {theme:'schule', level:1, type:'mc', subtype:'synonym',
    prompt:'Synonym für „prüfen“ (Test schreiben lassen):',
    options:['testen','reiten','spielen','rennen'], correctIndex:0,
    tip:'Direkte englische Parallele: to test.'},
  {theme:'schule', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „schwänzen“ (ohne „un-“):',
    options:['teilnehmen','verschlafen','wegfahren','stören'], correctIndex:0,
    tip:'Man ist im Unterricht dabei.'},

  // Schule – Level 2
  {theme:'schule', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „lernen“ im Sinn von Stoff wiederholen:', answer:'pauken',
    tip:'Umgangssprache, oft vor Prüfungen.'},
  {theme:'schule', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „oberflächlich“ (ohne „un-“):', answer:'gründlich',
    tip:'Man arbeitet sehr genau.'},
  {theme:'schule', level:2, type:'mc', subtype:'synonym',
    prompt:'Synonym für „Hausaufgabe“:',
    options:['Auftrag','Pause','Zeugnis','Stunde'], correctIndex:0,
    tip:'Allgemeines Wort für eine Aufgabe.'},

  // Schule – Level 3
  {theme:'schule', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Prüfung“ (Verb):', answer:'prüfen',
    tip:'Grundform.'},
  {theme:'schule', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Bildung“ (Adjektiv):', answer:'gebildet',
    tip:'Zustand des Gebildetseins.'},
  {theme:'schule', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Note“ (Zeugnis)?',
    options:['benoten','notieren','Notiz','alle'], correctIndex:3,
    tip:'Mehrere verwandte Wörter.'},

  // Gesellschaft – Level 1
  {theme:'gesellschaft', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „höflich“:', answer:'freundlich',
    tip:'Allgemeine positive Eigenschaft.'},
  {theme:'gesellschaft', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „egoistisch“ (ohne „un-“):',
    options:['selbstlos','laut','ruhig','fröhlich'], correctIndex:0,
    tip:'Man denkt an andere.'},
  {theme:'gesellschaft', level:1, type:'mc', subtype:'synonym',
    prompt:'Synonym für „ehrlich“:',
    options:['aufrichtig','lautstark','bunt','leise'], correctIndex:0,
    tip:'Man sagt die Wahrheit.'},

  // Gesellschaft – Level 2
  {theme:'gesellschaft', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „rücksichtslos“ (ohne „un-“):', answer:'rücksichtsvoll',
    tip:'Man nimmt auf andere Rücksicht.'},
  {theme:'gesellschaft', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „hilfsbereit“:', answer:'zuvorkommend',
    tip:'Man kommt anderen im Handeln zuvor.'},
  {theme:'gesellschaft', level:2, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „unhöflich“ (ohne „un-“ benutzen)?',
    options:['frech','laut','leise','bunt'], correctIndex:0,
    tip:'Typisches Wort für schlechtes Benehmen.'},

  // Gesellschaft – Level 3
  {theme:'gesellschaft', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Hilfe“ (Verb):', answer:'helfen',
    tip:'Grundform.'},
  {theme:'gesellschaft', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Respekt“ (Verb):', answer:'respektieren',
    tip:'Endet auf -ieren.'},
  {theme:'gesellschaft', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Freund“?',
    options:['freundlich','befreunden','Freundschaft','alle'], correctIndex:3,
    tip:'Mehrere Formen gehören dazu.'},

  // Denken – Level 1
  {theme:'denken', level:1, type:'text', subtype:'synonym',
    prompt:'Synonym für „klug“:', answer:'intelligent',
    tip:'Lateinischer Ursprung, langes Wort.'},
  {theme:'denken', level:1, type:'mc', subtype:'antonym',
    prompt:'Antonym zu „vergessen“ (ohne „un-“):',
    options:['merken','laufen','hören','sehen'], correctIndex:0,
    tip:'Man behält etwas im Gedächtnis.'},
  {theme:'denken', level:1, type:'mc', subtype:'synonym',
    prompt:'Synonym für „Idee“:',
    options:['Einfall','Lärm','Reise','Kälte'], correctIndex:0,
    tip:'Etwas fällt einem ein.'},

  // Denken – Level 2
  {theme:'denken', level:2, type:'text', subtype:'antonym',
    prompt:'Antonym zu „unkonzentriert“ (ohne „un-“ verwenden):', answer:'aufmerksam',
    tip:'Man hört und schaut sehr genau hin.'},
  {theme:'denken', level:2, type:'text', subtype:'synonym',
    prompt:'Synonym für „überlegen“ (nachdenken):', answer:'nachdenken',
    tip:'Zusammengesetztes Verb mit „nach-“. '},
  {theme:'denken', level:2, type:'mc', subtype:'synonym',
    prompt:'Welches Wort ist ein Synonym für „beobachten“?',
    options:['betrachten','rennen','reden','schlafen'], correctIndex:0,
    tip:'Man schaut etwas längere Zeit genau an.'},

  // Denken – Level 3
  {theme:'denken', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Gedanke“ (Verb):', answer:'denken',
    tip:'Grundform.'},
  {theme:'denken', level:3, type:'text', subtype:'wortfamilie',
    prompt:'Wortfamilie zu „Wissen“ (Adjektiv):', answer:'wissend',
    tip:'Partizipiales Adjektiv.'},
  {theme:'denken', level:3, type:'mc', subtype:'wortfamilie',
    prompt:'Welche Form gehört zur Wortfamilie von „Erkenntnis“?',
    options:['erkennen','erkennbar','erkannt','alle'], correctIndex:3,
    tip:'Mehrere verwandte Formen.'}
];

// ------------------- QUIZ-LOGIK & APP-STATE ------------------------
let currentQuestion = null;
let currentAttempts = 0;
let score = 0;
let highscore = 0;
let level = 1;           // 1–3
let correctCount = 0;    // insgesamt
let progress = {};       // Fortschritt pro Thema & Modus

const levelDisplay = document.getElementById('levelDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const highscoreDisplay = document.getElementById('highscoreDisplay');
const themeSelect = document.getElementById('themeSelect');
const modeSelect = document.getElementById('modeSelect');
const questionText = document.getElementById('questionText');
const answerArea = document.getElementById('answerArea');
const feedback = document.getElementById('feedback');
const progressInfo = document.getElementById('progressInfo');

function loadHighscore() {
  const stored = localStorage.getItem('gymi_ws_highscore_v2');
  if (stored) {
    highscore = parseInt(stored) || 0;
  }
  highscoreDisplay.textContent = highscore;
}

function saveHighscore() {
  localStorage.setItem('gymi_ws_highscore_v2', highscore.toString());
}

function loadProgress() {
  try {
    progress = JSON.parse(localStorage.getItem('gymi_ws_progress_v2') || '{}');
  } catch(e) {
    progress = {};
  }
}

function saveProgress() {
  localStorage.setItem('gymi_ws_progress_v2', JSON.stringify(progress));
}

function keyForCurrent() {
  const mode = modeSelect.value;
  const theme = themeSelect.value;
  return mode + '::' + theme;
}

function updateProgress(correctIncrement) {
  const key = keyForCurrent();
  if (!progress[key]) {
    progress[key] = {correct:0, total:0};
  }
  if (correctIncrement) {
    progress[key].correct += 1;
  }
  progress[key].total += 1;
  saveProgress();
  const p = progress[key];
  progressInfo.textContent = 'Fortschritt aktuelles Thema: ' + p.correct + ' von ' + p.total + ' Antworten richtig.';
}

function updateProgressOnlyView() {
  const key = keyForCurrent();
  const p = progress[key] || {correct:0, total:0};
  progressInfo.textContent = 'Fortschritt aktuelles Thema: ' + p.correct + ' von ' + p.total + ' Antworten richtig.';
}

function updateDisplays() {
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
  highscoreDisplay.textContent = highscore;
}

function levelUpIfNeeded() {
  if (correctCount >= 20) {
    level = 3;
  } else if (correctCount >= 10) {
    level = 2;
  } else {
    level = 1;
  }
  updateDisplays();
}

function pickRandomQuestion() {
  const theme = themeSelect.value;
  const mode = modeSelect.value;

  let pool;
  if (mode === 'kinder') {
    pool = questions.filter(q => q.theme === theme && q.level === 1);
  } else {
    pool = questions.filter(q => q.theme === theme && q.level <= level);
  }
  if (pool.length === 0) {
    alert('Für dieses Thema/Level gibt es noch keine Fragen.');
    return null;
  }
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

function renderQuestion(q) {
  currentQuestion = q;
  currentAttempts = 0;
  feedback.textContent = '';
  feedback.className = '';
  questionText.textContent = q.prompt + ' (' + q.subtype + ', Level ' + q.level + ')';
  answerArea.innerHTML = '';

  if (q.type === 'text') {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'answerInput';
    const btn = document.createElement('button');
    btn.textContent = 'Prüfen';
    btn.onclick = checkTextAnswer;
    answerArea.appendChild(input);
    answerArea.appendChild(document.createElement('br'));
    answerArea.appendChild(btn);
    input.focus();
  } else if (q.type === 'mc') {
    const container = document.createElement('div');
    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'mc-option';
      btn.onclick = () => checkMCAnswer(index, btn);
      container.appendChild(btn);
    });
    answerArea.appendChild(container);
  }
}

function newRandomQuestion() {
  const q = pickRandomQuestion();
  if (q) {
    renderQuestion(q);
  }
}

function correctAnswerCommon() {
  feedback.textContent = '✓ richtig!';
  feedback.className = 'correct';
  score += 1;
  correctCount += 1;
  updateProgress(true);
  if (score > highscore) {
    highscore = score;
    saveHighscore();
  }
  levelUpIfNeeded();
  updateDisplays();
}

function wrongAnswerCommon(showTipNow) {
  if (showTipNow && currentQuestion && currentQuestion.tip) {
    feedback.textContent = '✗ falsch – Tipp: ' + currentQuestion.tip;
    feedback.className = 'tip';
  } else {
    feedback.textContent = '✗ falsch';
    feedback.className = 'wrong';
  }
  updateProgress(false);
}

function checkTextAnswer() {
  if (!currentQuestion) return;
  const input = document.getElementById('answerInput');
  if (!input) return;
  const val = (input.value || '').trim().toLowerCase();
  const solution = currentQuestion.answer.toLowerCase();
  if (val === solution) {
    correctAnswerCommon();
  } else {
    currentAttempts += 1;
    wrongAnswerCommon(currentAttempts >= 2);
  }
}

function checkMCAnswer(index, btn) {
  if (!currentQuestion) return;
  const buttons = answerArea.querySelectorAll('button.mc-option');
  buttons.forEach(b => b.disabled = true);

  if (index === currentQuestion.correctIndex) {
    btn.style.borderColor = 'green';
    correctAnswerCommon();
  } else {
    btn.style.borderColor = 'red';
    currentAttempts += 1;
    wrongAnswerCommon(currentAttempts >= 2);
  }
}

// ---------------- AUDIO / VORLESEN -----------------
document.getElementById('speakBtn').addEventListener('click', () => {
  if (!currentQuestion) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(currentQuestion.prompt);
  utterance.lang = 'de-DE';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
});

// ---------------- DRAG & DROP SPIEL ------------------
const dragPoolDiv = document.getElementById('dragPool');
const dragScoreDiv = document.getElementById('dragScore');
let dragScore = 0;

const dragItemsBase = [
  {word:'heiter', type:'synonym'},
  {word:'glücklich', type:'synonym'},
  {word:'leise', type:'antonym'},
  {word:'schnell', type:'antonym'},
  {word:'freudig', type:'wortfamilie'},
  {word:'laufen', type:'wortfamilie'},
  {word:'zornig', type:'synonym'},
  {word:'belaubt', type:'antonym'},
  {word:'denken', type:'wortfamilie'}
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function resetDragGame() {
  dragScore = 0;
  dragScoreDiv.textContent = 'Richtig platziert: ' + dragScore;
  dragPoolDiv.innerHTML = '';
  const items = dragItemsBase.slice();
  shuffleArray(items);
  const selected = items.slice(0, 6);

  selected.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'drag-item';
    div.textContent = item.word;
    div.draggable = true;
    div.dataset.type = item.type;
    div.dataset.id = 'drag' + idx;
    div.addEventListener('dragstart', dragStart);
    dragPoolDiv.appendChild(div);
  });
}

function dragStart(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.dataset.id);
}

const dropzones = document.querySelectorAll('.dropzone');
dropzones.forEach(zone => {
  zone.addEventListener('dragover', ev => ev.preventDefault());
  zone.addEventListener('drop', ev => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData('text/plain');
    const el = document.querySelector('[data-id="' + id + '"]');
    if (!el) return;
    const expected = zone.dataset.accept;
    if (el.dataset.type === expected) {
      zone.appendChild(el);
      el.draggable = false;
      dragScore += 1;
      dragScoreDiv.textContent = 'Richtig platziert: ' + dragScore;
      el.style.borderColor = 'green';
    } else {
      el.style.borderColor = 'red';
    }
  });
});

// ---------------- INIT -------------------
document.getElementById('newQuestionBtn').addEventListener('click', newRandomQuestion);
document.getElementById('resetDragBtn').addEventListener('click', resetDragGame);
themeSelect.addEventListener('change', updateProgressOnlyView);
modeSelect.addEventListener('change', updateProgressOnlyView);

loadHighscore();
loadProgress();
updateDisplays();
updateProgressOnlyView();
resetDragGame();
