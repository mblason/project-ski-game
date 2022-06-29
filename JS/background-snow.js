class Background{
    constructor(ctx, snow, game){
        this.ctx = ctx; 
        this.snow = snow;
        this.game = game; 

        this.maxX = this.ctx.canvas.width + 100;
        this.minX = -100;         
        this.randomX = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX; 
               
        this.maxY = this.ctx.canvas.height + 100;
        this.minY = this.ctx.canvas.height;
        this.randomY = Math.floor(Math.random() * ((this.maxY) - this.minY)) + this.minY;      
        
        this.snows = {
            // key: [url img, width, height, x, y]
            snowLarge: ['/Images/Frequent Obstacles/Snow_large.png', 118, 67, this.randomX, this.randomY],
            snowMedium: ['/Images/Frequent Obstacles/Snow_medium.png', 51, 48, this.randomX, this.randomY],  
            snowSmall: ['/Images/Frequent Obstacles/Snow_small.png', 66, 44, this.randomX, this.randomY]            
        }

        this.img = new Image();
        this.img.src = this.snows[snow][0];
        this.w = this.snows[snow][1];
        this.h = this.snows[snow][2];
        this.x = this.snows[snow][3];
        this.y = this.snows[snow][4];         
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
        this.y += game.vy;
        this.x += game.vx;        
    }
        
    isVisible() {
        return this.y <= this.ctx.canvas.height;
    }
}