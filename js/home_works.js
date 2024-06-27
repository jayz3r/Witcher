
/// Recursion

const childBlock = document.querySelector(".child_block");
const childBlock2 = document.querySelector(".child_block2");
const parentBlock = document.querySelector(".parent_block");

let positionX = 0,
  positionY = 0,
  positionZ = 0,
  positionC = 0;

const offsetParentWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetParentHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

const generateRandomColor = () => {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
};
const setRandomColors = () => {
  // childBlock.innerHTML = generateRandomColor()
  childBlock.style.backgroundColor = generateRandomColor();
  childBlock.style.boxShadow = `0px 0px 10px 5px ${childBlock.style.backgroundColor}  `;
  childBlock2.style.backgroundColor = generateRandomColor();
  childBlock2.style.boxShadow = `0px 0px 10px 5px ${childBlock2.style.backgroundColor}  `;
};
const changingColors = setInterval(() => {
  setRandomColors();
}, 1000);
window.onload = () => setRandomColors();
window.onkeydown = (event) => {
  if (event.code.toLowerCase() === "space") {
    event.preventDefault();
    setRandomColors();
  }
};

const position = () => {
  if (positionX < offsetParentWidth) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
    childBlock2.style.right = `${positionX}px`;
    requestAnimationFrame(position);
  } else if (
    positionX >= offsetParentHeight &&
    positionY < offsetParentHeight
  ) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
    childBlock2.style.top = `${positionY}px`;
    requestAnimationFrame(position);
  } else if (positionZ < offsetParentWidth) {
    positionZ++;
    childBlock.style.left = `${positionX - positionZ}px`;
    childBlock2.style.right = `${positionX - positionZ}px`;
    requestAnimationFrame(position);
  } else if (positionC < offsetParentHeight) {
    positionC++;
    childBlock.style.top = `${positionY - positionC}px`;
    childBlock2.style.top = `${positionY - positionC}px`;
    requestAnimationFrame(position);
  } else {
    (positionX = 0), (positionY = 0), (positionZ = 0), (positionC = 0);
  }
};
setInterval(() => {
  position();
}, 2000);

// Counter
let watch = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let seconds = 0;
let interval = null;
const timer = () => {
  let hrs = Math.floor(seconds / 3600);
  let min = Math.floor((seconds - hrs * 3600) / 60);
  let sec = seconds % 60;

  if (hrs < 10) hrs = "0" + hrs;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  watch.innerHTML = `${hrs}:${min}:${sec}`;
};

startBtn.onclick = () => {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      timer();
    }, 1000);
    //startBtn.disabled = true
  }
};
resetBtn.onclick = () => {
  clearInterval(interval);
  seconds = 0;
  interval = null;
  timer();
  //startBtn.disabled = false
};
stopBtn.onclick = () => {
  clearInterval(interval);
  interval = null;
  //startBtn.disabled = false
};
timer();


const getAsyncData =  async() =>{
  const response = await fetch('/data/data.json')
  const data = await response.json()
  try{
    console.log(data);
  }catch(e){
    console.error(e);
  }
}

getAsyncData()