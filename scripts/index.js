let timerDuration = 25 * 60;
let timeRemaining = timerDuration;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const alarmSound = document.getElementById("alarm-sound");
const bgMusic = document.getElementById("bg-music");

const focusBtn = document.getElementById("focusBtn");
const shortBtn = document.getElementById("shortBtn");
const longBtn = document.getElementById("longBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
// const themeBtn = document.getElementById("themeBtn");

function setMode(mode) {
  pauseTimer();
  if (mode === "focus") timerDuration = 25 * 60;
  if (mode === "short") timerDuration = 5 * 60;
  if (mode === "long") timerDuration = 15 * 60;
  timeRemaining = timerDuration;
  updateDisplay();
}

function startTimer() {
  if (timerInterval) return;

  bgMusic
    .play()
    .catch((e) => console.log("Autoplay blocked until user interacts"));

  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alarmSound.play();
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  bgMusic.pause();
}

function resetTimer() {
  pauseTimer();
  timeRemaining = timerDuration;
  updateDisplay();
  bgMusic.currentTime = 0;
}

function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

focusBtn.addEventListener("click", () => setMode("focus"));
shortBtn.addEventListener("click", () => setMode("short"));
longBtn.addEventListener("click", () => setMode("long"));
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
// themeBtn.addEventListener("click", toggleTheme);

// Initialize display
updateDisplay();
