class Snowball {
    constructor(shooter, x, y) {
        this.shooter = shooter;
        this.ctx = shooter.ctx;  
        this.game = shooter.game;     
        this.collided = false;
        this.snowballShooted = false;

        this.img = new Image();
        this.img.src = './Images/snowball.png';

        this.x = x;
        this.y = y;
        this.w = 15;
        this.h = 15;

        this.vx = this.game.vx ? -this.game.vx : 0;
        this.vy = -this.game.vy - 1;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h,
        )
    }

    move() {           
            this.x += this.vx;
            this.y += this.vy;                          
    }

    isVisible() {
        return this.y <= this.ctx.canvas.height; 
    }
}