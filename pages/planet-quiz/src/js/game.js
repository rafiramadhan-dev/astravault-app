// AUDIO SYSTEM (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === "correct") {
    osc.type = "square";
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      1046.5,
      audioCtx.currentTime + 0.1,
    );
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } else if (type === "wrong") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === "click") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } else if (type === "win") {
    const notes = [523, 659, 783, 1046];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.frequency.value = f;
      g.gain.setValueAtTime(0.1, audioCtx.currentTime + i * 0.1);
      g.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + i * 0.1 + 0.2,
      );
      o.start(audioCtx.currentTime + i * 0.1);
      o.stop(audioCtx.currentTime + i * 0.1 + 0.2);
    });
  }
}

// MODAL FUNCTIONS
function showExitModal() {
  playSound("click");
  document.getElementById("exitModal").classList.add("active");
}

function closeExitModal() {
  playSound("click");
  document.getElementById("exitModal").classList.remove("active");
}

function goToHome() {
  playSound("click");
  // Ganti dengan path ke halaman home Anda
  window.location.href = "../index.html"; // Sesuaikan path ini
}

// Data Soal
const allQuestions = {
  easy: [
    {
      q: "Planet yang kita tinggali?",
      e: "🌍",
      o: ["MARS", "VENUS", "BUMI", "JUPITER"],
      a: 2,
    },
    {
      q: "Planet terdekat dengan Matahari?",
      e: "☀️",
      o: ["VENUS", "MERKURIUS", "MARS", "BUMI"],
      a: 1,
    },
    {
      q: "Planet terbesar di tata surya?",
      e: "🪐",
      o: ["JUPITER", "SATURNUS", "URANUS", "NEPTUNUS"],
      a: 0,
    },
    {
      q: "Planet merah?",
      e: "🔴",
      o: ["MARS", "BUMI", "VENUS", "JUPITER"],
      a: 0,
    },
    {
      q: "Planet dengan cincin besar?",
      e: "💍",
      o: ["JUPITER", "SATURNUS", "URANUS", "MARS"],
      a: 1,
    },
    {
      q: "Pusat tata surya?",
      e: "⭐",
      o: ["BULAN", "MATAHARI", "BINTANG", "JUPITER"],
      a: 1,
    },
    {
      q: "Planet terjauh?",
      e: "🌌",
      o: ["URANUS", "SATURNUS", "PLUTO", "NEPTUNUS"],
      a: 3,
    },
    {
      q: "Planet biru?",
      e: "💙",
      o: ["MARS", "BUMI", "VENUS", "JUPITER"],
      a: 1,
    },
    {
      q: "Planet terkecil?",
      e: "⚪",
      o: ["MARS", "MERKURIUS", "VENUS", "BUMI"],
      a: 1,
    },
    { q: "Jumlah planet?", e: "🔢", o: ["7", "8", "9", "10"], a: 1 },
    {
      q: "Satelit Bumi?",
      e: "🌙",
      o: ["MARS", "BULAN", "VENUS", "TITAN"],
      a: 1,
    },
    {
      q: "Gas raksasa pertama?",
      e: "🌬️",
      o: ["MARS", "JUPITER", "BUMI", "VENUS"],
      a: 1,
    },
    {
      q: "Planet kedua?",
      e: "2️⃣",
      o: ["BUMI", "VENUS", "MARS", "MERKURIUS"],
      a: 1,
    },
    {
      q: "Planet kekuningan?",
      e: "🟡",
      o: ["MARS", "BUMI", "VENUS", "JUPITER"],
      a: 2,
    },
    {
      q: "Banyak kawah?",
      e: "🌑",
      o: ["MERKURIUS", "VENUS", "MARS", "BUMI"],
      a: 0,
    },
  ],
  medium: [
    {
      q: "Planet terpanas?",
      e: "🔥",
      o: ["MERKURIUS", "VENUS", "MARS", "JUPITER"],
      a: 1,
    },
    {
      q: "Rotasi tercepat?",
      e: "⚡",
      o: ["BUMI", "MARS", "JUPITER", "SATURNUS"],
      a: 2,
    },
    {
      q: "Great Red Spot ada di?",
      e: "🌪️",
      o: ["JUPITER", "SATURNUS", "NEPTUNUS", "URANUS"],
      a: 0,
    },
    {
      q: "Rotasi miring 98°?",
      e: "↩️",
      o: ["NEPTUNUS", "URANUS", "SATURNUS", "MARS"],
      a: 1,
    },
    {
      q: "Bulan terbanyak?",
      e: "🌙",
      o: ["JUPITER", "SATURNUS", "URANUS", "NEPTUNUS"],
      a: 1,
    },
    {
      q: "Rotasi terbalik?",
      e: "🔄",
      o: ["MARS", "VENUS", "URANUS", "JUPITER"],
      a: 1,
    },
    {
      q: "Revolusi Bumi?",
      e: "📅",
      o: ["300 HARI", "365 HARI", "400 HARI", "500 HARI"],
      a: 1,
    },
    {
      q: "Gunung tertinggi?",
      e: "⛰️",
      o: ["BUMI", "MARS", "VENUS", "MERKURIUS"],
      a: 1,
    },
    {
      q: "Planet dingin?",
      e: "❄️",
      o: ["NEPTUNUS", "URANUS", "SATURNUS", "MARS"],
      a: 1,
    },
    {
      q: "Atmosfer CO2 tebal?",
      e: "💨",
      o: ["OKSIGEN", "CO2", "NITROGEN", "HIDROGEN"],
      a: 1,
    },
    {
      q: "Orbit tercepat?",
      e: "🏃",
      o: ["MERKURIUS", "VENUS", "BUMI", "MARS"],
      a: 0,
    },
    {
      q: "Tekanan tertinggi?",
      e: "⬇️",
      o: ["BUMI", "VENUS", "MARS", "JUPITER"],
      a: 1,
    },
    { q: "Bulan Uranus?", e: "🌕", o: ["13", "27", "62", "82"], a: 1 },
    {
      q: "Isi cincin Saturnus?",
      e: "🧊",
      o: ["LOGAM", "ES & BATU", "DEBU", "GAS"],
      a: 1,
    },
    {
      q: "Lebih ringan dari air?",
      e: "💧",
      o: ["JUPITER", "SATURNUS", "URANUS", "NEPTUNUS"],
      a: 1,
    },
  ],
  hard: [
    {
      q: "Sumbu Bumi?",
      e: "📐",
      o: ["20.5°", "23.5°", "25.5°", "27.5°"],
      a: 1,
    },
    {
      q: "Suhu Venus?",
      e: "🌡️",
      o: ["350°C", "400°C", "465°C", "500°C"],
      a: 2,
    },
    {
      q: "Rotasi Venus?",
      e: "⏰",
      o: ["100 HARI", "243 HARI", "300 HARI", "500 HARI"],
      a: 1,
    },
    {
      q: "Olympus Mons di?",
      e: "🏔️",
      o: ["BUMI", "MARS", "VENUS", "JUPITER"],
      a: 1,
    },
    {
      q: "Satelit terbesar?",
      e: "🛸",
      o: ["TITAN", "GANYMEDE", "IO", "EUROPA"],
      a: 1,
    },
    {
      q: "Orbit Neptunus?",
      e: "🔄",
      o: ["84 TAHUN", "120 TAHUN", "165 TAHUN", "200 TAHUN"],
      a: 2,
    },
    {
      q: "Magnet terkuat?",
      e: "🧲",
      o: ["BUMI", "JUPITER", "SATURNUS", "NEPTUNUS"],
      a: 1,
    },
    {
      q: "Densitas Bumi?",
      e: "⚖️",
      o: ["3.5 g/cm³", "4.5 g/cm³", "5.5 g/cm³", "6.5 g/cm³"],
      a: 2,
    },
    {
      q: "Satelit vulkanik?",
      e: "🌋",
      o: ["EUROPA", "IO", "TITAN", "PHOBOS"],
      a: 1,
    },
    {
      q: "Kecepatan cahaya?",
      e: "🚀",
      o: ["150rb km/s", "200rb km/s", "300rb km/s", "500rb km/s"],
      a: 2,
    },
    {
      q: "Densitas terkecil?",
      e: "☁️",
      o: ["JUPITER", "SATURNUS", "URANUS", "NEPTUNUS"],
      a: 1,
    },
    { q: "Massa Jupiter?", e: "🏋️", o: ["118x", "218x", "318x", "418x"], a: 2 },
    {
      q: "Angin kencang?",
      e: "🌬️",
      o: ["JUPITER", "SATURNUS", "URANUS", "NEPTUNUS"],
      a: 3,
    },
    {
      q: "Jarak Bumi ke Matahari?",
      e: "📏",
      o: ["0.5 SA", "1.0 SA", "1.5 SA", "2.0 SA"],
      a: 1,
    },
    { q: "Bulan Mars?", e: "✌️", o: ["1", "2", "3", "4"], a: 1 },
  ],
};

let currentLevel = [],
  currentIndex = 0,
  score = 0,
  lives = 3,
  timeLeft = 0,
  maxTime = 0,
  timerId = null,
  correctAns = 0;

function startGame(level) {
  if (audioCtx.state === "suspended") audioCtx.resume();
  playSound("click");
  currentLevel = [...allQuestions[level]].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  correctAns = 0;
  if (level === "easy") {
    maxTime = 20;
    lives = 3;
  } else if (level === "medium") {
    maxTime = 15;
    lives = 3;
  } else {
    maxTime = 10;
    lives = 2;
  }
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  updateUI();
  loadQuestion();
}

function loadQuestion() {
  if (currentIndex >= 15 || lives <= 0) return endGame();
  const data = currentLevel[currentIndex];
  document.getElementById("questionNum").textContent = `${currentIndex + 1}/15`;
  document.getElementById("planetIcon").textContent = data.e;
  document.getElementById("questionText").textContent = data.q;
  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";
  data.o.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx, data.a);
    grid.appendChild(btn);
  });
  timeLeft = maxTime;
  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft -= 0.1;
    document.getElementById("timerFill").style.width =
      (timeLeft / maxTime) * 100 + "%";
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleWrong("WAKTU HABIS! ⏰");
    }
  }, 100);
}

function checkAnswer(sel, cor) {
  clearInterval(timerId);
  const btns = document.querySelectorAll(".option-btn");
  btns.forEach((b) => (b.disabled = true));
  if (sel === cor) {
    btns[sel].classList.add("correct");
    score += Math.round(timeLeft * 10) + 100;
    correctAns++;
    playSound("correct");
    showFeedback("BENAR! ✨", "var(--success)");
  } else {
    btns[sel].classList.add("wrong");
    btns[cor].classList.add("correct");
    handleWrong("SALAH! ❌");
  }
  document.getElementById("scoreDisplay").textContent = score;
  setTimeout(() => {
    currentIndex++;
    loadQuestion();
  }, 1500);
}

function handleWrong(msg) {
  lives--;
  playSound("wrong");
  updateUI();
  showFeedback(msg, "var(--danger)");
  if (lives <= 0) setTimeout(endGame, 1500);
}

function updateUI() {
  document.getElementById("livesDisplay").textContent = "❤️".repeat(lives);
  document.getElementById("scoreDisplay").textContent = score;
}

function showFeedback(txt, col) {
  const f = document.getElementById("feedback");
  f.textContent = txt;
  f.style.background = col;
  f.classList.add("active");
  setTimeout(() => f.classList.remove("active"), 1200);
}

function endGame() {
  clearInterval(timerId);
  playSound("win");
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("finalScore").textContent = score;
  const acc = Math.round((correctAns / 15) * 100);
  let rank = acc >= 90 ? "SSS" : acc >= 80 ? "S" : acc >= 60 ? "A" : "B";
  document.getElementById("rankBadge").textContent = `RANK ${rank} (${acc}%)`;
}

// Init Stars
const stars = document.getElementById("starsContainer");
for (let i = 0; i < 80; i++) {
  const s = document.createElement("div");
  s.className = "star";
  s.style.width = s.style.height = Math.random() * 3 + "px";
  s.style.top = Math.random() * 100 + "%";
  s.style.left = Math.random() * 100 + "%";
  s.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
  s.style.setProperty("--opacity", Math.random());
  stars.appendChild(s);
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeExitModal();
});
