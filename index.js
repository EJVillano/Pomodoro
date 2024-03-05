let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('startButton');

let timer;
let seconds = 0, minutes = 0, hours = 0, isPaused = true;

// pomodoro selection bar gives active class to link in
function modeSelection(){
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('.custom-nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', function() {
                
                // Remove 'active' class from all links
                links.forEach(link => {
                    link.classList.remove('active');
                });

                // Add 'active' class to the clicked link
                this.classList.add('active');
            });
        });
    });
}

modeSelection();

// mode changing
const pomodoroMode = document.getElementById('pomodoro');
const shortBreakMode = document.getElementById('shortBreak');
const longBreakMode = document.getElementById('longBreak');
const mainSection = document.getElementById('mainSection');

function modeChange(){

    mainSection.classList.remove('bg-red', 'bg-green', 'bg-blue');

    if (pomodoroMode && pomodoroMode.classList.contains('active')) {
        
        mainSection.classList.add('bg-red');

    } else if (shortBreakMode && shortBreakMode.classList.contains('active'))  {
        
        mainSection.classList.add('bg-green');

    }else if (longBreakMode && longBreakMode.classList.contains('active'))  {
        
        mainSection.classList.add('bg-blue');

    }
    resetTimer();
}


document.addEventListener('DOMContentLoaded', function() {
    // Select all mode selection elements
    const modeSelectionElements = document.querySelectorAll('.custom-nav-link');

    // Function to handle mode selection
    function handleModeSelection(event) {
        // Prevent default behavior
        event.preventDefault();

        // Remove active class from all mode selection elements
        modeSelectionElements.forEach(element => {
            element.classList.remove('active');
        });

        // Add active class to the clicked mode selection element
        event.target.classList.add('active');
        
        // Call function to change background color based on mode
        modeChange();
    }

    // Add click event listeners to each mode selection element
    modeSelectionElements.forEach(element => {
        element.addEventListener('click', handleModeSelection);
    });
});


// timer functions
function startTimer() {
    if (isPaused){
        timer = setInterval(updateTimer, 1000);
        isPaused = false;
        startButton.textContent = 'Pause';
    }else {
        clearInterval(timer);
        isPaused = true;
        startButton.textContent = 'Resume';
    }
}

let pomodoroCount = 0; // Counter to track the number of completed pomodoro sessions

// Function to update the timer
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            if (pomodoroMode.classList.contains('active')) {
                
                pomodoroCount++; // Increment pomodoro session count
                if (pomodoroCount % 4 === 0) { // Check if it's the 4th pomodoro session
                    switchToLongBreakMode(); // Switch to long break mode after 4 sessions
                } else {
                    switchToShortBreakMode(); // Switch to short break mode
                }
            } else if (shortBreakMode.classList.contains('active')) {
                
                switchToPomodoroMode(); // Switch back to pomodoro mode after short break
            } else if (longBreakMode.classList.contains('active')) {
                
                resetPomodoroCount(); // Reset pomodoro count after long break
                switchToPomodoroMode(); // Switch back to pomodoro mode after long break
            }
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

// Function to reset the pomodoro count
function resetPomodoroCount() {
    pomodoroCount = 0;
}

// Function to switch to short break mode
function switchToShortBreakMode() {
    const shortBreakLink = document.getElementById('shortBreak');
    shortBreakLink.click(); // Simulate click on short break mode link to switch modes
    
    
}

// Function to switch to short break mode
function switchToPomodoroMode() {
    const pomodoroLink = document.getElementById('pomodoro');
    pomodoroLink.click(); // Simulate click on pomodoro mode link to switch modes
    
}

// Function to switch to long break mode
function switchToLongBreakMode() {
    const longBreakLink = document.getElementById('longBreak');
    longBreakLink.click(); // Simulate click on long break mode link to switch modes
    pomodoroCount = 0; // Reset pomodoro count
}

// timer display 
function updateDisplay() {
    var displayString = 
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
    timerDisplay.textContent = displayString;
    }

function resetTimer() {
    clearInterval(timer);
    if (shortBreakMode.classList.contains('active')) {
            minutes = 5; // Set minutes to 5 for short break mode
    } else if (longBreakMode.classList.contains('active')) {
            minutes = 15; // Set minutes to 15 for long break mode
    } else {
            minutes = 25; // Set minutes to 25 for pomodoro mode
    }
    seconds = 0;
    isPaused = true;
    updateDisplay();
    startButton.textContent = 'Start';
    }

startButton.addEventListener('click', startTimer);

resetTimer(); // Initialize timer display

