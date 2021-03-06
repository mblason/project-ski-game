class Home {
    constructor(ctx, element, game){
        this.ctx = ctx; 
        this.element = element;
        this.game = game; 
        
        this.elements = {
            // key: [url img, width, height, x, y]
            skiCenter: ['./Images/Home/Ski_center.png', 400, 142, this.ctx.canvas.width * 0.35, this.ctx.canvas.height * 0.10 ],
            startFlag: ['./Images/Home/Start_flag.png', 300, 200, this.ctx.canvas.width * 0.39, this.ctx.canvas.height * 0.49],
            redFlagOne: ['./Images/Home/Flag_red.png', 40, 53, this.ctx.canvas.width * 0.42 + 220 * 1.04, this.ctx.canvas.height * 0.75],
            blueFlagOne: ['./Images/Home/Flag_blue.png', 48, 70, this.ctx.canvas.width * 0.38, this.ctx.canvas.height * 0.85],
            redFlagTwo: ['./Images/Home/Flag_red.png', 40, 53, this.ctx.canvas.width * 0.42 + 220 * 1.04, this.ctx.canvas.height * 0.95],
            blueFlagTwo: ['./Images/Home/Flag_blue.png', 48, 70, this.ctx.canvas.width * 0.38, this.ctx.canvas.height + this.ctx.canvas.height * 0.05],
            snowLarge: ['./Images/Home/Snow_large.png', 118, 67,this.ctx.canvas.width * 0.35, this.ctx.canvas.height * 0.40],
            snowMedium: ['./Images/Home/Snow_medium.png', 51, 48, this.ctx.canvas.width * 0.08, this.ctx.canvas.height * 0.25],
            snowSmall: ['./Images/Home/Snow_small.png', 66, 44, this.ctx.canvas.width * 0.20, this.ctx.canvas.height * 0.80],
            snowLarge2: ['./Images/Home/Snow_large.png', 118, 67,this.ctx.canvas.width * 0.65, this.ctx.canvas.height * 0.40],
            snowMedium2: ['./Images/Home/Snow_medium.png', 51, 48, this.ctx.canvas.width * 0.92, this.ctx.canvas.height * 0.25],
            snowSmall2: ['./Images/Home/Snow_small.png', 66, 44, this.ctx.canvas.width * 0.80, this.ctx.canvas.height * 0.80],
            dryTree: ['./Images/Home/Dry_tree.png', 40, 48, this.ctx.canvas.width * 0.60, this.ctx.canvas.height * 0.30],
            dryTree2: ['./Images/Home/Dry_tree.png', 40, 48, this.ctx.canvas.width * 0.35, this.ctx.canvas.height * 0.30],
            dryTree3: ['./Images/Home/Dry_tree.png', 40, 48, this.ctx.canvas.width * 0.15, this.ctx.canvas.height * 0.45],
            dryTree4: ['./Images/Home/Dry_tree.png', 40, 48, this.ctx.canvas.width * 0.85, this.ctx.canvas.height * 0.45],
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