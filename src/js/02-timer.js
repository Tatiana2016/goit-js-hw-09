import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector(".timer");
const timerListEl = document.getElementById("timer-list");

let countdown;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates.length || selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a valid date in the future");
      dateTimePicker.value = "";
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

function startCountdown() {
  if (countdown) {
    return;
  }
  const targetDate = new Date(dateTimePicker.value).getTime();
  if (!targetDate || isNaN(targetDate)) {
    return;
  }
  startBtn.disabled = true;
  countdown = setInterval(() => {
    const now = new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(targetDate - now);
    renderTimerList(days, hours, minutes, seconds);
    timerEl.querySelector("[data-days]").textContent = padWithZeros(days, 2);
    timerEl.querySelector("[data-hours]").textContent = padWithZeros(hours, 2);
    timerEl.querySelector("[data-minutes]").textContent = padWithZeros(minutes, 2);
    timerEl.querySelector("[data-seconds]").textContent = padWithZeros(seconds, 2);
    if (now >= targetDate) {
      clearInterval(countdown);
      startBtn.disabled = false;
    }
  }, 1000);
}

function renderTimerList(days, hours, minutes, seconds) {
  const timer = `${padWithZeros(days, 2)}:${padWithZeros(hours, 2)}:${padWithZeros(minutes, 2)}:${padWithZeros(seconds, 2)}`;
  const li = document.createElement("li");
  li.textContent = timer;
  if (!timerListEl) {
    console.error("timerListEl is null or undefined");
    return;
  }
  timerListEl.appendChild(li);
}
  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function padWithZeros(number, width) {
  return number.toString().padStart(width, "0");
}

startBtn.addEventListener("click", startCountdown);
