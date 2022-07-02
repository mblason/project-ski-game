class Dog {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
                 
        this.img = new Image();
        this.img.src = '/Images/Animated Obstacles/Sprite_dog.png';
        this.w = 37;
        this.h = 30;  
        this.x = 0;   
        this.y = this.ctx.canvas.height;
        this.img.frames = 4;
        this.img.frameIndex = 0; 
    
        this.tickAnimation = 0;
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

        this.animate();
    }

    move() {
        this.y += this.game.vy;
        this.x += this.game.vx 
        /* setTimeout(() => {
            this.x += this.game.vx + 0.0001; 
        }, 1500) */   
    }

    isVisible() {
        return (this.y <= this.ctx.canvas.height && this.y >= 0) && (this.x <= this.ctx.canvas.width && this.x >= 0);
    }

    animate() {
        this.tickAnimation++;
        
        if (this.tickAnimation > 8) {
            this.tickAnimation = 0;
            this.img.frameIndex++;

            if (this.img.frameIndex === 3) {                
                this.img.frameIndex = 0;
            }
        }
    }
}