const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

let timerId = null;

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);

function onBtnStart() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    },1000)
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
}

function onBtnStop() {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
