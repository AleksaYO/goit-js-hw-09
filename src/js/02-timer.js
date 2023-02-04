import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const input = document.getElementById('datetime-picker');

let timerId = 0;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(options.defaultDate.getTime());
    if (selectedDates[0].getTime() < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      Notiflix.Notify.success('Cool, you can press "Start"');
      btnStart.disabled = false;
      const time = selectedDates[0].getTime();
      btnStart.addEventListener('click', () => {
        onGetTime(time);
        btnStart.disabled = true;
        return;
      });
    }
  },
};
flatpickr(input, options);

function onGetTime(time) {
  timerId = setInterval(() => {
    const now = Date.now();
    const leftTime = time - now;
    convertMs(leftTime);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = onChangeValue(Math.floor(ms / day));
  const hours = onChangeValue(Math.floor((ms % day) / hour));
  const minutes = onChangeValue(Math.floor(((ms % day) % hour) / minute));
  const seconds = onChangeValue(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  onUpdateClock({ days, hours, minutes, seconds });
}

function onUpdateClock({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;

  onStopInterval({ days, hours, minutes, seconds });
}

function onChangeValue(value) {
  return String(value).padStart(2, 0);
}

function onStopInterval({ days, hours, minutes, seconds }) {
  if (+days === 0 && +hours === 0 && +minutes === 0 && +seconds === 0) {
    clearInterval(timerId);
  }
}
