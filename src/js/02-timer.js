import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datatime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};

let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
    if (selectedDates[0] <= this.defaultDate) {
     Notify.failure("Please choose a date in the future"); 
      } else {
      selectedTime = selectedDates[0];
      
      }
  },
};
console.log(options.defaultDate);

// refs.input.addEventListener('input', flatpickr);
refs.btn.addEventListener('click', onBtnCalculate);

let timerId = null;

function onBtnCalculate(e) {
  e.preventDefault();  
  
  timerId = setInterval(() => {
    const delta = selectedTime - new Date();
    refs.btn.disabled = true;
    if (delta < 0) {
      clearInterval(timerId);
      refs.btn.disabled = false;
      return;
    }
    addValue(delta);
  }, 1000);
  
  }


function addValue(deltaTime) {
  
   refs.days.textContent = addLeadingZero(convertMs(deltaTime).days);
    refs.hours.textContent = addLeadingZero(convertMs(deltaTime).hours);
    refs.minutes.textContent = addLeadingZero(convertMs(deltaTime).minutes);
    refs.seconds.textContent = addLeadingZero(convertMs(deltaTime).seconds);
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr("#datetime-picker", options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};