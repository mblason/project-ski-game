class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.home = new Home(this.ctx);
        this.player = new Player(this.ctx, this);

        this.frequentObs = [];
        this.notFrequentObs = [];
        this.tickFreqObs = 0;
        this.tickNotFreqObs = 0;

        this.dog = [];
        this.snowboard = [];       
        this.tickDog = 0;
        this.tickSnowboard = 0;

        this.intervalId = null;    
        
        this.actions = {
            //s: down, w: up, d: right, a: left, Enter: jump, Shift: shoot
            s: false,
            w: false,
            d: false,
            a: false,
            Enter: false, 
            Shift: false
        }
        
        this.vy = -4;
        this.vx = 0;

        this.hitObstacle = false;

        this.setListenners();
    }

    start() {
        this.intervalId = setInterval(() => {     
            this.clear();
            this.draw();
            this.checkCollisions();
            this.move();

            this.tickFreqObs++;
            this.tickNotFreqObs++;
            this.tickDog++;
            this.tickSnowboard++;
            
            if (this.tickFreqObs == 60 ) {
                this.tickFreqObs = 0;
                this.clearFrequentObs();
                this.addFrequentObs();      

            } 

            if (this.tickNotFreqObs == 300) {
                this.tickNotFreqObs = 0;
                this.clearNotFrequentObs();
                this.addNotFrequentObs();
            }

            if (this.tickDog == 1000){
                this.tickDog = 0;
                this.clearDog();
                this.addDog();
            }

            if (this.tickSnowboard == 500){
                this.tickSnowboard = 0;
                this.clearSnowboard();
                this.addSnowboard();
            }
        }, 1000 / 60)

    }

    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }

    clearFrequentObs() {
        this.frequentObs = this.frequentObs.filter(obs => obs.isVisible());
    }

    clearNotFrequentObs() {
        this.notFrequentObs = this.notFrequentObs.filter(obs => obs.isVisible());
    }

    clearDog() {
        this.dog = this.dog.filter(dog => dog.isVisible());
    }

    clearSnowboard() {
        this.snowboard = this.snowboard.filter(snowb => snowb.isVisible());
    }

    draw() { 
        this.player.draw(); 
        this.home.draw();          
        this.frequentObs.forEach(obs => obs.draw());
        this.notFrequentObs.forEach(obs => obs.draw());
        this.dog.forEach(dog => dog.draw());
        this.snowboard.forEach(snowb => snowb.draw());
               
    }

    addFrequentObs() {
        this.frequentObs.push(            
            new Obstacle(this.ctx, 'snowdrift', this),
            new Obstacle(this.ctx, 'snow', this),
            new Obstacle(this.ctx, 'tree', this),
            new Obstacle(this.ctx, 'dryTree', this),
            new Obstacle(this.ctx, 'cutTree', this),
            new Obstacle(this.ctx, 'pine', this),
            new Obstacle(this.ctx, 'rock', this)                
        )
    }

    addNotFrequentObs() {
        this.notFrequentObs.push(
            new Obstacle(this.ctx, 'chairliftEmpty', this),
            new Obstacle(this.ctx, 'chairliftFull', this),
            new Obstacle(this.ctx, 'rainbow', this),
            new Obstacle(this.ctx, 'car', this)
        )
    }

    addDog() {
        this.dog.push(new Dog(this.ctx))
    }

    addSnowboard() {
        this.snowboard.push(new Snowboard(this.ctx))
    }

    move() {        
        this.applyActions();
        this.home.move(); 

        this.frequentObs.forEach(obs => obs.move());
        this.notFrequentObs.forEach(obs => obs.move());

        this.dog.forEach(dog => dog.move());
        this.snowboard.forEach(snowb => snowb.move());

        this.player.move();

        if (this.vy == -6 && !this.player.isJumping){
            this.vy = -4;
        }
    }

     setListenners() {
        document.onkeydown = e => this.switchActions(e.key, true);
        document.onkeyup = e => this.switchActions(e.key, false);
    }

    switchActions(key, bool) {
        this.actions[key] = bool;        
    }

    applyActions() {    
        // DOWN    
        if (this.actions.s) {
            this.vy = -4;
            this.vx = 0;
        }

        // KINDA LEFT
        if (this.actions.a) {
            this.vx = 3;            
        }
                
        // LEFT       
        if (this.actions.a && this.actions.w) {  
            this.vy = -3;
            this.vx = 4;           
        }
        
        // KINDA RIGHT
        if (this.actions.d) {    
            this.vx = -3;       
        } 

        // RIGHT
        if (this.actions.d && this.actions.w) {        
            this.vy = -3;
            this.vx = -4;         
        } 
        
        // JUMP 
        if (this.actions.Enter) { 
            this.vy = -6; 
        }         

        // SHOOT
        if (this.actions.Shift){
            this.player.shoot();
        }
    }
    
     checkCollisions() {
        this.frequentObs.forEach(obs => {

            if (obs.collide(this.player)) {

                if(obs.type !=='snowdrift' && obs.type !=='snow') {
                    this.hitObstacle = true;
                    this.gameOver();
                }                  
            }
                              
        })

        this.notFrequentObs.forEach(obs => {

            if (obs.collide(this.player)) {

                if(obs.type !=='rainbow') {
                    this.hitObstacle = true;
                    this.gameOver();
                } /*else if (obs.type ==='rainbow'){
                    //agregar el método de la rampa
                } */                    
            }
                              
        })
    }
 
    gameOver() {
        clearInterval(this.intervalId);
        this.intervalId = null;

        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.ctx.canvas.width/2, this.ctx.canvas.height/2);        
    }
}