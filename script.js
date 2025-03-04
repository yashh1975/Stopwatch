let timer;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let running = false;

function formatTime(num, digits = 2) {
    return num.toString().padStart(digits, "0");
}

function updateDisplay() {
    document.getElementById("display").innerText = 
        `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, 3)}`;
}

function toggleTimer() {
    if (!running) {
        running = true;
        document.getElementById("startPause").innerText = "Pause";
        timer = setInterval(() => {
            milliseconds += 10;
            if (milliseconds == 1000) { milliseconds = 0; seconds++; }
            if (seconds == 60) { seconds = 0; minutes++; }
            if (minutes == 60) { minutes = 0; hours++; }
            updateDisplay();
        }, 10);
    } else {
        running = false;
        clearInterval(timer);
        document.getElementById("startPause").innerText = "Start";
    }
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startPause").innerText = "Start";
}

function recordLap() {
    let lapsContainer = document.getElementById("laps");
    let lapTime = document.createElement("p");
    lapTime.innerText = document.getElementById("display").innerText;
    if (lapsContainer.childElementCount === 0) {
        lapsContainer.appendChild(lapTime);
    } else {
        lapsContainer.insertBefore(lapTime, lapsContainer.firstChild);
    }
    if (lapsContainer.childElementCount > 5) {
        lapsContainer.lastChild.remove();
    }
}