//#region - Timer Variables -
let timeleft = 10;
let startTime = 0;
let currentTime = 0;
//#endregion - Timer Variables

//#region - 7 Segment Variables
let nums = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
let timerTime;

let digitArray = [];
//#endregion - 7 Segment Variabels -

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

var ding;

function preload() {
  ding = loadSound("ding.mp3");
}

function setup() {
  createCanvas(800, 400);
  
  startTime = millis();

  timerTime = convertSeconds(floor(millis() / 1000));
  addDigits();
  
  var params = getURLParams();
  console.log(params);
  if (params.minute) {
    var min = params.minute;
    timeleft = min * 60;
  }

  var interval = setInterval(timeIt, 1000);

  function timeIt() {
    currentTime = floor((millis() - startTime) / 1000);
    timerTime = convertSeconds(timeleft - currentTime);
    if (currentTime == timeleft) {
      ding.play();
      clearInterval(interval);
    }
  }
}

function addDigits() {
  digitArray = [];
  let timeArray = timerTime.toString().split("");
  
  for(let i = 0; i < timeArray.length; i++) {
    digitArray.push(new digit());
  }
}

function draw() {
  background(0);
  drawTime();
}

function drawTime() {
  let timeArray = timerTime.toString().split("");
  let start = 0;
  
  for (let i = 0; i < timeArray.length; i++) {
     if (isNaN(timeArray[i]) === false) {
      digitArray[i].sevenSegment(nums[timeArray[i]], start);
    }
    else {
       digitArray[i].twoSegment(start, currentTime % 2);
    }
    start += 140;
  }
}

