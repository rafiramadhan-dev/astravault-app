// ============ PREVENT SCROLLING ============
document.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false },
);

// ============ SOUND SYSTEM ============
let soundEnabled = true;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const sounds = {
  // Sound saat menembak
  shoot: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  },

  // Sound saat planet nempel/menempel
  attach: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 400;
    oscillator.type = "square";
    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.08,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  },

  // Sound saat planet meledak/explode
  explode: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 100;
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  },

  // Sound saat bounce ke dinding
  bounce: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 600;
    oscillator.type = "square";
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.05,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  },

  // Sound combo
  combo: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      880,
      audioContext.currentTime + 0.2,
    );
    oscillator.type = "triangle";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  },

  // Sound perfect shot
  perfect: function () {
    if (!soundEnabled) return;
    [523.25, 659.25].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.25, audioContext.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + i * 0.1 + 0.15,
      );
      osc.start(audioContext.currentTime + i * 0.1);
      osc.stop(audioContext.currentTime + i * 0.1 + 0.15);
    });
  },

  // Sound naik level
  levelUp: function () {
    if (!soundEnabled) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + i * 0.1 + 0.2,
      );
      osc.start(audioContext.currentTime + i * 0.1);
      osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
    });
  },

  // Sound victory/menang
  victory: function () {
    if (!soundEnabled) return;
    [440, 550, 660, 880, 1046.5, 1318.51].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = freq;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.15);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + i * 0.15 + 0.3,
      );
      oscillator.start(audioContext.currentTime + i * 0.15);
      oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
    });
  },

  // Sound game over/kalah
  lose: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      audioContext.currentTime + 0.5,
    );
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  },

  // Sound waktu hampir habis (warning beep)
  warning: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 1000;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.15,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  },

  // Sound waktu sangat kritis (danger beep)
  danger: function () {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 1200;
    oscillator.type = "square";
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  },

  // Sound cascade/floating planets
  cascade: function () {
    if (!soundEnabled) return;
    [300, 400, 500].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.05);
      gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + i * 0.05 + 0.15,
      );
      osc.start(audioContext.currentTime + i * 0.05);
      osc.stop(audioContext.currentTime + i * 0.05 + 0.15);
    });
  },
};

// Toggle sound function
function toggleSound() {
  soundEnabled = !soundEnabled;
  const soundBtn = document.getElementById("soundBtn");
  if (soundBtn) {
    soundBtn.innerHTML = soundEnabled
      ? '<iconify-icon icon="mdi:volume-high"></iconify-icon>'
      : '<iconify-icon icon="mdi:volume-off"></iconify-icon>';
  }
}

// ============ CREATE STARFIELD ============
function createStarfield() {
  const starfield = document.getElementById("starfield");
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 4 + 2}s`);
    star.style.animationDelay = `${Math.random() * 4}s`;
    starfield.appendChild(star);
  }
}
createStarfield();

// ============ CANVAS SETUP ============
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const container = document.getElementById("gameContainer");
  const rect = container.getBoundingClientRect();
  const maxWidth = Math.min(rect.width - 20, 450);
  const maxHeight = rect.height - 20;
  canvas.width = maxWidth;
  canvas.height = Math.min(maxHeight, maxWidth * 1.4);
  setupGameDimensions();
}

// ============ GAME DIMENSIONS ============
let PLANET_RADIUS, ROWS, COLS, SHOOTER_SPEED, SHOOTER_Y;

function setupGameDimensions() {
  PLANET_RADIUS = Math.floor(canvas.width / 14);
  ROWS = 12;
  COLS = Math.floor(canvas.width / (PLANET_RADIUS * 2));
  SHOOTER_SPEED = canvas.width / 40;
  SHOOTER_Y = canvas.height - PLANET_RADIUS * 1.8;
}

// ============ PLANET TYPES (IMAGES) ============
const planetTypes = [
  {
    id: 0,
    name: "UFO",
    color: "#FF6B6B",
    image: "Assets/PlanetShooter/Planet1.png",
  },
  {
    id: 1,
    name: "Rocket",
    color: "#4ECDC4",
    image: "Assets/PlanetShooter/Planet2.png",
  },
  {
    id: 2,
    name: "Fire",
    color: "#FFA500",
    image: "Assets/PlanetShooter/Planet3.png",
  },
  {
    id: 3,
    name: "UFO2",
    color: "#45B7D1",
    image: "Assets/PlanetShooter/Planet4.png",
  },
  {
    id: 4,
    name: "Heart",
    color: "#FF1493",
    image: "Assets/PlanetShooter/Planet5.png",
  },
  {
    id: 5,
    name: "Enemy",
    color: "#98D8C8",
    image: "Assets/PlanetShooter/Planet6.png",
  },
];

// Load images
let imagesLoaded = 0;
planetTypes.forEach((type) => {
  const img = new Image();
  img.onload = () => {
    type.imageObj = img;
    imagesLoaded++;
  };
  img.onerror = () => {
    type.imageObj = null;
    imagesLoaded++;
  };
  img.src = type.image;
});

// ============ LEVEL SYSTEM ============
const levelConfig = {
  1: { time: 60, target: 900 },
  2: { time: 30, target: 600 },
  3: { time: 20, target: 500 },
};

let currentLevel = 1;
let timeRemaining = 60;
let timerInterval = null;
let levelStartScore = 0;

// ============ GAME VARIABLES ============
let grid = [];
let shooter = null;
let currentPlanet = null;
let nextPlanet = null;
let score = 0;
let highScore = localStorage.getItem("galacticShooterHighScore") || 0;
let combo = 0;
let comboCount = 0;
let maxComboReached = 0;
let lastMatchedType = -1;
let gameOver = false;
let gameStarted = false;
let particles = [];
let animatingPlanets = [];
let aimX = null;
let aimY = null;

// ============ PLANET CLASS ============
class Planet {
  constructor(row, col, type) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.updatePosition();
    this.radius = PLANET_RADIUS;
    this.color = planetTypes[type].color;
    this.wobble = Math.random() * Math.PI * 2;
    this.scale = 0;
    this.targetScale = 1;
    this.pulse = 0;
    this.alpha = 1;
    this.isExploding = false;
  }

  updatePosition() {
    const offsetX = this.row % 2 === 1 ? PLANET_RADIUS : 0;
    this.x = this.col * (PLANET_RADIUS * 2) + PLANET_RADIUS + offsetX;
    this.y = this.row * (PLANET_RADIUS * 1.75) + PLANET_RADIUS + 15;
  }

  update() {
    if (this.scale < this.targetScale) {
      this.scale += 0.15;
      if (this.scale > this.targetScale) this.scale = this.targetScale;
    }

    if (this.isExploding) {
      this.scale += 0.18;
      this.alpha -= 0.15;
      if (this.alpha <= 0) return false;
    }
    return true;
  }

  draw() {
    ctx.save();
    const wobbleY = Math.sin(this.wobble) * 2;
    this.pulse += 0.04;
    const pulseScale = 1 + Math.sin(this.pulse) * 0.05;
    ctx.translate(this.x, this.y + wobbleY);
    ctx.scale(this.scale * pulseScale, this.scale * pulseScale);
    ctx.globalAlpha = this.alpha;

    const planetData = planetTypes[this.type];
    if (planetData.imageObj) {
      ctx.drawImage(
        planetData.imageObj,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      const gradient = ctx.createRadialGradient(
        -this.radius * 0.3,
        -this.radius * 0.3,
        this.radius * 0.1,
        0,
        0,
        this.radius,
      );
      gradient.addColorStop(0, this.lightenColor(this.color, 40));
      gradient.addColorStop(0.7, this.color);
      gradient.addColorStop(1, this.darkenColor(this.color, 30));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    this.wobble += 0.05;
  }

  lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  }

  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `rgb(${R}, ${G}, ${B})`;
  }
}

// ============ SHOOTER PLANET CLASS ============
class ShooterPlanet {
  constructor(x, y, type, vx, vy) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.vx = vx;
    this.vy = vy;
    this.radius = PLANET_RADIUS;
    this.color = planetTypes[type].color;
    this.trail = [];
    this.rotation = 0;
    this.bounceCount = 0;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 12) this.trail.shift();

    this.trail.forEach((t, i) => {
      t.alpha = ((i + 1) / this.trail.length) * 0.7;
    });

    this.x += this.vx;
    this.y += this.vy;
    this.rotation += 0.25;

    // Wall bounce
    if (this.x - this.radius <= 0) {
      this.vx = Math.abs(this.vx);
      this.x = this.radius;
      this.bounceCount++;
      this.createBounceEffect();
    } else if (this.x + this.radius >= canvas.width) {
      this.vx = -Math.abs(this.vx);
      this.x = canvas.width - this.radius;
      this.bounceCount++;
      this.createBounceEffect();
    }
  }

  createBounceEffect() {
    sounds.bounce(); // SOUND: Bounce
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        color: this.color,
        life: 25,
        size: Math.random() * 5 + 2,
      });
    }
  }

  draw() {
    // Trail
    this.trail.forEach((pos) => {
      ctx.globalAlpha = pos.alpha;
      const size = this.radius * 0.8;
      const gradient = ctx.createRadialGradient(
        pos.x,
        pos.y,
        0,
        pos.x,
        pos.y,
        size,
      );
      gradient.addColorStop(0, this.addAlpha(this.color, pos.alpha * 0.8));
      gradient.addColorStop(1, this.addAlpha(this.color, 0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const planetData = planetTypes[this.type];
    if (planetData.imageObj) {
      ctx.drawImage(
        planetData.imageObj,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      const gradient = ctx.createRadialGradient(
        -this.radius * 0.3,
        -this.radius * 0.3,
        this.radius * 0.1,
        0,
        0,
        this.radius,
      );
      gradient.addColorStop(0, this.lightenColor(this.color, 40));
      gradient.addColorStop(0.7, this.color);
      gradient.addColorStop(1, this.darkenColor(this.color, 30));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  addAlpha(color, alpha) {
    const num = parseInt(color.replace("#", ""), 16);
    const R = num >> 16;
    const G = (num >> 8) & 0x00ff;
    const B = num & 0x0000ff;
    return `rgba(${R}, ${G}, ${B}, ${alpha})`;
  }

  lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  }

  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `rgb(${R}, ${G}, ${B})`;
  }
}

// ============ TIMER FUNCTIONS ============
function startTimer() {
  stopTimer();
  const config = levelConfig[currentLevel];
  timeRemaining = config.time;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      stopTimer();
      checkLevelComplete();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const timerElement = document.getElementById("timerDisplay");
  timerElement.textContent = timeRemaining;

  const timerItem = document.getElementById("timerItem");
  timerItem.classList.remove("warning", "danger");

  if (timeRemaining <= 5) {
    timerItem.classList.add("danger");
    sounds.danger(); // SOUND: Danger beep
  } else if (timeRemaining <= 10) {
    timerItem.classList.add("warning");
    sounds.warning(); // SOUND: Warning beep
  }
}

// ============ POINT SYSTEM ============
function calculatePoints(matchCount, isPerfectShot = false) {
  let basePoints = 0;
  if (matchCount === 3) basePoints = 15;
  else if (matchCount === 4) basePoints = 20;
  else if (matchCount >= 5) basePoints = 25;

  if (isPerfectShot) {
    basePoints += 30;
  }

  // Apply combo multiplier
  if (combo > 1) {
    basePoints *= combo;
  }

  return basePoints;
}

// ============ LEVEL FUNCTIONS ============
function checkLevelComplete() {
  stopTimer();
  const config = levelConfig[currentLevel];
  const levelScore = score - levelStartScore;

  if (levelScore >= config.target) {
    // Level berhasil
    if (currentLevel >= 3) {
      // Cek total score
      if (score >= 2000) {
        showVictoryScreen();
      } else {
        showGameOver("Target total 2000 poin tidak tercapai!");
      }
    } else {
      showLevelTransition();
    }
  } else {
    // Level gagal
    showGameOver("Target level tidak tercapai!");
  }
}

function showLevelTransition() {
  gameOver = true;
  sounds.levelUp(); // SOUND: Level up

  const levelScore = score - levelStartScore;
  const nextLevel = currentLevel + 1;
  const nextConfig = levelConfig[nextLevel];

  document.getElementById("completedLevelNumber").textContent = currentLevel;
  document.getElementById("levelScore").textContent = levelScore;
  document.getElementById("totalScoreDisplay").textContent = score;
  document.getElementById("nextLevelNumber").textContent = nextLevel;
  document.getElementById("nextLevelBtn").textContent = nextLevel;
  document.getElementById("nextLevelTime").textContent = nextConfig.time;
  document.getElementById("nextLevelTarget").textContent = nextConfig.target;
  document.getElementById("levelTransitionScreen").style.display = "flex";
  document.getElementById("aimGuide").style.display = "none";
}

function showVictoryScreen() {
  gameOver = true;
  sounds.victory(); // SOUND: Victory

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("galacticShooterHighScore", highScore);
  }

  document.getElementById("victoryScore").textContent = score;
  document.getElementById("victoryHighScore").textContent = highScore;
  document.getElementById("maxCombo").textContent = maxComboReached + "x";
  document.getElementById("victoryScreen").style.display = "flex";
  document.getElementById("aimGuide").style.display = "none";
}

function continueToNextLevel() {
  currentLevel++;
  levelStartScore = score;
  document.getElementById("levelTransitionScreen").style.display = "none";
  document.getElementById("levelDisplay").textContent = currentLevel;

  gameOver = false;
  combo = 0;
  comboCount = 0;
  lastMatchedType = -1;

  // Reset grid and shooter
  shooter = null;
  currentPlanet = getNextPlanet();
  nextPlanet = getNextPlanet();
  particles = [];
  animatingPlanets = [];
  aimX = null;
  aimY = null;

  initGrid();
  startTimer();
  document.getElementById("aimGuide").style.display = "block";
}

// ============ INIT GRID ============
function initGrid() {
  grid = [];
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < COLS; col++) {
      if (row < 5) {
        const type = Math.floor(Math.random() * planetTypes.length);
        grid[row][col] = new Planet(row, col, type);
      } else {
        grid[row][col] = null;
      }
    }
  }
}

function getNextPlanet() {
  return Math.floor(Math.random() * planetTypes.length);
}

// ============ DRAW SHOOTER ============
function drawShooter() {
  if (currentPlanet === null || currentPlanet === undefined) return;

  const shooterX = canvas.width / 2;
  const shooterY = SHOOTER_Y;

  // Aim indicator
  if (aimX && aimY) {
    const dx = aimX - shooterX;
    const dy = aimY - shooterY;
    const angle = Math.atan2(dy, dx);
    const length = Math.min(Math.sqrt(dx * dx + dy * dy), canvas.height * 0.8);

    // Aim line
    ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(shooterX, shooterY);
    const endX = shooterX + Math.cos(angle) * length;
    const endY = shooterY + Math.sin(angle) * length;
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow
    ctx.save();
    ctx.translate(endX, endY);
    ctx.rotate(angle);
    ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-10, -12);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.shadowBlur = 0;

    // Glow at aim point
    const gradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, 15);
    gradient.addColorStop(0, "rgba(255, 215, 0, 0.8)");
    gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(endX, endY, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Current planet with glow
  ctx.save();
  ctx.translate(shooterX, shooterY);
  const bounce = Math.sin(Date.now() / 250) * 4;
  ctx.translate(0, bounce);

  const glowGradient = ctx.createRadialGradient(
    0,
    0,
    PLANET_RADIUS * 0.5,
    0,
    0,
    PLANET_RADIUS * 1.5,
  );
  glowGradient.addColorStop(0, "rgba(255, 215, 0, 0.4)");
  glowGradient.addColorStop(1, "rgba(255, 215, 0, 0)");
  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(0, 0, PLANET_RADIUS * 1.5, 0, Math.PI * 2);
  ctx.fill();

  const planetData = planetTypes[currentPlanet];
  if (planetData.imageObj) {
    ctx.drawImage(
      planetData.imageObj,
      -PLANET_RADIUS,
      -PLANET_RADIUS,
      PLANET_RADIUS * 2,
      PLANET_RADIUS * 2,
    );
  } else {
    ctx.fillStyle = planetData.color;
    ctx.beginPath();
    ctx.arc(0, 0, PLANET_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Next planet preview
  if (nextPlanet !== null) {
    const nextData = planetTypes[nextPlanet];
    const nextX = shooterX + PLANET_RADIUS * 3.2;
    const nextY = shooterY;
    const nextSize = PLANET_RADIUS * 0.65;

    ctx.globalAlpha = 0.85;
    if (nextData.imageObj) {
      ctx.drawImage(
        nextData.imageObj,
        nextX - nextSize,
        nextY - nextSize,
        nextSize * 2,
        nextSize * 2,
      );
    } else {
      ctx.fillStyle = nextData.color;
      ctx.beginPath();
      ctx.arc(nextX, nextY, nextSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#FFD700";
    ctx.font = `bold ${Math.floor(PLANET_RADIUS * 0.45)}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("NEXT", nextX, nextY - nextSize * 1.8);
  }
}

// ============ CHECK GRID COLLISION ============
function checkGridCollision() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!grid[row][col]) continue;
      const planet = grid[row][col];
      const dx = shooter.x - planet.x;
      const dy = shooter.y - planet.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PLANET_RADIUS * 1.85) {
        attachPlanet(planet.row, planet.col);
        return true;
      }
    }
  }

  if (shooter.y - PLANET_RADIUS <= 20) {
    attachPlanet(
      0,
      Math.round((shooter.x - PLANET_RADIUS) / (PLANET_RADIUS * 2)),
    );
    return true;
  }

  return false;
}

// ============ ATTACH PLANET ============
function attachPlanet(row, col) {
  const adjustedCol = Math.max(0, Math.min(COLS - 1, col));
  const isPerfectShot = shooter.bounceCount === 0;

  for (let r = row; r < ROWS; r++) {
    for (let c = adjustedCol - 1; c <= adjustedCol + 1; c++) {
      if (c >= 0 && c < COLS && !grid[r][c]) {
        grid[r][c] = new Planet(r, c, shooter.type);
        sounds.attach(); // SOUND: Attach

        shooter = null;
        setTimeout(() => {
          checkMatches(r, c, isPerfectShot);
          checkFloating();
          checkWin();
          checkGameOver();
        }, 100);

        currentPlanet = nextPlanet;
        nextPlanet = getNextPlanet();
        return;
      }
    }
  }
}

// ============ CHECK MATCHES ============
function checkMatches(row, col, isPerfectShot = false) {
  const planet = grid[row][col];
  if (!planet) return;

  const matches = [];
  const visited = new Set();

  function floodFill(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (!grid[r][c] || grid[r][c].type !== planet.type) return;
    const key = `${r},${c}`;
    if (visited.has(key)) return;

    visited.add(key);
    matches.push({ row: r, col: c });

    floodFill(r - 1, c);
    floodFill(r + 1, c);
    floodFill(r, c - 1);
    floodFill(r, c + 1);

    if (r % 2 === 1) {
      floodFill(r - 1, c + 1);
      floodFill(r + 1, c + 1);
    } else {
      floodFill(r - 1, c - 1);
      floodFill(r + 1, c - 1);
    }
  }

  floodFill(row, col);

  if (matches.length >= 3) {
    // Check combo
    if (lastMatchedType === planet.type) {
      comboCount++;
      combo = Math.min(comboCount + 1, 4);
      if (combo > maxComboReached) maxComboReached = combo;
    } else {
      comboCount = 0;
      combo = 1;
    }
    lastMatchedType = planet.type;

    updateComboDisplay();

    // Calculate points
    const points = calculatePoints(matches.length, isPerfectShot);

    // Show bonus text
    let bonusText = `+${points}`;
    if (combo >= 2) {
      bonusText += ` ${combo}X COMBO!`;
      sounds.combo(); // SOUND: Combo
    }
    if (isPerfectShot) {
      bonusText += " PERFECT!";
      sounds.perfect(); // SOUND: Perfect shot
    }

    // Bonus for 4x combo
    if (combo >= 4) {
      score += 50;
      bonusText += " +50 MEGA!";
    }

    showBonusText(planet.x, planet.y, bonusText);

    // Explode planets
    matches.forEach(({ row, col }) => {
      if (grid[row][col]) {
        grid[row][col].isExploding = true;
        animatingPlanets.push(grid[row][col]);
        createExplosion(
          grid[row][col].x,
          grid[row][col].y,
          grid[row][col].color,
        );
        setTimeout(() => {
          grid[row][col] = null;
        }, 200);
      }
    });

    sounds.explode(); // SOUND: Explode
    score += points;
    updateScore();

    setTimeout(() => {
      if (combo > 1) {
        const comboItem = document.getElementById("comboItem");
        setTimeout(() => {
          comboItem.classList.remove("active");
        }, 1500);
      }
    }, 1500);
  } else {
    // Reset combo
    combo = 0;
    comboCount = 0;
    lastMatchedType = -1;
    updateComboDisplay();
  }
}

// ============ UPDATE COMBO DISPLAY ============
function updateComboDisplay() {
  const comboDisplay = document.getElementById("comboDisplay");
  const comboItem = document.getElementById("comboItem");

  comboDisplay.textContent = combo > 0 ? `${combo}x` : "0x";

  if (combo >= 2) {
    comboItem.classList.add("active");
  } else {
    comboItem.classList.remove("active");
  }
}

// ============ SHOW BONUS TEXT ============
function showBonusText(x, y, text) {
  const rect = canvas.getBoundingClientRect();
  const bonusText = document.createElement("div");
  bonusText.className = "bonus-text";
  bonusText.textContent = text;
  bonusText.style.position = "fixed";
  bonusText.style.left = `${rect.left + x}px`;
  bonusText.style.top = `${rect.top + y}px`;
  document.body.appendChild(bonusText);
  setTimeout(() => bonusText.remove(), 1500);
}

// ============ CHECK FLOATING ============
function checkFloating() {
  const connected = new Set();

  function markConnected(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (!grid[r][c]) return;
    const key = `${r},${c}`;
    if (connected.has(key)) return;

    connected.add(key);
    markConnected(r - 1, c);
    markConnected(r + 1, c);
    markConnected(r, c - 1);
    markConnected(r, c + 1);

    if (r % 2 === 1) {
      markConnected(r - 1, c + 1);
      markConnected(r + 1, c + 1);
    } else {
      markConnected(r - 1, c - 1);
      markConnected(r + 1, c - 1);
    }
  }

  for (let c = 0; c < COLS; c++) {
    if (grid[0][c]) markConnected(0, c);
  }

  let floatingCount = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] && !connected.has(`${r},${c}`)) {
        createExplosion(grid[r][c].x, grid[r][c].y, grid[r][c].color);
        grid[r][c] = null;
        floatingCount++;
      }
    }
  }

  if (floatingCount > 0) {
    const cascadePoints = floatingCount * 20;
    score += cascadePoints;
    showBonusText(
      canvas.width / 2,
      canvas.height / 2,
      `+${cascadePoints} CASCADE!`,
    );
    sounds.cascade(); // SOUND: Cascade
    updateScore();
  }
}

// ============ CREATE EXPLOSION ============
function createExplosion(x, y, color) {
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      color: color,
      life: 45,
      size: Math.random() * 8 + 2,
    });
  }
}

// ============ UPDATE PARTICLES ============
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.3;
    p.vx *= 0.97;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

// ============ DRAW PARTICLES ============
function drawParticles() {
  particles.forEach((p) => {
    ctx.globalAlpha = p.life / 45;
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ============ CHECK WIN ============
function checkWin() {
  let hasAny = false;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col]) {
        hasAny = true;
        break;
      }
    }
    if (hasAny) break;
  }

  if (!hasAny) {
    setTimeout(() => {
      stopTimer();
      checkLevelComplete();
    }, 700);
  }
}

// ============ CHECK GAME OVER ============
function checkGameOver() {
  for (let col = 0; col < COLS; col++) {
    if (grid[ROWS - 2][col]) {
      gameOver = true;
      showGameOver("Planet mencapai batas bawah!");
      return;
    }
  }
}

// ============ UPDATE SCORE ============
function updateScore() {
  document.getElementById("scoreDisplay").textContent = score;
  document.getElementById("highScoreDisplay").textContent = highScore;
}

// ============ SHOW GAME OVER ============
function showGameOver(reason = "Waktu Habis!") {
  stopTimer();
  sounds.lose(); // SOUND: Game over

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("galacticShooterHighScore", highScore);
  }

  const config = levelConfig[currentLevel];
  document.getElementById("gameOverReason").textContent = reason;
  document.getElementById("failedLevel").textContent = currentLevel;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("targetNeeded").textContent = config.target;
  document.getElementById("finalHighScore").textContent = highScore;
  document.getElementById("gameOverScreen").style.display = "flex";
  document.getElementById("aimGuide").style.display = "none";
}

// ============ HANDLE AIM ============
function handleAim(clientX, clientY) {
  if (!gameStarted || gameOver || shooter) return;

  const rect = canvas.getBoundingClientRect();
  aimX = (clientX - rect.left) * (canvas.width / rect.width);
  aimY = (clientY - rect.top) * (canvas.height / rect.height);
}

// ============ HANDLE SHOOT ============
function handleShoot(clientX, clientY) {
  if (!gameStarted || gameOver || shooter || currentPlanet === null) return;

  const rect = canvas.getBoundingClientRect();
  const clickX = (clientX - rect.left) * (canvas.width / rect.width);
  const clickY = (clientY - rect.top) * (canvas.height / rect.height);

  const shooterX = canvas.width / 2;
  const shooterY = SHOOTER_Y;

  const dx = clickX - shooterX;
  const dy = clickY - shooterY;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length < 10) return;

  const vx = (dx / length) * SHOOTER_SPEED;
  const vy = (dy / length) * SHOOTER_SPEED;

  shooter = new ShooterPlanet(shooterX, shooterY, currentPlanet, vx, vy);
  sounds.shoot(); // SOUND: Shoot

  aimX = null;
  aimY = null;

  setTimeout(() => {
    document.getElementById("aimGuide").style.display = "none";
  }, 2000);
}

// ============ MOUSE EVENTS ============
canvas.addEventListener("mousemove", (e) => handleAim(e.clientX, e.clientY));
canvas.addEventListener("click", (e) => handleShoot(e.clientX, e.clientY));
canvas.addEventListener("mouseleave", () => {
  aimX = null;
  aimY = null;
});

// ============ TOUCH EVENTS ============
canvas.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleAim(e.touches[0].clientX, e.touches[0].clientY);
    }
  },
  { passive: false },
);

canvas.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleAim(touch.clientX, touch.clientY);
      handleShoot(touch.clientX, touch.clientY);
    }
  },
  { passive: false },
);

canvas.addEventListener(
  "touchend",
  (e) => {
    e.preventDefault();
    aimX = null;
    aimY = null;
  },
  { passive: false },
);

// ============ GAME LOOP ============
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((row) => {
    row.forEach((planet) => {
      if (planet) {
        planet.update();
        planet.draw();
      }
    });
  });

  for (let i = animatingPlanets.length - 1; i >= 0; i--) {
    if (!animatingPlanets[i].update()) {
      animatingPlanets.splice(i, 1);
    } else {
      animatingPlanets[i].draw();
    }
  }

  if (shooter) {
    shooter.update();
    shooter.draw();
    if (checkGridCollision()) {
      // Handled
    }
  }

  drawShooter();
  updateParticles();
  drawParticles();

  requestAnimationFrame(gameLoop);
}

// ============ START GAME ============
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  gameStarted = true;
  restartGame();
}

// ============ RESTART GAME ============
function restartGame() {
  resizeCanvas();
  grid = [];
  shooter = null;
  currentPlanet = getNextPlanet();
  nextPlanet = getNextPlanet();
  score = 0;
  levelStartScore = 0;
  combo = 0;
  comboCount = 0;
  maxComboReached = 0;
  lastMatchedType = -1;
  currentLevel = 1;
  gameOver = false;
  particles = [];
  animatingPlanets = [];
  aimX = null;
  aimY = null;

  initGrid();
  updateScore();

  document.getElementById("levelDisplay").textContent = currentLevel;

  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("victoryScreen").style.display = "none";
  document.getElementById("levelTransitionScreen").style.display = "none";
  document.getElementById("aimGuide").style.display = "block";

  if (gameStarted) {
    startTimer();
  }
}

// ============ GO HOME ============
function goHome() {
  if (confirm("Kembali ke home? Progress akan hilang!")) {
    stopTimer();
    window.location.href = "../index.html";
  }
}

// ============ RESIZE HANDLER ============
window.addEventListener("resize", () => {
  if (gameStarted) {
    resizeCanvas();
    grid.forEach((row) => {
      row.forEach((planet) => {
        if (planet) planet.updatePosition();
      });
    });
  }
});

// ============ INIT ============
function init() {
  resizeCanvas();
  updateScore();
  gameLoop();
}

window.onload = init;
