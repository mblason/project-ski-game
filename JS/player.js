class Player {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 800; // this.ctx.canvas.width / 2
        this.y = 300; // this.ctx.canvas.heigth / 3
        this.w = 61;
        this.h = 99;
        this.img = new Image();
        this.img.src = '/Images/player.png';

        this.actions = {
            d: false,
            a: false,
            Enter: false,
        }

        this.vx = 0;
        this.vy = 0;
        this.g = 1;


        this.setListenners();
    }

    draw() {        
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.applyActions();
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.g;
    }

    setListenners() {
        document.onkeydown = e => this.switchActions(e.key, true);
        document.onkeyup = e => this.switchActions(e.key, false);
    }

    switchActions(key, bool) {
        this.actions[key] = bool
        console.log(key)
    }

    applyActions() {
        if (this.actions.d) {
            this.vx = 2
        }

        if (this.actions.a) {
            this.vx = -2
        }

        if (this.actions.Enter) {
            this.vy = -20
        }
    }

   














}