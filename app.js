//Interval
let countdown;

//HTML Objects
const timerDisplay = document.getElementById('countDown');
const buttonFocus = document.getElementById('buttonFocus');
const buttonLong = document.getElementById('buttonLong');
const buttonShort = document.getElementById('buttonShort');
const buttonStart = document.getElementById('buttonStart');
const load = document.getElementById('loadBar');

//Variable to store last pressed time button for the start Button
var timeStart;

//Completed Sound
var sound = new Audio ('alert.mp3');

//Used for pausing
var isPaused = true;
var currentTimeLeft;
var loadTemp;



function timer(seconds){
    //Clear inveral incase one running
    clearInterval(countdown);

    console.log('Button was clicked got into timer()')
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(count, 1000);

    function count(){
        const secondsLeft = Math.round((then - Date.now())/1000);
        currentTimeLeft = secondsLeft;

        //check if we should stop
        if(secondsLeft < 0){
            sound.play();
            clearInterval(countdown)
            return;
        }
        else{
            loadBar(secondsLeft);
            displayTimeLeft(secondsLeft);
            
            
        }
    }

    function loadBar(left){
        var temp = ((left / timeStart) * 100) + "%";
        // loadTemp = temp;
        // console.log(loadTemp);
        load.style.width = temp;
    }
}

//Display Time
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = "Focus Timer " + display;
    timerDisplay.textContent = display;
    
    
}


//Start the count down Timer
function startTimer(){
    //starting
    if(this.id == 'buttonStart' && isPaused == true){
        
        isPaused = false;
        this.innerText = 'Pause';
        timer(currentTimeLeft);
        
    }
    //pausing
    else if(this.id == 'buttonStart' && isPaused == false){
        isPaused = true;
        this.innerText = 'Start';
        displayTimeLeft(currentTimeLeft);
        clearInterval(countdown);
        //timeStart = currentTimeLeft;
    }
    //Any other button
    else{
        timeStart = this.value;
        currentTimeLeft = timeStart;
        clearInterval(countdown);
        displayTimeLeft(this.value);
        load.style.width = "100%";
        buttonStart.innerText = 'Start';
    }
    
}


//Button Clicks
buttonFocus.addEventListener('click', startTimer);
buttonLong.addEventListener('click', startTimer);
buttonShort.addEventListener('click', startTimer);
buttonStart.addEventListener('click', startTimer);
