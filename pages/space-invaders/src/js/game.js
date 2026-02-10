const player = document.getElementById("air-craft");
const gameArea = document.querySelector(".game-area");
const countdownElement = document.getElementById("countdown");
const countdownNumber = document.getElementById("countdown-number");
const countdownText = document.getElementById("countdown-text");
const ufoHP = new WeakMap();
const asteroidHP = new WeakMap();

const gameAreaStyles = window.getComputedStyle(gameArea);
const padding = parseFloat(gameAreaStyles.paddingLeft);
const playableWidth = gameArea.clientWidth - padding * 2;

const speed = 8;
const keys = { left: false, right: false };
let playerX = padding + playableWidth / 2 - player.offsetWidth / 2;
let gameStarted = false;

player.style.left = playerX + "px";

const scoreElement = document.getElementById("score");

let score = 0;
let lastTime = 0;
const scoreSpeed = 75;
const MAX_SCORE = 2500;

if (delta >= scoreSpeed) {
  const step = Math.floor(delta / scoreSpeed);

  score += step;

  if (score >= MAX_SCORE) {
    score = MAX_SCORE;
    scoreElement.textContent = score;
    winGame();
    return;
  }

  scoreElement.textContent = score;
  lastTime += step * scoreSpeed;
}

// Laser
const laserSpeed = 10;
const lasers = [];

function shootLaser() {
  const laser = document.createElement("img");
  laser.src = "/pages/space-invaders/public/image/Laser.png";
  laser.classList.add("laser");

  const laserX = playerX + player.offsetWidth / 2 - 25;
  const laserY = gameArea.clientHeight - player.offsetHeight - 107;

  laser.style.left = laserX + "px";
  laser.style.top = laserY + "px";

  gameArea.appendChild(laser);
  lasers.push({ element: laser, x: laserX, y: laserY });
}

function updateLasers() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].y -= laserSpeed;
    lasers[i].element.style.top = lasers[i].y + "px";

    const laserEl = lasers[i].element;

    for (let j = ufos.length - 1; j >= 0; j--) {
      const ufoEl = ufos[j].element;

      if (!ufoHP.has(ufoEl)) {
        ufoHP.set(ufoEl, 2);
      }

      if (isColliding(laserEl, ufoEl)) {
        let hp = ufoHP.get(ufoEl) - 1;
        ufoHP.set(ufoEl, hp);

        laserEl.remove();
        lasers.splice(i, 1);

        if (hp <= 0) {
          clearTimeout(ufos[j].shoot);
          ufoEl.remove();
          ufos.splice(j, 1);
          ufoHP.delete(ufoEl);

          score += 100;
          scoreElement.textContent = score;
        }
        return;
      }
    }

    for (let k = asteroids.length - 1; k >= 0; k--) {
      const asteroidEl = asteroids[k].element;

      if (!asteroidHP.has(asteroidEl)) {
        asteroidHP.set(asteroidEl, 3);
      }

      if (isColliding(laserEl, asteroidEl)) {
        let hp = asteroidHP.get(asteroidEl) - 1;
        asteroidHP.set(asteroidEl, hp);

        laserEl.remove();
        lasers.splice(i, 1);

        if (hp <= 0) {
          asteroidEl.remove();
          asteroids.splice(k, 1);
          asteroidHP.delete(asteroidEl);

          score += 250;
          scoreElement.textContent = score;
        }
        return;
      }
    }

    if (lasers[i] && lasers[i].y < -50) {
      laserEl.remove();
      lasers.splice(i, 1);
    }
  }
}

gameArea.addEventListener("click", () => {
  if (!gameStarted) return;
  shootLaser();
});

function isColliding(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.left > r2.right ||
    r1.right < r2.left
  );
}

// Background
const bgImage = new Image();
bgImage.src = "/pages/space-invaders/public/image/Background.png";

let bgY = 0;
const bgSpeed = 5;

bgImage.onload = () => {
  const tileHeight =
    (bgImage.naturalHeight / bgImage.naturalWidth) * window.innerWidth;

  function updateBackground() {
    bgY += bgSpeed;
    if (bgY >= tileHeight) bgY -= tileHeight;

    document.body.style.backgroundPosition = `center ${Math.floor(bgY)}px`;
    requestAnimationFrame(updateBackground);
  }

  updateBackground();
};

// Countdown
function playPulse(element) {
  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = "pulse 0.5s ease-in-out";
}

function startCountdown() {
  let count = 3;

  countdownText.textContent = "Raih 10.000 poin untuk memenangkan permainan!";
  playPulse(countdownText);

  countdownNumber.textContent = "";

  setTimeout(() => {
    countdownText.textContent = "Permainan segera dimulai!";
    playPulse(countdownText);
  }, 2000);

  setTimeout(() => {
    countdownText.textContent = "";
    countdownNumber.textContent = count;
    playPulse(countdownNumber);

    const interval = setInterval(() => {
      count--;

      if (count > 0) {
        countdownNumber.textContent = count;
        playPulse(countdownNumber);
      } else {
        countdownNumber.textContent = "Maju!";
        playPulse(countdownNumber);

        setTimeout(() => {
          countdownElement.classList.add("hide");
          gameStarted = true;
        }, 1000);

        clearInterval(interval);
      }
    }, 1000);
  }, 4000);
}

// Movement
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
  if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
});

document.addEventListener("keyup", (e) => {
  if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
  if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
});

function updatePlayerPosition() {
  if (!gameStarted) {
    requestAnimationFrame(updatePlayerPosition);
    return;
  }

  if (keys.left) playerX -= speed;
  if (keys.right) playerX += speed;

  const minX = padding;
  const maxX = gameArea.clientWidth - padding - player.offsetWidth;
  playerX = Math.max(minX, Math.min(maxX, playerX));

  player.style.left = playerX + "px";

  updateLasers();
  updateUfos();
  updateAsteroids();
  updateEnemyLasers();

  requestAnimationFrame(updatePlayerPosition);
}

// Ufo
const ufoSpeed = 3;
const ufos = [];
const enemyLasers = [];
const enemyLaserSpeed = 9;

function spawnEnemyLaser(x, y, width) {
  const laser = document.createElement("img");
  laser.src = "/pages/space-invaders/public/image/EnemyLaser.png";
  laser.classList.add("enemy-laser");

  laser.style.left = x + width / 2 - 15 + "px";
  laser.style.top = y + width / 2 - 50 + "px";

  gameArea.appendChild(laser);
  enemyLasers.push({ element: laser, y });
}

function updateEnemyLasers() {
  for (let i = enemyLasers.length - 1; i >= 0; i--) {
    enemyLasers[i].y += enemyLaserSpeed;
    enemyLasers[i].element.style.top = enemyLasers[i].y + "px";

    if (enemyLasers[i].y > gameArea.clientHeight) {
      enemyLasers[i].element.remove();
      enemyLasers.splice(i, 1);
    }
  }
}

function spawnUfo() {
  const ufo = document.createElement("img");
  ufo.src = "/pages/space-invaders/public/image/Ufo.png";
  ufo.classList.add("ufo");

  const x = padding + Math.random() * (gameArea.clientWidth - padding * 2 - 80);

  ufo.style.left = x + "px";
  ufo.style.top = "-80px";

  gameArea.appendChild(ufo);

  const data = { element: ufo, x, y: -80, shoot: null };
  ufos.push(data);

  function shootLoop() {
    data.shoot = setTimeout(
      () => {
        if (!ufos.includes(data)) return;
        spawnEnemyLaser(data.x, data.y, 80);
        shootLoop();
      },
      500 + Math.random() * 900,
    );
  }

  shootLoop();
}

function updateUfos() {
  for (let i = ufos.length - 1; i >= 0; i--) {
    ufos[i].y += ufoSpeed;
    ufos[i].element.style.top = ufos[i].y + "px";

    if (ufos[i].y > gameArea.clientHeight) {
      clearTimeout(ufos[i].shoot);
      ufos[i].element.remove();
      ufos.splice(i, 1);
    }
  }
}

setInterval(() => {
  if (gameStarted) spawnUfo();
}, 800);

// Asteroid
const asteroidSpeed = 6;
const asteroids = [];

function spawnAsteroid() {
  const asteroid = document.createElement("img");
  asteroid.src = "/pages/space-invaders/public/image/Asteroid.png";
  asteroid.classList.add("asteroid");

  const x = padding + Math.random() * (gameArea.clientWidth - padding * 2 - 80);

  asteroid.style.left = x + "px";
  asteroid.style.top = "-80px";

  gameArea.appendChild(asteroid);
  asteroids.push({ element: asteroid, y: -80 });
}

function updateAsteroids() {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].y += asteroidSpeed;
    asteroids[i].element.style.top = asteroids[i].y + "px";

    if (asteroids[i].y > gameArea.clientHeight) {
      asteroids[i].element.remove();
      asteroids.splice(i, 1);
    }
  }
}

setInterval(() => {
  if (gameStarted) spawnAsteroid();
}, 1000);

// Win
const winScreen = document.getElementById("win-screen");

function winGame() {
  gameStarted = false;

  clearInterval(ufoSpawnInterval);
  clearInterval(asteroidSpawnInterval);

  winScreen.classList.remove("hidden");
}

updatePlayerPosition();
startCountdown();
