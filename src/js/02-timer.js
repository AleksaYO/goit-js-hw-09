import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      //   alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    } else {
      Notiflix.Notify.success('Cool, choose the date');
      btnStart.disabled = false;
    }
  },
};

const input = document.getElementById('datetime-picker');
flatpickr(input, options);
