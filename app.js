let timeLeft = 1500;
let timer;
let isRunning = false;
let pomodoroCount = 0;
let remainingPomodoros = 4;

function startPomodoro() {
    timeLeft = 1500; 
    updateDisplay();
    startTimer("pomodoro"); 
}

function startLongBreak() {
    timeLeft = 900; // 15 min long break time
    updateDisplay();
    startTimer("longBreak"); // Starting timer for longBreaks
}

function updateDisplay(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.querySelector(".timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startShortBreak() {
    timeLeft = 300; // 5 min short break time
    updateDisplay();
    startTimer("shortBreak"); // Starting timer for shortBreaks
}


function startTimer(type) {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
        if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;


                if (type === "pomodoro") {
                    pomodoroCount++;
                    remainingPomodoros--;
                    updatePomodoroCount();
                    alert("Pomodoro time is up! Take a break.");

                    if (remainingPomodoros === 0) {
                        startLongBreak();
                        remainingPomodoros = 4;
                    } else {
                        startShortBreak();
                    }

                } else if(type ==="shortBreak" || type === "longBreak") {
                    alert(`${type === 'shortBreak' ? 'Short' : 'Long'} break is over! Time for the next Pomodoro.`);
                    resetTimer();
                    startPomodoro();
                }else{
                    pomodoroCount++;
                    remainingPomodoros--;
                    alert("Pomodoro time is up! Take a break.");
                    startShortBreak();
                    updatePomodoroCount();
                }
            }
        }, 1000);
    }
}

function pauseTimer(){
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500; // Pomodoro time 25 min
    isRunning = false;
    updateDisplay();
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    let button = document.querySelector(".darkMode");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "Light Mod";
    } else {
        button.textContent = "Dark Mod";
    }
}
        
function updatePomodoroCount(){
    document.getElementById("pomodoroCount").textContent = pomodoroCount;
    document.getElementById('remainingPomodoros').textContent = remainingPomodoros;
}

updateDisplay();
