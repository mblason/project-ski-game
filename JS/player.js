class Player {
    constructor(ctx, game){
        this.ctx = ctx;
        this.game = game;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 3;     

        this.img = new Image();
        this.img.src = '/Images/Player/Sprite_moves_0.png';
        this.img.frames = 6;
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

        // DOWN
        if (this.game.vy == -4) {
            this.img.frameIndex = 0;
            this.snowballs.forEach(ball => {
                ball.vy = 5;            
                ball.move()
            });

        }

        // KINDA LEFT
        if (this.game.vx == 3){
            this.img.frameIndex = 1; 
            this.snowballs.forEach(ball => {
                ball.vx = -4; 
                ball.vy = 5;            
                ball.move()
            });
        }

        // LEFT
        if (this.game.vy == -3 && this.game.vx == 4 ){
            this.img.frameIndex = 2; 
            this.snowballs.forEach(ball => {
                ball.vx = -8; 
                ball.vy = 5;            
                ball.move()
            });
        }
 
        // KINDA RIGHT
        else if (this.game.vx == -3){
            this.img.frameIndex = 3; 
            this.snowballs.forEach(ball => {
                ball.vx = 1; 
                ball.vy = 5;            
                ball.move()
            });
        }

        // RIGHT
        if (this.game.vy == -3 && this.game.vx == -4 ){
            this.img.frameIndex = 4; 
            this.snowballs.forEach(ball => {
                ball.vx = 15; 
                ball.vy = 5;            
                ball.move()
            });
        }

        // JUMP
        if (this.game.vy == -6 && !this.isJumping){
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

        // COLLISIONS
        if (this.game.hitObstacle){
            this.img.frameIndex = 6;
        }            

        // SHOOT SNOWBALLS

        
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

    /*
    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        return collideX && collideY;
    }
    */ 
}