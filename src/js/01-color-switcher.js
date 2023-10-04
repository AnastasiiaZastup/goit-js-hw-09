

const startColor = document.querySelector('[data-start]');
const stopColor = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let timeId = null;
startColor.addEventListener('click', onStart);
stopColor.addEventListener('click', stopStart);

 function changeColor() {
        bodyColor.style.backgroundColor = getRandomHexColor();
} 
    
function onStart() {
    if (!timeId) {
        changeColor();
        timeId = setInterval(changeColor, 1000);
        startColor.disabled = true;
        stopColor.disabled = false;
    }
}

function stopStart() {
    if (timeId) {
        clearInterval(timeId);
        timeId = null;
        startColor.disabled = false;
        stopColor.disabled = true;
    }
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

