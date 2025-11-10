const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

let score = 0;
let timer = 30;
let gameActive = false;
let timerInterval;

// Случайная позиция мяча
function randomPosition() {
  const maxX = 500 - 40; // ширина поля минус размер мяча
  const maxY = 300 - 40; // высота поля минус размер мяча
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  ball.style.left = `${x + 50}px`; // +50 для отступа от края
  ball.style.bottom = `${y + 40}px`; // +40 для отступа снизу
}

// Анимация "гола"
function scoreGoal() {
  score++;
  scoreDisplay.textContent = score;

  // Анимация полёта мяча
  ball.style.transition = 'all 0.8s ease-out';
  ball.style.left = 'calc(50% - 20px)';
  ball.style.bottom = '150px';

  // Звук (опционально — можно добавить звуковой файл)
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-effect-271.mp3');
  audio.play().catch(e => console.log("Звук не воспроизвёлся — браузер блокирует без действия пользователя"));

  // Возвращаем мяч на место
  setTimeout(() => {
    ball.style.transition = 'none';
    randomPosition();
  }, 800);
}

// Начать игру
function startGame() {
  if (gameActive) return;

  gameActive = true;
  score = 0;
  timer = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timer;

  randomPosition();
  startBtn.disabled = true;

  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      alert(`Игра окончена! Ты забил ${score} голов! 🎉`);
      startBtn.disabled = false;
    }
  }, 1000);
}

// Слушатель клика на мяч
ball.addEventListener('click', () => {
  if (gameActive) {
    scoreGoal();
  }
});

// Кнопка "Начать"
startBtn.addEventListener('click', startGame);

// Инициализация
randomPosition();
