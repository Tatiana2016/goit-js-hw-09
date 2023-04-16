import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector("#timer");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert("Please choose a date in the future");
      dateTimePicker.value = "";
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let countdown;

function startCountdown() {
  const targetDate = new Date(dateTimePicker.value).getTime();
  if (isNaN(targetDate)) {
    return;
  }
  countdown = setInterval(() => {
    const now = new Date().getTime();
    const remaining = targetDate - now;
    if (remaining <= 0) {
      clearInterval(countdown);
      timerEl.textContent = "00:00:00:00";
      startBtn.disabled = true;
      return;
    }
    const { days, hours, minutes, seconds } = convertMilliseconds(remaining);
    timerEl.textContent = `${padWithZeros(days, 2)}:${padWithZeros(
      hours,
      2
    )}:${padWithZeros(minutes, 2)}:${padWithZeros(seconds, 2)}`;
  }, 1000);
}

function convertMilliseconds(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function padWithZeros(number, width) {
  return number.toString().padStart(width, "0");
}

startBtn.addEventListener("click", startCountdown);

Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');
