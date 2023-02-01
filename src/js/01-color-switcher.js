const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onClickChangeColor);
btnStop.addEventListener('click', onClickStopColor);
let intervalId = 1;
function onClickChangeColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(intervalId);
}
