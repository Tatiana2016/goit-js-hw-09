import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector("#timer");
const timerListEl = document.querySelector("#timer-list");

let countdown;
let timerList = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      dateTimePicker.value = "";
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

function startCountdown() {
  const targetDate = new Date(dateTimePicker.value).getTime();
  if (isNaN(targetDate)) {
    return;
  }
  startBtn.disabled = true;
  countdown = setInterval(() => {
    const now = new Date().getTime();
    const remaining = targetDate - now;
    if (remaining <= 0) {
      clearInterval(countdown);
      timerEl.textContent = "00:00:00";
      timerList.push(dateTimePicker.value);
      renderTimerList();
      startBtn.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMilliseconds(remaining);
    timerEl.textContent = `${padWithZeros(hours, 2)}:${padWithZeros(minutes, 2)}:${padWithZeros(seconds, 2)}`;
  }, 1000);
}

function renderTimerList() {
  const timerListEl = document.querySelector("#timer-list");
  timerListEl.innerHTML = "";
  for (let i = 0; i < timerList.length; i++) {
    const timerItemEl = document.createElement("li");
    timerItemEl.textContent = timerList[i];
    timerListEl.appendChild(timerItemEl);
  }
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
