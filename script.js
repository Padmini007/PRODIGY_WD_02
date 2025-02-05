let startTime = 0;
let elapsedTime = 0;
let running = false;
let interval;

const timeDisplay = document.getElementById("time-display");
const lapList = document.getElementById("laps-list");

function formatTime(timeInMs) {
  let date = new Date(timeInMs);
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();
  let milliseconds = date.getUTCMilliseconds();

  // Format the time as mm:ss:ms
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
}

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    running = true;
    document.getElementById("start-btn").textContent = "Resume";
  }
}

function pauseStopwatch() {
  clearInterval(interval);
  running = false;
  elapsedTime = Date.now() - startTime;
}

function resetStopwatch() {
  clearInterval(interval);
  running = false;
  elapsedTime = 0;
  startTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapList.innerHTML = '';
  document.getElementById("start-btn").textContent = "Start";
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}
