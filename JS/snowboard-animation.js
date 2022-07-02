class Snowboard {
    constructor(ctx) {
        this.ctx = ctx;     

        this.img = new Image();
        this.img.src = '/Images/Animated Obstacles/Sprite_Snowboarding.png';
        this.w = 40;
        this.h = 60;   

        this.maxX = this.ctx.canvas.width - 60;
        this.minX = this.ctx.canvas.width * 0.30;
        this.randomX = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX;

        this.x = this.randomX;
        this.y = 0;
        this.img.frames = 4;
        this.img.frameIndex = 0; 

        this.vx = 6;
        this.vy = 6;
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
        
        if (this.y < this.ctx.canvas.height * 0.15){
            this.y += this.vy;
        } 
        
        if (this.y > this.ctx.canvas.height * 0.35){
            this.x -= this.vx;
            this.y += this.vy;
        } 


        if (this.y > this.ctx.canvas.height * 0.55){
            this.x += this.vx;
            this.y += this.vy;
        }    

        if (this.y < this.ctx.canvas.height * 0.80){
            this.y += this.vy;
        }
    }

    isVisible() {
        return this.y <= this.ctx.canvas.height;
    }

    animate() {
        this.tickAnimation++;
        
        if (this.tickAnimation > 15) {
            this.tickAnimation = 0;
            this.img.frameIndex++;

            if (this.img.frameIndex === 3) {                
                this.img.frameIndex = 0;
            }
        }
    }

    collide(el) {
        const treshold = 10;
        const collideX = el.x + el.w - treshold > this.x && el.x + treshold < this.x + this.w;
        const collideY = el.y + treshold < this.y + this.h && el.y + el.h > this.y;

        return collideX && collideY;
    }
}