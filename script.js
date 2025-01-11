let timeLeft;
let timerId = null;
let isWorkTime = true;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const themeToggle = document.getElementById('themeToggle');
const startPauseButton = document.getElementById('startPause');
const addFiveButton = document.getElementById('addFive');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds
const alarmSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // You can change this URL to any audio file you prefer

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
    document.querySelector('.mode').textContent = isWorkMode ? 'Time to focus.' : 'Time to rest.';
}

function toggleTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                alarmSound.play();
                clearInterval(timerId);
                timerId = null;
                startPauseButton.textContent = 'Start';
                switchMode();
            }
        }, 1000);
        startPauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        startPauseButton.textContent = 'Start';
    }
}

function reset() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
    startPauseButton.textContent = 'Start';
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', reset);
addFiveButton.addEventListener('click', addFiveMinutes);

// Initialize the display
reset(); 

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// In your theme toggle event listener, update the icon when clicking
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Set initial theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme); 

// Make sure the initial mode is set to work
isWorkMode = true;
timeLeft = WORK_TIME;
document.querySelector('.mode').textContent = 'Time to focus.'; 