class Dog {
    constructor(ctx) {
        this.ctx = ctx;
                 
        this.img = new Image();
        this.img.src = '/Images/Animated Obstacles/Sprite_dog.png';
        this.w = 37;
        this.h = 30;  
        this.x = 0;   
        this.y = this.ctx.canvas.height + 200;
        this.img.frames = 4;
        this.img.frameIndex = 0; 
    
        this.vx = 2;
        this.vy = 4;
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
        if (this.x < this.ctx.canvas.width * 0.35){
        this.x += this.vx;
        this.y -= this.vy; 
        } else {
            this.y -= this.vy;
        }        
    }

    isVisible() {
        return this.y >= this.ctx.canvas.height;
    }

    animate() {
        this.tickAnimation++;
        
        if (this.tickAnimation > 4) {
            this.tick = 0;
            this.img.frameIndex++;

            if (this.img.frameIndex < 2) {                
            this.img.frameIndex = 0;
             }
        }
    }
}