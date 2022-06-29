class Home {
    constructor(ctx, element, game){
        this.ctx = ctx; 
        this.element = element;
        this.game = game; 
        
        this.elements = {
            // key: [url img, width, height, x, y]
            skiCenter: ['/Images/Home/Ski_center.png', 400, 142, this.ctx.canvas.width * 0.37, this.ctx.canvas.height * 0.10 ],
            startLine: ['/Images/Home/Start_line.png', 200, 150, this.ctx.canvas.width * 0.44, this.ctx.canvas.height * 0.55],
            redFlagOne: ['/Images/Home/Flag_red.png', 40, 53, this.ctx.canvas.width * 0.44 + 200 * 1.04, this.ctx.canvas.height * 0.75],
            blueFlagOne: ['/Images/Home/Flag_blue.png', 48, 70, this.ctx.canvas.width * 0.41, this.ctx.canvas.height * 0.85],
            redFlagTwo: ['/Images/Home/Flag_red.png', 40, 53, this.ctx.canvas.width * 0.44 + 200 * 1.04, this.ctx.canvas.height * 0.95],
            blueFlagTwo: ['/Images/Home/Flag_blue.png', 48, 70, this.ctx.canvas.width * 0.41, this.ctx.canvas.height + this.ctx.canvas.height * 0.05],
            snowLarge: ['/Images/Home/Snow_large.png', 118, 67,this.ctx.canvas.width * 0.35, this.ctx.canvas.height * 0.40],
            snowMedium: ['/Images/Home/Snow_medium.png', 51, 48, this.ctx.canvas.width * 0.08, this.ctx.canvas.height * 0.25],
            snowSmall: ['/Images/Home/Snow_small.png', 66, 44, this.ctx.canvas.width * 0.20, this.ctx.canvas.height * 0.80],
            dryTree: ['/Images/Home/Dry_tree.png', 40, 48, this.ctx.canvas.width * 0.60, this.ctx.canvas.height * 0.30],
            instructions: []
            
        }

        this.img = new Image();
        this.img.src = this.elements[element][0];
        this.w = this.elements[element][1];
        this.h = this.elements[element][2];
        this.x = this.elements[element][3];
        this.y = this.elements[element][4];         

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
        this.y += game.vy;
        this.x += game.vx;   
    }

    isVisible() {
        return this.y <= this.ctx.canvas.height;
    }
}