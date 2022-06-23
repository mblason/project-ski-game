class Snowboard {
    constructor(ctx) {
        this.ctx = ctx;     

        this.img = new Image();
        this.img.src = '/Images/Animated Obstacles/Sprite_Snowboarding.png';
        this.w = 40;
        this.h = 60;   
        this.x = this.ctx.canvas.width * 0.80; 
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
        
        if (this.tickAnimation > 50) {
            this.tick = 0;
            this.img.frameIndex++;

            if (this.img.frameIndex >= this.img.frames) {                
            this.img.frameIndex = 0;
             }
        }
    }
    
}