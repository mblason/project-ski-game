class Home {
    constructor(ctx){
        this.ctx = ctx;     

        this.img = new Image();
        this.img.src = '/Images/Home/Start_line.png';

        this.x = this.ctx.canvas.width * 0.46;
        this.y = this.ctx.canvas.height / 2;  

        this.w = 150;
        this.h = 150;

        this.vy = -4;
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
        this.y += this.vy;   
        //los elementos los tengo que mover en base a como se mueve el player. igual que los obstaculos!     
    }
}