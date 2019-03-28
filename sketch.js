//#region - Timer Variables -
let timeleft = 10;
let startTime = 0;
let currentTime = 0;
let interval = setInterval(timeIt, 1000);
let ding;
//#endregion - Timer Variables

//#region - 7 Segment Variables
let nums = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
let timerTime;
let digitArray = [];
//#endregion - 7 Segment Variables -

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function preload() {
  ding = loadSound("ding.mp3");
}

function setup() {
  createCanvas(800, 400);
  
  let params = getURLParams();
  startTime = millis();

  //console.log(params);
  if (params.minute) {
    let min = params.minute;
    timeleft = min * 60;
  }
  
  timerTime = convertSeconds(timeleft - floor((millis() - startTime) / 1000));
  addDigits();
}

function draw() {
  background(0);
  drawTime();
}

function timeIt() {
  currentTime = floor((millis() - startTime) / 1000);
  timerTime = convertSeconds(timeleft - currentTime);
  
  if (currentTime == timeleft) {
    ding.play();
    clearInterval(interval);
  }
}

// Add each digit of the timer
function addDigits() {
  digitArray = [];
  let timeArray = timerTime.toString().split("");
  let start = 0;
  
  for(let i = 0; i < timeArray.length; i++) {
    digitArray.push(new Digit(start));
    start += 140;
  }
  drawTime();
}

// Draws the value of each digit
function drawTime() {
  let timeArray = timerTime.toString().split("");
  for (let i = 0; i < timeArray.length; i++) {
    if (isNaN(timeArray[i]) === false) {
      digitArray[i].sevenSegment(nums[timeArray[i]]);
    }
    else {
      digitArray[i].seperator(currentTime % 2);
    }
  }
}
