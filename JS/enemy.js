class Enemy {
    constructor(ctx, game, left){
        this.ctx = ctx;   
        this.game = game;            
        this.health = 1;
        this.left = left;
        this.isDead = false;
  
        this.maxLeft = 100;
        this.minLeft = 0;         
        this.randomLeft = Math.floor(Math.random() * (this.maxLeft - this.minLeft)) + this.minLeft; 

        this.maxRight = this.ctx.canvas.width - 100;
        this.minRight = this.ctx.canvas.width;  
        this.randomRight = Math.floor(Math.random() * (this.maxRight - this.minRight)) + this.minRight;  
    
        this.x = this.left ? this.randomLeft : this.randomRight;
        this.y = this.ctx.canvas.height + 100;

        this.w = 45;
        this.h = 60;

        //IMG YETI RUNNING 
        this.imgRunning = new Image();
        this.imgRunning.src = '/Images/Enemy/Yeti_running.png';
        this.imgRunning.frames = 8;
        this.imgRunning.frameIndex = this.left ? 0 : 4;
        
        //IMG YETI EATING PLAYER
        this.imgEating = new Image();
        this.imgEating.src = '/Images/Enemy/Yeti_eating_player.png';
        this.imgEating.frames = 12;
        this.imgEating.frameIndex = this.left ? 0 : 6; 

        //IMG YETI DEAD
        this.imgDead = new Image();
        this.imgDead.src = '/Images/Home/RIP_yetis.png'; 
        
        this.vy = -2;
        this.vx = this.left ? 2 : -2;

        this.tickAnimation = 0;
    }

    draw() {                  
        //(img, sx, sy, swidth, sheight, x, y, width, height)
        //EL YETI EN MOVIMIENTO
        if (!this.isDead && !this.game.enemyEatPlayer){
            this.ctx.drawImage(
                    this.imgRunning,
                    this.imgRunning.frameIndex * this.imgRunning.width / this.imgRunning.frames,
                    0,
                    this.imgRunning.width / this.imgRunning.frames,
                    this.imgRunning.height,
                    this.x,
                    this.y,
                    this.w,
                    this.h
                ) 
            this.animateYetiRunning();
        }

        //EL YETI SE COME AL PLAYER
        if (!this.isDead && this.game.enemyEatPlayer){            
                this.ctx.drawImage(
                    this.imgEating,
                    this.imgEating.frameIndex * this.imgEating.width / this.imgEating.frames,
                    0,
                    this.imgEating.width / this.imgEating.frames,
                    this.imgEating.height,
                    this.x,
                    this.y,
                    this.w,
                    this.h
                ) 
                this.animateYetiEatingPlayer();
        }

        // EL YETI COLLISSION CON LA SNOWBALL ES DECIR KILLED
        if (this.isDead && !this.game.enemyEatPlayer){          
            this.w = 30;
            this.h = 40;

            this.ctx.drawImage(
                this.imgDead,
                this.x,
                this.y,
                this.w,
                this.h,
            )
        }
    }

    move(){
        // el yeti aparecer Random en diagonal desde el extremo inferior derecho o izquierdo 
        // el yeti debe llegar hasta la posición del player 
        //MOVER AL YETI
        this.y += this.vy 
        this.x += this.vx; 

        //LAS VELOCIDADES CAMBIAN EN BASE A LA DIRECCION DEL PLAYER O SI YA MURIÓ EL YETI
        if(this.game.vx === 0) {
            this.vx = this.x < this.game.player.x ? 2 : -2;
        }

        if(this.game.vx > 0) {
            this.vx = this.x < this.game.player.x ? 5 : 1;
        }

        if(this.game.vx < 0) {
            this.vx = this.x < this.game.player.x ? -1 : -5;
        }

        if(this.game.vy == this.game.difficulties[this.game.diffIndex].vyRampJump){
            this.vy = this.game.difficulties[this.game.diffIndex].vyRampJump;
        }

        if (this.isDead){          
            this.vx = this.game.vx;
            this.vy = this.game.vy;
        }        

        if(!this.isDead && this.game.enemyEatPlayer){
            this.vy = 0;
            this.vx = 0;
        }
    }

    animateYetiRunning() {
        this.tickAnimation++;
    
        if (this.tickAnimation > 8) {
            this.tickAnimation = 0;
            this.imgRunning.frameIndex++; 

            if (this.left && this.imgRunning.frameIndex >= 4){
                this.imgRunning.frameIndex = 0;
            }

            if (!this.left && this.imgRunning.frameIndex >= 8){
                this.imgRunning.frameIndex = 4;
            }
        }          
    }
    
    animateYetiEatingPlayer(){
        this.tickAnimation++;
    
        if (this.tickAnimation > 8) {
            this.tickAnimation = 0;
            this.imgEating.frameIndex++; 

            if (this.left && this.imgEating.frameIndex === 5){
                this.imgEating.frameIndex = 5;
            }

            if (!this.left && this.imgEating.frameIndex === 11){
                this.imgEating.frameIndex = 11;
            }
        }
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        return el.invencible ? false : collideX && collideY;
    }

    enemyReceiveDamage(damage) {
        setTimeout(() => {
            this.health -= damage;    
            return this.health;    
        }, 200)
    } 

    isVisible() {
        return (this.y <= this.ctx.canvas.height && this.y >= 0) && (this.x <= this.ctx.canvas.width && this.x >= 0);
    }
}