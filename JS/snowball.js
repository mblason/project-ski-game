class Snowball {
    constructor(shooter, x, y) {
        this.shooter = shooter;
        this.ctx = shooter.ctx;  
        this.game = shooter.game;     
        this.collided = false;
        this.snowballShooted = false;

        this.img = new Image();
        this.img.src = '/Images/snowball.png';

        this.x = x;
        this.y = y;
        this.w = 15;
        this.h = 15;

        this.vx = 0;
        this.vy = 0;    
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
        // SI LA SNOWBALL NO FUE DISPARADA: LE INDICO LA DIRECCION HACIA DONDE DEBE IR 
        
            // DOWN
            if (this.shooter.direction === 'down') {
                this.vy = 5;
                console.log('ball down');
            }

            // KINDA LEFT
            if (this.shooter.direction === 'kindaLeft') {
                this.vx = -4;
                this.vy = 5;
                console.log('kindaLeft');
            } 

            // LEFT
            if (this.shooter.direction === 'left') {
                this.vx = -8;
                this.vy = 5;
                console.log('left');
            } 
                
            // KINDA RIGHT
            else if (this.shooter.direction === 'kindaRight'){
                    this.vx = 4;
                    this.vy = 5;
                    console.log('kindaRight');
                }

            //RIGHT
            if (this.shooter.direction === 'right'){
                this.vx = 8; 
                this.vy = 5;
                console.log('right');
            } 
            
             //SI LA SNOWBALL YA FUE DISPARADA, LA MUEVO PARA QUE VAYA A POR LA DIRECCION QUE DONDE IBA 
            else if (this.snowballShooted){
                    this.x += this.vx;
                    this.y += this.vy;
                console.log('ball shooted true');            
            }                
            
        }

    isVisible() {
        return this.y <= this.ctx.canvas.height;
    }
}