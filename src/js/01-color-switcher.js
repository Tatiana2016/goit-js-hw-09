const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  // Перевіряємо, чи не запущений вже таймер
  if (intervalId === null) {
    // Запускаємо таймер і зберігаємо його ідентифікатор
    intervalId = window.setInterval(() => {
      const newColor = getRandomHexColor();
      document.body.style.backgroundColor = newColor;
    }, 1000);
     // Вимикаємо кнопку "Start"
    startButton.disabled = true;
    // Увімкнути кнопку "Stop"
    stopButton.disabled = false;
  }
});

stopButton.addEventListener('click', () => {
  // Перевіряємо, чи запущений таймер
  if (intervalId !== null) {
    // Зупиняємо таймер і очищаємо його ідентифікатор
    window.clearInterval(intervalId);
    intervalId = null;
    // Увімкнути кнопку "Start"
    startButton.disabled = false;
    // Вимикаємо кнопку "Stop"
    stopButton.disabled = true;
  }
});
console.log(getRandomHexColor);

