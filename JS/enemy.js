class Enemy {
    constructor(ctx, game){
        this.ctx = ctx;        
        this.game = game;

        this.health = 1;

        /*   
        this.maxLeft = 0;
        this.minLeft = -100;         
        this.randomLeft = Math.floor(Math.random() * (this.maxLeft - this.minLeft)) + this.minLeft; 

        this.maxRight = this.ctx.canvas.width + 100;
        this.minRight = this.ctx.canvas.width;  
        this.randomRight = Math.floor(Math.random() * (this.maxRight - this.minRight)) + this.minRight;  
        */
    
        this.x = this.game.enemyLeft ? 0 : this.ctx.canvas.width;
        this.y = this.ctx.canvas.height;

        this.w = 45;
        this.h = 60;

        // IMG YETI RUNNING 
        this.imgRunning = new Image();
        this.imgRunning.src = '/Images/Enemy/Yeti_running.png';
        this.imgRunning.frames = 8;
        this.imgRunning.frameIndex = this.game.enemyLeft ? 0 : 5;

        //IMG YETI DEAD
        this.imgDead = new Image();
        this.imgDead.src = '/Images/Home/RIP_yetis.png'; 
        
        this.vy = -2;
        this.vx = this.game.enemyLeft ? 2 : -2;

        this.tickAnimation = 0;
    }

    draw() {                  
        //(img, sx, sy, swidth, sheight, x, y, width, height)

        //EL YETI EN MOVIMIENTO
        if(this.vy !== 0){
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
            this.animate();
        }

        // EL YETI COLLISSION CON LA SNOWBALL ES DECIR KILLED
        if (this.game.killedYeti){
            this.w = 30;
            this.h = 40;

            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.w,
                this.h,
            )
            
            this.game.killedYeti = false;
        }
    }

    move(){
        // el yeti aparecer Random en diagonal desde el extremo inferior derecho o izquierdo 
        // el yeti debe llegar hasta la posición del player 
        //MOVER AL YETI
        if(this.game.vx === 0) {
            this.vx = this.x < this.game.player.x ? 2 : -2;
        }

        if(this.game.vx > 0) {
            this.vx = this.x < this.game.player.x ? 5 : 1;
        }

        if(this.game.vx < 0) {
            this.vx = this.x < this.game.player.x ? -1 : -5;
        }

        if(this.game.vy === -8){
            this.vy = -8;
        }
 
        this.y += this.vy 
        this.x += this.vx; 

    }

    animate() {
        this.tickAnimation++;

        if (this.tickAnimation > 4) {
            this.tickAnimation = 0;
            this.imgRunning.frameIndex++; 
            
            if (this.game.enemyLeft) {          
                this.imgRunning.frameIndex = 0;                                      
                }         

            if (!this.game.enemyLeft){
                this.imgRunning.frameIndex = 5;
            }
        }          
    }
    
    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        return collideX && collideY;
    }

    enemyReceiveDamage(damage) {
        setTimeout(() => {
            this.health -= damage;    
            return this.health;    
        }, 200)
    } 
}