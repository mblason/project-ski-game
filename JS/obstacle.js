class Obstacle {
    constructor(ctx, type, game) {
        this.ctx = ctx;
        this.type = type;   
        this.game = game;
        this.collided = false;

        this.maxX = this.ctx.canvas.width + 100;
        this.minX = -100;         
        this.randomX = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX; 
               
        this.maxY = this.ctx.canvas.height + 100;
        this.minY = this.ctx.canvas.height;
        this.randomY = Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY;        

        this.types = { 
            // key: [url img, width, height, x, y]
            
            tree: ['/Images/Frequent Obstacles/Tree.png', 48, 60, this.randomX, this.randomY],
            dryTree: ['/Images/Frequent Obstacles/Dry_tree.png', 40, 48, this.randomX, this.randomY],
            cutTree: ['/Images/Frequent Obstacles/Cut_tree.png', 32, 24, this.randomX, this.randomY],
            pine: ['/Images/Frequent Obstacles/Pine.png', 55, 106, this.randomX, this.randomY],
            rock: ['/Images/Frequent Obstacles/Rock.png', 40, 22, this.randomX, this.randomY],
            chairliftEmpty: ['/Images/Frequent Obstacles/Chairlift_empty.png', 50, 55, this.ctx.canvas.width * 0.10, this.maxY],
            chairliftFull: ['/Images/Frequent Obstacles/Chairlift_full.png', 50, 57, this.ctx.canvas.width * 0.20, this.maxY - 100],
            car: ['/Images/Not Frequent Obstacles/Car.png', 47, 108, this.ctx.canvas.width * 0.75, this.maxY],
            rainbowRamp: ['/Images/Not Frequent Obstacles/Rainbow.png', 58, 19, this.randomX, this.randomY]                    
        }

        this.img = new Image();
        this.img.src = this.types[this.type][0];  
        this.w = this.types[this.type][1];
        this.h = this.types[this.type][2];   
        this.x = this.types[this.type][3];    
        this.y = this.types[this.type][4];  
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
        return (this.y <= this.ctx.canvas.height && this.y >= 0) && (this.x <= this.ctx.canvas.width && this.x >= 0);
    }
    
    collide(el) {
        const treshold = 10;
        const collideX = el.x + el.w - treshold > this.x && el.x + treshold < this.x + this.w;
        const collideY = el.y + treshold < this.y + this.h && el.y + el.h > this.y;

        return el.invencible ? false : collideX && collideY;
    }
}