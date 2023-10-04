/*import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
*/


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const dataStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

let countdownInterval;
let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const currentDate = new Date();
      selectedDate = selectedDates[0];

      if (selectedDate <= currentDate) {
        window.alert("Please choose a date in the future");
        dataStart.disabled = true;
      } else {
        dataStart.disabled = false;
      }
    }
  },
};

flatpickr(input, options);

dataStart.addEventListener('click', () => {
  if (selectedDate && selectedDate > Date.now()) {
    const currentDate = new Date();
    const timeRemaining = selectedDate - currentDate;

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      const timeRemaining = selectedDate - new Date();

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        dataDays.textContent = '00';
        dataHours.textContent = '00';
        dataMinutes.textContent = '00';
        dataSeconds.textContent = '00';
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);

        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);
      }
    }, 1000);
  }
});
