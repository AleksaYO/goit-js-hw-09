import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

let DELAY = 0;
let STEP = 0;
let AMOUNT = 0;

form.addEventListener('submit', startPromise);
form.addEventListener('change', () => {
  DELAY = +delay.value;
  STEP = +step.value;
  AMOUNT = +amount.value;
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, DELAY);
  });
}

function startPromise(event) {
  event.preventDefault();
  for (let i = 1; i <= AMOUNT; i++) {
    createPromise(i, DELAY)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    DELAY += STEP;
  }
}
