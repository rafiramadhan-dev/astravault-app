// ============ IMAGE PRELOADER SYSTEM ============
const imageAssets = {
  characters: [
    { id: "roket", src: "image/roket.png", color: "#00BFFF", emoji: "🚀" },
    { id: "ufo", src: "image/uffo.png", color: "#8A2BE2", emoji: "🛸" },
    { id: "bintang", src: "image/bintang.png", color: "#FFD700", emoji: "⭐" },
    { id: "api", src: "image/api.png", color: "#FF4500", emoji: "🔥" },
    {
      id: "gambar_hati",
      src: "image/gambar hati.png",
      color: "#FF1493",
      emoji: "💖",
    },
    {
      id: "gambar_musuh",
      src: "image/pesawat musuh.png",
      color: "#00FF7F",
      emoji: "👾",
    },
  ],
  obstacles: [
    { id: "obs_api", src: "image/api.png", color: "#FF4500" },
    { id: "obs_musuh", src: "image/pesawat musuh.png", color: "#8A2BE2" },
  ],
  coin: { id: "coin_bintang", src: "image/bintang.png" },
};

let loadedImages = {};
let totalImages = 0;
let loadedCount = 0;
let imagesReady = false;

function preloadImages() {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";

  const allImages = [
    ...imageAssets.characters,
    ...imageAssets.obstacles,
    imageAssets.coin,
  ];

  totalImages = allImages.length;

  allImages.forEach((asset) => {
    const img = new Image();

    img.onload = () => {
      loadedImages[asset.id] = { img: img, loaded: true, ...asset };
      loadedCount++;
      updateLoadingProgress();
    };

    img.onerror = () => {
      console.log(`Failed to load: ${asset.src}`);
      loadedImages[asset.id] = { img: null, loaded: false, ...asset };
      loadedCount++;
      updateLoadingProgress();
    };

    img.src = asset.src;
  });
}

function updateLoadingProgress() {
  const progress = (loadedCount / totalImages) * 100;
  document.getElementById("loadingProgress").style.width = progress + "%";
  document.getElementById("loadingText").textContent =
    `Loading ${loadedCount}/${totalImages} assets...`;

  if (loadedCount === totalImages) {
    setTimeout(() => {
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("startScreen").style.display = "flex";
      imagesReady = true;
      buildCharacterSelection();
    }, 500);
  }
}

function buildCharacterSelection() {
  const grid = document.getElementById("characterGrid");
  grid.innerHTML = "";

  imageAssets.characters.forEach((char, index) => {
    const option = document.createElement("div");
    option.className = "character-option" + (index === 0 ? " selected" : "");
    option.setAttribute("data-character", char.id);
    option.setAttribute("data-color", char.color);

    const asset = loadedImages[char.id];
    if (asset && asset.loaded && asset.img) {
      const img = document.createElement("img");
      img.src = asset.img.src;
      img.alt = char.emoji;
      option.appendChild(img);
    } else {
      option.textContent = char.emoji;
      option.style.fontSize = "3rem";
    }

    option.addEventListener("click", function () {
      document
        .querySelectorAll(".character-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedCharacter = this.getAttribute("data-character");
      selectedColor = this.getAttribute("data-color");
      playSound("select");
    });

    grid.appendChild(option);
  });
}

// ============ SOUND SYSTEM ============
let soundEnabled = true;
let audioContext = null;

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playSound(type) {
  if (!soundEnabled) return;

  try {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case "jump":
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          784.0,
          ctx.currentTime + 0.1,
        );
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.15,
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case "doubleJump":
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          1046.5,
          ctx.currentTime + 0.2,
        );
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.25,
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
        break;

      case "coin":
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          1318.51,
          ctx.currentTime + 0.1,
        );
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.15,
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case "pass":
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;

      case "gameOver":
        const frequencies = [440, 415.3, 392, 369.99];
        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + i * 0.15 + 0.2,
          );
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 0.2);
        });
        break;

      case "levelUp":
        const levelFreqs = [523.25, 659.25, 783.99, 1046.5];
        levelFreqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + i * 0.1 + 0.2,
          );
          osc.start(ctx.currentTime + i * 0.1);
          osc.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
        break;

      case "victory":
        const victorySeq = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
        victorySeq.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.35, ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + i * 0.15 + 0.3,
          );
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 0.3);
        });
        break;

      case "select":
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + 0.08,
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
    }
  } catch (e) {
    console.log("Audio not supported");
  }
}

const soundToggle = document.getElementById("soundToggle");
soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  const icon = soundToggle.querySelector("iconify-icon");
  icon.setAttribute(
    "icon",
    soundEnabled ? "mdi:volume-high" : "mdi:volume-off",
  );
  soundToggle.classList.toggle("muted");
  playSound("select");
});

// ============ STARFIELD ============
function createStarfield() {
  const starfield = document.getElementById("starfield");
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
    star.style.animationDelay = `${Math.random() * 3}s`;
    starfield.appendChild(star);
  }
}
createStarfield();

// ============ GAME VARIABLES ============
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const characterSelectScreen = document.getElementById("characterSelectScreen");
const levelTransitionScreen = document.getElementById("levelTransitionScreen");
const victoryScreen = document.getElementById("victoryScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const changeCharacterButton = document.getElementById("changeCharacterButton");
const selectCharacterButton = document.getElementById("selectCharacterButton");
const continueButton = document.getElementById("continueButton");
const playAgainButton = document.getElementById("playAgainButton");
const victoryChangeCharacterButton = document.getElementById(
  "victoryChangeCharacterButton",
);

const scoreDisplay = document.getElementById("scoreDisplay");
const levelDisplay = document.getElementById("levelDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const finalScore = document.getElementById("finalScore");
const finalHighScore = document.getElementById("finalHighScore");
const failedLevel = document.getElementById("failedLevel");

const gravity = 0.4;
let score = 0;
let highScore = localStorage.getItem("spaceHighScore") || 0;
let gameOver = false;
let gameStarted = false;
let particles = [];
let isDoubleJumpAvailable = false;
let selectedCharacter = "roket";
let selectedColor = "#00BFFF";

// ============ LEVEL SYSTEM ============
let currentLevel = 1;
let levelTime = 60;
let timeRemaining = 60;
let timerInterval = null;

const levelConfig = {
  1: {
    time: 60,
    speed: 5,
    obstacleInterval: 1800,
    coinInterval: 1200,
    speedIncrement: 0.05,
  },
  2: {
    time: 40,
    speed: 7,
    obstacleInterval: 1400,
    coinInterval: 1000,
    speedIncrement: 0.08,
  },
  3: {
    time: 30,
    speed: 9,
    obstacleInterval: 1100,
    coinInterval: 900,
    speedIncrement: 0.1,
  },
};

let gameSpeed = 5;
let obstacleInterval = 1800;
let coinInterval = 1200;
let speedIncrement = 0.05;
let lastObstacleSpawn = 0;
let lastCoinSpawn = 0;
let obstaclesPassed = 0;

// ============ PLAYER ============
const player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  dy: 0,
  jumpPower: -12,
  grounded: true,
  rotation: 0,
  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = 20;

    const asset = loadedImages[selectedCharacter];
    if (asset && asset.loaded && asset.img) {
      ctx.drawImage(
        asset.img,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
      );
    } else {
      ctx.fillStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(0, -this.height / 2);
      ctx.lineTo(this.width / 2, this.height / 2);
      ctx.lineTo(0, this.height / 3);
      ctx.lineTo(-this.width / 2, this.height / 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(0, 0, this.width / 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.restore();
  },
  update() {
    this.dy += gravity;
    this.y += this.dy;

    if (!this.grounded) {
      this.rotation += 0.05;
    } else {
      this.rotation = 0;
    }

    if (this.y + this.height >= canvas.height - 20) {
      this.y = canvas.height - 20 - this.height;
      this.dy = 0;
      this.grounded = true;
      isDoubleJumpAvailable = true;
      this.rotation = 0;
    } else {
      this.grounded = false;
    }
  },
  jump() {
    if (this.grounded) {
      this.dy = this.jumpPower;
      createParticles(
        this.x + this.width / 2,
        this.y + this.height,
        10,
        selectedColor,
        15,
      );
      playSound("jump");
    } else if (isDoubleJumpAvailable) {
      this.dy = this.jumpPower * 0.8;
      isDoubleJumpAvailable = false;
      createParticles(
        this.x + this.width / 2,
        this.y + this.height,
        15,
        "#FF1493",
        20,
      );
      playSound("doubleJump");
    }
  },
};

let obstacles = [];
let coins = [];
let stars = [];

for (let i = 0; i < 50; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 2 + 1,
  });
}

// ============ TIMER FUNCTIONS ============
function startTimer() {
  stopTimer();
  timeRemaining = levelConfig[currentLevel].time;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      stopTimer();
      levelComplete();
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
  timerDisplay.textContent = timeRemaining;

  const timerElement = document.querySelector(".timer-display");
  timerElement.classList.remove("warning", "danger");

  if (timeRemaining <= 5) {
    timerElement.classList.add("danger");
  } else if (timeRemaining <= 10) {
    timerElement.classList.add("warning");
  }
}

// ============ LEVEL FUNCTIONS ============
function loadLevel(level) {
  currentLevel = level;
  const config = levelConfig[level];

  gameSpeed = config.speed;
  obstacleInterval = config.obstacleInterval;
  coinInterval = config.coinInterval;
  speedIncrement = config.speedIncrement;
  levelTime = config.time;

  obstacles = [];
  coins = [];
  particles = [];
  obstaclesPassed = 0;

  player.y = 300;
  player.dy = 0;
  player.rotation = 0;
  isDoubleJumpAvailable = false;

  levelDisplay.textContent = currentLevel;
  updateTimerDisplay();
}

function levelComplete() {
  stopTimer();

  if (currentLevel >= 3) {
    showVictoryScreen();
  } else {
    showLevelTransition();
  }
}

function showLevelTransition() {
  gameOver = true;
  playSound("levelUp");

  const nextLevel = currentLevel + 1;
  document.getElementById("nextLevelNumber").textContent = nextLevel;
  document.getElementById("nextLevelTime").textContent =
    levelConfig[nextLevel].time;
  document.getElementById("transitionScore").textContent = score;

  levelTransitionScreen.style.display = "flex";
}

function showVictoryScreen() {
  gameOver = true;
  playSound("victory");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("spaceHighScore", highScore);
  }

  document.getElementById("victoryScore").textContent = `FINAL SCORE: ${score}`;
  document.getElementById("victoryHighScore").textContent =
    `BEST: ${highScore}`;

  victoryScreen.style.display = "flex";
}

function showGameOver() {
  stopTimer();
  gameOver = true;
  playSound("gameOver");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("spaceHighScore", highScore);
  }

  failedLevel.textContent = currentLevel;
  finalScore.textContent = `SCORE: ${score}`;
  finalHighScore.textContent = `BEST: ${highScore}`;

  gameOverScreen.style.display = "flex";
}

// ============ SPAWN FUNCTIONS ============
function spawnObstacle() {
  const obsAssets = imageAssets.obstacles;
  const randomObs = obsAssets[Math.floor(Math.random() * obsAssets.length)];
  const asset = loadedImages[randomObs.id];

  obstacles.push({
    x: canvas.width,
    y: canvas.height - 20 - 45,
    width: 45,
    height: 45,
    color: randomObs.color,
    asset: asset,
    passed: false,
    rotation: 0,
  });
}

function spawnCoin() {
  coins.push({
    x: canvas.width,
    y: Math.random() * (canvas.height * 0.5) + canvas.height * 0.3,
    radius: 15,
    value: 10,
    rotation: 0,
  });
}

// ============ DRAWING FUNCTIONS ============
function drawSpace() {
  for (let star of stars) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.5})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
    star.x -= star.speed;
    if (star.x < 0) {
      star.x = canvas.width;
      star.y = Math.random() * canvas.height;
    }
  }

  const gradient = ctx.createLinearGradient(
    0,
    canvas.height - 20,
    0,
    canvas.height,
  );
  gradient.addColorStop(0, "#1F2833");
  gradient.addColorStop(1, "#0B0C10");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

  ctx.strokeStyle = "#00BFFF";
  ctx.lineWidth = 2;
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height - 20);
    ctx.lineTo(i + 10, canvas.height - 15);
    ctx.stroke();
  }
}

function drawObstacles() {
  for (let obs of obstacles) {
    obs.rotation += 0.03;

    ctx.save();
    ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);
    ctx.rotate(obs.rotation);

    ctx.shadowColor = obs.color;
    ctx.shadowBlur = 15;

    if (obs.asset && obs.asset.loaded && obs.asset.img) {
      ctx.drawImage(
        obs.asset.img,
        -obs.width / 2,
        -obs.height / 2,
        obs.width,
        obs.height,
      );
    } else {
      ctx.fillStyle = obs.color;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = (obs.width / 2) * (0.7 + Math.random() * 0.3);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= gameSpeed;

    if (
      !obstacles[i].passed &&
      player.x > obstacles[i].x + obstacles[i].width
    ) {
      obstacles[i].passed = true;
      obstaclesPassed++;
      score += 5;
      playSound("pass");
    }

    if (
      player.x + player.width - 8 > obstacles[i].x &&
      player.x + 8 < obstacles[i].x + obstacles[i].width &&
      player.y + player.height - 8 > obstacles[i].y &&
      player.y + 8 < obstacles[i].y + obstacles[i].height
    ) {
      createParticles(
        player.x + player.width / 2,
        player.y + player.height / 2,
        30,
        "#FF0000",
        25,
      );
      showGameOver();
    }
  }
  obstacles = obstacles.filter((o) => o.x + o.width > 0);
}

function drawCoins() {
  for (let coin of coins) {
    coin.rotation += 0.1;

    ctx.save();
    ctx.translate(coin.x, coin.y);
    ctx.rotate(coin.rotation);

    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 15;

    const coinAsset = loadedImages["coin_bintang"];
    if (coinAsset && coinAsset.loaded && coinAsset.img) {
      ctx.drawImage(
        coinAsset.img,
        -coin.radius,
        -coin.radius,
        coin.radius * 2,
        coin.radius * 2,
      );
    } else {
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * coin.radius;
        const y = Math.sin(angle) * coin.radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        const innerAngle = angle + Math.PI / 5;
        const innerX = Math.cos(innerAngle) * (coin.radius / 2);
        const innerY = Math.sin(innerAngle) * (coin.radius / 2);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function updateCoins() {
  for (let i = 0; i < coins.length; i++) {
    coins[i].x -= gameSpeed * 1.1;

    const dx = coins[i].x - (player.x + player.width / 2);
    const dy = coins[i].y - (player.y + player.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < coins[i].radius + player.width / 2) {
      score += coins[i].value;
      createParticles(coins[i].x, coins[i].y, 15, "#FFD700", 20);
      playSound("coin");
      coins.splice(i, 1);
      i--;
    }
  }
  coins = coins.filter((c) => c.x + c.radius > 0);
}

// ============ PARTICLE SYSTEM ============
function createParticles(x, y, count, color, maxSize) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      size: (Math.random() * maxSize) / 2 + maxSize / 2,
      color: color,
      speedX: Math.random() * 8 - 4,
      speedY: Math.random() * 8 - 4,
      life: 30 + Math.random() * 20,
    });
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].x += particles[i].speedX;
    particles[i].y += particles[i].speedY;
    particles[i].life--;

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function drawParticles() {
  for (let p of particles) {
    const alpha = p.life / 50;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  }
  ctx.globalAlpha = 1;
}

function drawScore() {
  scoreDisplay.textContent = score;
}

// ============ GAME LOOP ============
function gameLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSpace();
  player.update();

  if (timestamp - lastObstacleSpawn > obstacleInterval) {
    spawnObstacle();
    lastObstacleSpawn = timestamp;
  }

  if (timestamp - lastCoinSpawn > coinInterval) {
    spawnCoin();
    lastCoinSpawn = timestamp;
  }

  updateObstacles();
  updateCoins();
  updateParticles();

  drawObstacles();
  drawCoins();
  player.draw();
  drawParticles();
  drawScore();

  if (obstaclesPassed > 0 && obstaclesPassed % 5 === 0) {
    gameSpeed = Math.min(
      gameSpeed + speedIncrement,
      levelConfig[currentLevel].speed + 3,
    );
    obstaclesPassed++;
  }

  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// ============ GAME CONTROL ============
function resetGame() {
  gameStarted = true;
  gameOver = false;
  score = 0;
  currentLevel = 1;

  loadLevel(1);

  gameOverScreen.style.display = "none";
  startScreen.style.display = "none";
  characterSelectScreen.style.display = "none";
  levelTransitionScreen.style.display = "none";
  victoryScreen.style.display = "none";

  scoreDisplay.textContent = score;
  lastObstacleSpawn = 0;
  lastCoinSpawn = 0;

  playSound("select");
  startTimer();
  requestAnimationFrame(gameLoop);
}

function continueToNextLevel() {
  currentLevel++;
  loadLevel(currentLevel);

  gameOver = false;
  levelTransitionScreen.style.display = "none";

  lastObstacleSpawn = 0;
  lastCoinSpawn = 0;

  playSound("select");
  startTimer();
  requestAnimationFrame(gameLoop);
}

// ============ EVENT LISTENERS ============
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  characterSelectScreen.style.display = "flex";
  playSound("select");
});

selectCharacterButton.addEventListener("click", () => {
  characterSelectScreen.style.display = "none";
  resetGame();
});

continueButton.addEventListener("click", () => {
  continueToNextLevel();
});

restartButton.addEventListener("click", () => {
  resetGame();
});

playAgainButton.addEventListener("click", () => {
  resetGame();
});

changeCharacterButton.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  characterSelectScreen.style.display = "flex";
  buildCharacterSelection();
  playSound("select");
});

victoryChangeCharacterButton.addEventListener("click", () => {
  victoryScreen.style.display = "none";
  characterSelectScreen.style.display = "flex";
  buildCharacterSelection();
  playSound("select");
});

// ============ INPUT CONTROLS ============
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " " || e.key === "ArrowUp") {
    e.preventDefault();
    if (gameStarted && !gameOver) {
      player.jump();
    }
  }
});

canvas.addEventListener("click", () => {
  if (gameStarted && !gameOver) {
    player.jump();
  }
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (gameStarted && !gameOver) {
    player.jump();
  }
});

// ============ NAVIGATION ============
function goHome() {
  stopTimer();
  window.location.href = "../index.html";
}

// ============ INITIALIZATION ============
window.onload = () => {
  preloadImages();
  score = 0;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = 1;
  timerDisplay.textContent = 60;
  startScreen.style.display = "none";
  characterSelectScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  levelTransitionScreen.style.display = "none";
  victoryScreen.style.display = "none";
};
