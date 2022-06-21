class Obstacle {
    constructor(ctx, type, vy = 4) {
        this.ctx = ctx;

        this.maxX = this.ctx.canvas.width + 500;
        this.minX = -500;         
        this.randomX = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX; 
        this.maxY = this.ctx.canvas.height + 500;
        this.minY = this.ctx.canvas.height;
        this.randomY = Math.floor(Math.random() * ((this.maxY) - this.minY)) + this.minY;

        this.distX = 80;
        this.disY = 120;

        this.types = { 
            // key: [url img, width, height, x, y]
            snowdrift: ['/Images/Frequent Obstacles/Snow_mountain.png', 118, 67, this.randomX, this.randomY], 
            snow: ['/Images/Frequent Obstacles/Snow.png', 66, 44, this.randomX, this.randomY],
            tree: ['/Images/Frequent Obstacles/Tree.png', 48, 60, this.randomX, this.randomY],
            dryTree: ['/Images/Frequent Obstacles/Dry_tree.png', 40, 48, this.randomX, this.randomY],
            cutTree: ['/Images/Frequent Obstacles/Cut_tree.png', 32, 24, this.randomX, this.randomY],
            pine: ['/Images/Frequent Obstacles/Pine.png', 55, 106, this.randomX, this.randomY],
            rock: ['/Images/Frequent Obstacles/Rock.png', 40, 22, this.randomX, this.randomY],
            chairliftEmpty: ['/Images/Frequent Obstacles/Chairlift_empty.png', 50, 55, this.ctx.canvas.width * 0.10, this.maxY],
            chairliftFull: ['/Images/Frequent Obstacles/Chairlift_full.png', 50, 57, this.ctx.canvas.width * 0.20, this.maxY - 100],
            car: ['/Images/Not Frequent Obstacles/Car.png', 47, 108, this.ctx.canvas.width * 0.35, this.maxY],
            rainbow: ['/Images/Not Frequent Obstacles/Rainbow.png', 58, 19, this.randomX, this.randomY]                    
        }

        this.img = new Image();
        this.img.src = this.types[type][0];     
        this.x = this.types[type][3];    
        this.y = this.types[type][4];  
        this.w = this.types[type][1];
        this.h = this.types[type][2];

        this.vy = vy;
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
        this.y -= this.vy;
    }

    isVisible() {
        return this.y <= this.ctx.canvas.height;
    }

    collide(el) {
    const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
    const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

    return collideX && collideY;
  }
}