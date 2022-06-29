class Player {
    constructor(ctx, game){
        this.ctx = ctx;
        this.game = game;

        this.health = 4;
        this.invencible = false;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 3;     

        this.img = new Image();
        this.img.src = '/Images/Player/Player_moves.png';
        this.img.frames = 8;
        this.img.frameIndex = 0;

        this.w = 45;
        this.h = 54;
        
        this.vy = 0;
        this.g = 1.5;
        
        this.isJumping = false;

        this.snowballs = [];
        this.tickSnowballs = 0;
        this.isReloading = false;
        this.snowballsCounter = 0;
        this.direction = false;
    }

    draw() {        
        //(img, sx, sy, swidth, sheight, x, y, width, height)        
        
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames, 
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );

        this.snowballs.forEach(ball => ball.draw());
    }


    move() {     
        this.y += this.vy;
        this.snowballs.forEach(ball => {
            if(!ball.snowballShooted){
                ball.snowballShooted = true;
                ball.move()}
        } );
        
        // DOWN
        if (this.game.vy == -4) {
            this.img.frameIndex = 0;   
            this.direction = 'down';         
        }

        // KINDA LEFT
        if (this.game.vx == 3){
            this.img.frameIndex = 1; 
            this.direction = 'kindaLeft';
        }

        // LEFT
        if (this.game.vy == -3 && this.game.vx == 4 ){
            this.img.frameIndex = 2; 
            this.direction = 'left';
        }
 
        // KINDA RIGHT
        else if (this.game.vx == -3){
            this.img.frameIndex = 3; 
            this.direction = 'kindaRight';
        }

        // RIGHT
        if (this.game.vy == -3 && this.game.vx == -4 ){
            this.img.frameIndex = 4; 
            this.direction = 'right';
        }

        // JUMP
        if (this.game.vy == -6 && !this.isJumping){
            this.isJumping = true;
            this.vy = -7;            
            this.img.frameIndex = 5;
            this.direction = false;
        }

        if (this.isJumping){            
            if (this.y < this.ctx.canvas.height * 0.25){
                this.vy  = 7;
            } else if (this.y > this.ctx.canvas.height / 3){
                this.vy = 0;
                this.y = this.ctx.canvas.height / 3;
                this.isJumping = false;                
            }
        }

        // COLLISIONS
        if (this.game.hitObstacle){
            this.img.frameIndex = 6;
            this.game.hitObstacle = false;
            this.direction = false;
        }                
        
        // RAMP JUMP
        if (this.game.vy == -8){
            this.img.frameIndex = 5;
            this.direction = false;
        }
    }

    shoot() {
        this.tickSnowballs++;
    
        if (this.tickSnowballs > 10) {
            this.tickSnowballs = 0;
            this.clearSnowballs();

            if(!this.isReloading) {        
                this.snowballs.push(new Snowball(this, this.x + this.w / 2, this.y + this.h));
                this.snowballsCounter++;
            }        
        }

        if (this.snowballsCounter === 4) {
            this.isReloading = true;
            this.snowballsCounter = 0;
            setTimeout(() => {
                this.isReloading = false;
            }, 1000)
        }  
    }

    clearSnowballs() {
       this.snowballs = this.snowballs.filter(ball => ball.isVisible())
    }

    playerReceiveDamage(damage) {
        this.health -= damage;  
        return this.health;
    }            
} 

    
