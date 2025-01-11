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
const toggleButton = document.getElementById('toggleMode');
const themeToggle = document.getElementById('themeToggle');

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
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = isWorkMode ? REST_TIME : WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                alarmSound.play();  // Play the alarm sound
                clearInterval(timerId);
                timerId = null;
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? REST_TIME : WORK_TIME;
    modeText.textContent = isWorkMode ? 'Rest Time' : 'Work Time!';
    updateDisplay();
}

toggleButton.addEventListener('click', function() {
    isWorkMode = this.textContent === 'Switch to Rest';
    
    // Update button text
    this.textContent = isWorkMode ? 'Switch to Work' : 'Switch to Rest';
    
    // Update mode text
    document.getElementById('mode-text').textContent = isWorkMode ? 'Rest Time' : 'Work Time!';
    
    // Update timer display and internal state
    timeLeft = isWorkMode ? REST_TIME : WORK_TIME;
    updateDisplay();
});

// Update the reset functionality to respect the current mode
function reset() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 

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