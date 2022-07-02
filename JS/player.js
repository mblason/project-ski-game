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
    }

    draw() {        
        //(img, sx, sy, swidth, sheight, x, y, width, height)        
        if(!this.game.enemyEatPlayer){
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
        }

        this.clearSnowballs(); 
        this.snowballs.forEach(ball => ball.draw());
    }


    move() {     
        this.y += this.vy;

        this.snowballs.forEach(ball => ball.move());
        
        // DOWN
        if (this.game.vy == -4) {
            this.img.frameIndex = 0;   
        }

        // KINDA LEFT
        if (this.game.vx == 3){
            this.img.frameIndex = 1; 
        }

        // LEFT
        if (this.game.vy == -3 && this.game.vx == 4 ){
            this.img.frameIndex = 2; 
        }
 
        // KINDA RIGHT
        else if (this.game.vx == -3){
            this.img.frameIndex = 3; 
        }

        // RIGHT
        if (this.game.vy == -3 && this.game.vx == -4 ){
            this.img.frameIndex = 4; 
        }

        // JUMP
        if (this.game.vy == -6 && !this.isJumping && !this.game.hitRamp){
            this.isJumping = true;
            this.vy = -7;            
            this.img.frameIndex = 5;
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

        // COLLISIONS OBSTACLES
        if (this.game.hitObstacle){
            this.img.frameIndex = 6;
            this.game.hitObstacle = false;
        }          
        
        // COLLISION SNOWBOARD MAN
        if (this.game.hitSnowboard){
            this.img.frameIndex = 7;
            this.game.hitSnowboard = false;
        }
        
        // RAMP JUMP
        if (this.game.vy == -8){
            this.img.frameIndex = 5;
        }
    }

    shoot() {
        this.tickSnowballs++;
    
        if (this.tickSnowballs > 10) {
            this.tickSnowballs = 0;
            this.clearSnowballs();

            if (!this.isReloading) {        
                this.snowballs.push(new Snowball(this, this.x + this.w / 2, this.y + this.h));
                this.snowballsCounter++;
            }        
        }

        if (this.snowballsCounter === 4) {
            this.isReloading = true;
            this.snowballsCounter = 0;
            setTimeout(() => {
                this.isReloading = false;
            }, 500)
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

    
