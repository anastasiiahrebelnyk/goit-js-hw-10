import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const buttonEl = document.querySelector('.date-picker-button');
const inputEl = document.querySelector('#datetime-picker');
let intervalId;
let initTime;

const timerDisplay = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= Date.now()) {
         iziToast.show({
    message: "Please choose a date in the future"
         });
        buttonEl.disabled = true;
        buttonEl.classList.remove('active-button');

        userSelectedDate = '';
          return
      }
      userSelectedDate = selectedDates[0].getTime();      
      buttonEl.classList.add('active-button');
      buttonEl.disabled = false;
      return userSelectedDate;
      
  },
};


flatpickr("#datetime-picker", options);

buttonEl.addEventListener('click', handleTimer);

function handleTimer() {
    buttonEl.classList.remove('active-button');
    buttonEl.disabled = true;
    inputEl.classList.add('disabled');
    inputEl.disabled = true;

    intervalId = setInterval(() => {
        console.log('tick');
         initTime = Date.now();
         const diff = userSelectedDate - initTime;
        const timeValues = convertMs(diff);
        // console.log(timeValues);
        timerDisplay.days.textContent = String(timeValues.days).padStart(2, '0');
        timerDisplay.hours.textContent = String(timeValues.hours).padStart(2, '0');
        timerDisplay.minutes.textContent = String(timeValues.minutes).padStart(2, '0');
        timerDisplay.seconds.textContent = String(timeValues.seconds).padStart(2, '0');
        
        if (diff <= 0) {
            clearInterval(intervalId);
            timerDisplay.days.textContent = '00';
            timerDisplay.hours.textContent = '00';
            timerDisplay.minutes.textContent = '00';
            timerDisplay.seconds.textContent = '00';
            inputEl.classList.remove('disabled');
            inputEl.removeAttribute('disabled', '');
            // buttonEl.addEventListener('click', handleTimer);

        } 
    }, 1000);
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
};