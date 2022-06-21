class Player {
    constructor(ctx){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 3;
        this.w = 61;
        this.h = 99;
        this.img = new Image();
        this.img.src = '/Images/player.png';

        this.actions = {
            d: false,
            a: false,
            Enter: false,
        }

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
    }

    setListenners() {
        document.onkeydown = e => this.switchActions(e.key, true);
        document.onkeyup = e => this.switchActions(e.key, false);
    }

    switchActions(key, bool) {
        this.actions[key] = bool
    }

    applyActions() {
        if (this.actions.d) {
            // la imagen tiene que cambiar hacia la derecha
        }

        if (this.actions.a) {
            // la imagen tiene que cambiar hacia la izquierda
        }

        if (this.actions.Enter) {
            this.vy = -10
            // la imagen tiene que cambiar al frame jumping
        }
    }

}