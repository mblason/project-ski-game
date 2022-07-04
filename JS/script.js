// UBICO Y DEFINO EL CONTEXTO DEL CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);

//INICIO LA MUSICA Y PAUSO LA ANIMACIÓN DEL LOGO 
window.addEventListener('load', () =>
{ game.homeSound.play() 
  homeAnimation()
});

const imgAnimation = document.getElementById('img-home-animation');
const instructionsBtn = document.getElementById('instructions-btn');
const playBtn = document.getElementById('play-btn');
const gameInfo = document.getElementById('game-info');

function homeAnimation (){  
  setTimeout(() => {      
      imgAnimation.classList.add('animation-paused');
      instructionsBtn.classList.remove('invisible');
      playBtn.classList.remove('invisible');
      gameInfo.classList.remove('invisible');
    }, 5000)
}

// UBICO Y AGREGO LISTENNER AL BTN HOW TO PLAY
const instructionsText = document.getElementById('instructions-container');
const closeInstructionsBtn = document.getElementById('close-instructions-btn');

instructionsBtn.addEventListener('click', () => {
  game.btnSound.play();
  instructionsText.classList.remove("invisible");
});

closeInstructionsBtn.addEventListener('click', () => {
  game.btnSound.play();
  instructionsText.classList.add("invisible");
});

// UBICO Y AGREGO LISTENNER AL BTN LET'S PLAY
const homeBackground = document.getElementById('home-background');
const diffContainer = document.getElementById('choose-level-container');

playBtn.addEventListener('click', () => {
  game.btnSound.play();
  homeBackground.classList.add('invisible');
  diffContainer.classList.remove('invisible');
})

// UBICO BTNS DE LAS DIFFICULTIES

const easyDiffBtn = document.getElementById('easy-diff-btn');

easyDiffBtn.addEventListener('click', () => {
  game.btnSound.play();
  diffContainer.classList.add('invisible');  
  if (game.intervalId === null) {  
    game.diffIndex = 0;
    game.start()
    startTimeCountdown();  
    setTimeout(() => {
      game.vy = game.difficulties[game.diffIndex].vyDown;
      countdownContainer.classList.add('invisible');
      countdownText.classList.add('invisible');
    }, 5000)
  }
})

const normalDiffBtn = document.getElementById('normal-diff-btn');

normalDiffBtn.addEventListener('click', () => {
  game.btnSound.play();
  diffContainer.classList.add('invisible');  
  if (game.intervalId === null) {  
    game.diffIndex = 1;
    game.start()
    startTimeCountdown();  
    setTimeout(() => {
      game.vy = game.difficulties[game.diffIndex].vyDown;
      countdownContainer.classList.add('invisible');
      countdownText.classList.add('invisible');
    }, 5000)
  }
})

const hardDiffBtn = document.getElementById('hard-diff-btn');

hardDiffBtn.addEventListener('click', () => {
  game.btnSound.play();
  diffContainer.classList.add('invisible');  
  if (game.intervalId === null) {  
    game.diffIndex = 2;
    game.start()
    startTimeCountdown();  
    setTimeout(() => {
      game.vy = game.difficulties[game.diffIndex].vyDown;
      countdownContainer.classList.add('invisible');
      countdownText.classList.add('invisible');
    }, 5000)
  }
})

// FUNCION DE COUNTDOWN 
const countdownContainer = document.getElementById('countdown-container');
const countdownText = document.getElementById('countdown');        
let time;
        
function startTimeCountdown() {
    time = 3;
    setInterval(countdown, 1000);
}

function countdown() {
    if (time == 0) {
      clearTimeout(time);
      countdownText.innerHTML = 'GO!'
    } else {
        countdownText.innerHTML = time;
        time--;
    }
}

// UBICO Y AGREGO LISTENNER AL BTN COMMANDS
const commandsBtn = document.getElementById('commands-btn');
const commandsContainer = document.getElementById('commands-container');
const closeCommandsBtn = document.getElementById('close-commands-btn');

commandsBtn.addEventListener('click', () => {
  game.btnSound.play();
  commandsContainer.classList.remove('invisible');
})

closeCommandsBtn.addEventListener('click', () => {
  game.btnSound.play();
  commandsContainer.classList.add('invisible');
})

// UBICO Y AGREGO LISTENNER AL BTN RESET
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
  game.btnSound.play();
  window.location.reload()
})

// UBICO Y AGREGO LISTENNER AL BTN PAUSE 
const pauseBtn = document.getElementById('pause-btn');

pauseBtn.addEventListener('click', () => {
    game.btnSound.play();
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
  game.btnSound.play();
  setTimeout(() => {
    window.location.reload()
  },100)  
})

