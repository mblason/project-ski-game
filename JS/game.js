class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(this.ctx);

        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.draw();
            this.move();
        }, 1000 / 60)

    }

    clear() {

    }

    draw() {        
        this.player.draw();

    }

    move() {
        this.player.move();

    }

    gameOver() {

    }
}