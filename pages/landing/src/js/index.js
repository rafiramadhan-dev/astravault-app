// ===== STARFIELD GENERATION =====
function createStarfield() {
  const starfield = document.getElementById("starfield");
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + "px";
    star.style.width = size;
    star.style.height = size;
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
    star.style.animationDelay = Math.random() * 3 + "s";
    starfield.appendChild(star);
  }
}

// ===== AUTO LOGIN CHECK =====
window.onload = function () {
  createStarfield();
  const savedName = localStorage.getItem("astroName");
  const savedScore = localStorage.getItem("gameScore") || 0;
  document.getElementById("score").innerText = savedScore;

  if (savedName) {
    showMainMenu(savedName);
  }
};

// ===== START MISSION =====
function startMission() {
  const input = document.getElementById("username-input");
  const name = input.value.trim();

  if (name.length === 0) {
    input.style.borderColor = "var(--neon-pink)";
    input.placeholder = "NAMA TIDAK BOLEH KOSONG!";
    setTimeout(() => {
      input.style.borderColor = "var(--neon-purple)";
      input.placeholder = "MASUKKAN NAMA ANDA";
    }, 1500);
    return;
  }

  localStorage.setItem("astroName", name);
  document.getElementById("welcome-overlay").style.animation = "fadeOut 0.5s";
  setTimeout(() => showMainMenu(name), 500);
}

// ===== SHOW MAIN MENU =====
function showMainMenu(name) {
  document.getElementById("welcome-overlay").style.display = "none";
  const wrapper = document.getElementById("main-wrapper");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  setTimeout(() => (wrapper.style.opacity = "1"), 50);
  document.getElementById("greeting").innerText =
    `WELCOME, COMMANDER ${name.toUpperCase()}!`;
  spawnFloatingObjects();
}

// ===== FLOATING SPACE OBJECTS (CLICKABLE) =====
let scoreValue = parseInt(localStorage.getItem("gameScore")) || 0;
document.getElementById("score").innerText = scoreValue;

function spawnFloatingObjects() {
  const objects = ["🚀", "🛸", "🌍", "🌙", "⭐", "☄️", "🪐"];

  setInterval(() => {
    const obj = document.createElement("div");
    obj.className = "space-object";
    obj.textContent = objects[Math.floor(Math.random() * objects.length)];

    const size = Math.floor(Math.random() * 50) + 60;
    obj.style.fontSize = size + "px";

    const side = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;

    switch (side) {
      case 0:
        startX = -150;
        startY = Math.random() * window.innerHeight;
        endX = window.innerWidth + 150;
        endY = Math.random() * window.innerHeight;
        break;
      case 1:
        startX = window.innerWidth + 150;
        startY = Math.random() * window.innerHeight;
        endX = -150;
        endY = Math.random() * window.innerHeight;
        break;
      case 2:
        startX = Math.random() * window.innerWidth;
        startY = -150;
        endX = Math.random() * window.innerWidth;
        endY = window.innerHeight + 150;
        break;
      case 3:
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight + 150;
        endX = Math.random() * window.innerWidth;
        endY = -150;
        break;
    }

    obj.style.left = startX + "px";
    obj.style.top = startY + "px";
    document.body.appendChild(obj);

    const duration = 5000 + Math.random() * 5000;
    const anim = obj.animate(
      [
        {
          left: startX + "px",
          top: startY + "px",
          transform: "rotate(0deg)",
        },
        {
          left: endX + "px",
          top: endY + "px",
          transform: `rotate(${Math.random() * 720}deg)`,
        },
      ],
      { duration: duration, easing: "linear" },
    );

    obj.onclick = () => {
      scoreValue += 10;
      document.getElementById("score").innerText = scoreValue;
      localStorage.setItem("gameScore", scoreValue);

      obj.style.transform = "scale(0) rotate(360deg)";
      obj.style.filter = "brightness(3)";
      setTimeout(() => obj.remove(), 300);
    };

    anim.onfinish = () => obj.remove();
  }, 1500);
}

// ===== ENTER KEY SUPPORT =====
document.getElementById("username-input")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") startMission();
});

// Add fade-out animation
const style = document.createElement("style");
style.textContent =
  "@keyframes fadeOut { to { opacity: 0; transform: scale(0.9); } }";
document.head.appendChild(style);
