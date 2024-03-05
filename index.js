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

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            alert('Pomodoro session completed!');
            resetTimer();
            return;
        }
            minutes--;
            seconds = 59;
    } else {
        seconds--;
        }
        updateDisplay();
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
            minutes = 15; // Set minutes to 10 for long break mode
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

