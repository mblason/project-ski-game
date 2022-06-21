class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(this.ctx);

        this.frequentObs = [];
        this.notFrequentObs = [];

        this.tickFreqObs = 0;
        this.tickNotFreqObs = 0;

        this.intervalId = null;        
    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.tickFreqObs++;
            this.tickNotFreqObs++;

            if (this.tickFreqObs == 60 ) {
                this.tickFreqObs = 0;
                this.clearFrequentObs();
                this.addFrequentObs();                       
            } 

            if (this.tickNotFreqObs == 300) {
                this.tickNotFreqObs = 0;
                this.clearNotFrequentObs();
                this.addNotFrequentObs();
            }

        }, 1000 / 60)

    }

    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }

    clearFrequentObs() {
        this.frequentObs.find(obs => obs.isVisible());
    }

     clearNotFrequentObs() {
        this.notFrequentObs.find(obs => obs.isVisible());
    }

    draw() {      
        this.frequentObs.forEach(obs => obs.draw());
        this.notFrequentObs.forEach(obs => obs.draw());
        this.player.draw();        
    }

    addFrequentObs() {
        this.frequentObs.push(            
            new Obstacle(this.ctx, 'snowdrift'),
            new Obstacle(this.ctx, 'snow'),
            new Obstacle(this.ctx, 'tree'),
            new Obstacle(this.ctx, 'dryTree'),
            new Obstacle(this.ctx, 'cutTree'),
            new Obstacle(this.ctx, 'pine'),
            new Obstacle(this.ctx, 'rock')                
        )
    }

    addNotFrequentObs() {
        this.notFrequentObs.push(
            new Obstacle(this.ctx, 'chairliftEmpty'),
            new Obstacle(this.ctx, 'chairliftFull'),
            new Obstacle(this.ctx, 'rainbow'),
            new Obstacle(this.ctx, 'car')
        )
    }

    move() {
        this.frequentObs.forEach(obs => obs.move());
        this.notFrequentObs.forEach(obs => obs.move());
        this.player.move();
    }

    gameOver() {
    }
}