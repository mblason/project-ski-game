const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);


// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas());
        
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
                
    game.start()
}




