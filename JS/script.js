// UBICO Y DEFINO EL CONTEXTO DEL CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);

// PAUSO LA ANIMACIÓN
const imgAnimation = document.getElementById('img-home-animation');
const instructionsBtn = document.getElementById('instructions-btn');
const playBtn = document.getElementById('play-btn');

window.addEventListener('onload', homeAnimation);

function homeAnimation (){  
  setTimeout(() => {      
      imgAnimation.classList.add('animation-paused');
      instructionsBtn.classList.remove('invisible');
      playBtn.classList.remove('invisible');
    }, 500)
  //game.homeSound.play(); //me pide que interactue
}

homeAnimation()

// UBICO Y AGREGO LISTENNER AL BTN HOW TO PLAY
const instructionsText = document.getElementById('instructions-container');
const closeInstructionsBtn = document.getElementById('close-instructions-btn');

instructionsBtn.addEventListener('click', () => {
  console.log('entro')
  instructionsText.classList.remove("invisible");
});

closeInstructionsBtn.addEventListener('click', () => {
  instructionsText.classList.add("invisible");
});

// UBICO Y AGREGO LISTENNER AL BTN LET'S PLAY
const homeBackground = document.getElementById('home-background');

playBtn.addEventListener('click', () => {
  homeBackground.classList.add('invisible');
  if (game.intervalId === null) {  
    game.start()
  }
})

// UBICO Y AGREGO LISTENNER AL BTN COMMANDS
const commandsBtn = document.getElementById('commands-btn');
const commandsContainer = document.getElementById('commands-container');
const closeCommandsBtn = document.getElementById('close-commands-btn');

commandsBtn.addEventListener('click', () => {
  commandsContainer.classList.remove('invisible');
})

closeCommandsBtn.addEventListener('click', () => {
  commandsContainer.classList.add('invisible');
})

// UBICO Y AGREGO LISTENNER AL BTN RESET
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
  window.location.reload()
})

// UBICO Y AGREGO LISTENNER AL BTN PAUSE 
const pauseBtn = document.getElementById('pause-btn');

pauseBtn.addEventListener('click', () => {
    if (game.intervalId !== null) { 
      game.stop();     
      pauseBtn.textContent = "START";
    } else {
      game.start()    
      pauseBtn.textContent = "PAUSE";
    }
});

// UBICO Y AGREGO LISTENNER AL BTN PLAY AGAIN
const playAgainBtn = document.getElementById('play-again-btn');

playAgainBtn.addEventListener('click', () => {
  window.location.reload()
})