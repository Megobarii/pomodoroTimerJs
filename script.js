const startButton = document.getElementById('start');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const setTimeButton = document.getElementById('setTime');
const studySessionsNumber = document.getElementById('studySessions');
const relaxSessionsNumber = document.getElementById('relaxSessions');

const session1 = document.getElementById('session1');
const session2 = document.getElementById('session2');
const session3 = document.getElementById('session3');
const session4 = document.getElementById('session4');
const session5 = document.getElementById('session5');
const session6 = document.getElementById('session6');
const session7 = document.getElementById('session7');
const session8 = document.getElementById('session8');

let stopped = true; // When the page is first opened, the timer is stopped
let isStudying = true; // Start with study mode
let originalTime = 1500; // Default 25 minutes in seconds
let timeLeft = originalTime;
let relaxTime = 300; // Default relax time (5 minutes)
let timerInterval;

let studySessions = 0;
let relaxSessions = 0;

function finishedSession() {
    if (isStudying) {
        isStudying = false; // Switch to relax mode
        studySessions++;
        studySessionsNumber.textContent = studySessions;
        if (studySessions == 1) {
            session1.textContent = "X";
        } else if (studySessions == 2) {
            session2.textContent = "X";
        } else if (studySessions == 3) {
            session3.textContent = "X";
        } else if (studySessions == 4) {
            session4.textContent = "X";
        } else if (studySessions == 5) {
            session5.textContent = "X";
        } else if (studySessions == 6) {
            session6.textContent = "X";
        } else if (studySessions == 7) {
            session7.textContent = "X";
        } else if (studySessions == 8) {
            session8.textContent = "X";
        }
        runRelaxTimer(); // Start relaxation
    } else {
        isStudying = true; // Switch to study mode
        relaxSessions++;
        relaxSessionsNumber.textContent = relaxSessions;
        runStudyTimer(); // Start study session
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function runRelaxTimer() {
    timerDisplay.textContent = formatTime(relaxTime);
    relaxTime--;
    if (relaxTime < 0) {
        clearInterval(timerInterval);
        alert('Get back to study!');
        pauseTimer();
        finishedSession(); // After relaxation, switch to study
    }
}

function runStudyTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        alert('You can relax...');
        finishedSession(); // After study session, switch to relaxation
    }
}

function startTimer() {
    if (stopped) {
        if (isStudying) {
            timerInterval = setInterval(runStudyTimer, 1000); // Start study timer
        } else {
            timerInterval = setInterval(runRelaxTimer, 1000); // Start relax timer
        }
        stopped = false; // Mark the timer as running
        startButton.textContent = "Pause"; // Change button text to "Pause"
    }
}

function pauseTimer() {
    if (!stopped) {
        clearInterval(timerInterval); // Pause the timer
        stopped = true; // Mark the timer as stopped
        startButton.textContent = "Start"; // Change button text to "Start"
    }
}

function resetTimer() {
    timeLeft = originalTime; // Reset to original time
    relaxTime = 300; // Reset relaxation time to 5 minutes
    timerDisplay.textContent = formatTime(timeLeft);
    if (!stopped) {
        pauseTimer(); // Pause the timer if running
    }
}

function setTime() {
    const userTime = prompt("Please input your time in minutes: ");
    const minutes = parseInt(userTime);
    if (!isNaN(minutes) && minutes > 0) {
        originalTime = minutes * 60;
        timeLeft = originalTime; // Update time left with the new time
        resetTimer();
    } else {
        alert("Invalid input! Please enter a valid number.");
    }
}

function decideContext() {
    if (stopped) {
        startTimer();
    } else {
        pauseTimer();
    }
}

startButton.addEventListener('click', decideContext);
resetButton.addEventListener('click', resetTimer);
setTimeButton.addEventListener('click', setTime);
