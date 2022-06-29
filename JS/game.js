class Game {
    constructor(ctx) {
        this.ctx = ctx;        
        this.home = [];

        this.backgrounds = [];
        this.tickBackground = 0;

        this.player = new Player(this.ctx, this);

        this.tickDistance = 0;
        this.distance = 0;

        this.enemies = [];
        this.deadYetis = 0;
        this.killedYeti = false;

        this.distance = 0;
        this.speed = 0;

        this.frequentObs = [];
        this.notFrequentObs = [];
        this.tickFreqObs = 0;
        this.tickNotFreqObs = 0;

        this.hitObstacle = false;

        this.dog = [];
        this.snowboard = [];       
        this.tickDog = 0;
        this.tickSnowboard = 0;

        this.intervalId = null;    
        
        this.actions = {
            //s: down, w: up, d: right, a: left, Enter: jump, CapsLock: shoot
            s: false,
            S: false,
            w: false,
            W: false,
            d: false,
            D: false,
            a: false,
            A: false,
            Enter: false, 
            CapsLock: false
        }
        
        this.vy = 0;
        this.vx = 0;

        this.enemyLeft = false;

        this.minTime = 500;//180000; // 3 min en milisegundos
        this.maxTime = 2000;//300000; // 5 min en milisegundos
        this.randomAppearEnemy = Math.floor(Math.random() * (this.maxTime - this.minTime)) + this.minTime;
        this.tickAppearEnemy = 0; 

        this.addHomeElements();
        this.setListenners();
    }

    start() {
        
        this.intervalId = setInterval(() => {     
            this.clear();
            this.draw();
            this.checkCollisions();
            this.move();
            
            this.tickBackground++;
            this.tickFreqObs++;
            this.tickNotFreqObs++;
            this.tickDog++;
            this.tickSnowboard++;
            this.tickAppearEnemy++;   
                         
            const deadYetiContainer = document.querySelector('.count-yetis-killed');
            deadYetiContainer.textContent = this.deadYetis;

            if(this.vy !== 0){
                this.tickDistance++; 
            }
                            
            if (this.tickDistance == 100){
                this.tickDistance = 0;
                this.distance++;                                              
            }

            const distanceContainer = document.querySelector('.current-distance');          
            distanceContainer.textContent = this.distance;
            
            if (this.tickBackground == 60 ) {
                this.tickBackground = 0;
                this.clearBackground();
                this.addBackground();      
            } 
            
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

            if (this.tickAppearEnemy == this.randomAppearEnemy){
                this.tickAppearEnemy = 0;
                this.addEnemy(); 
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

    clearBackground() {
        this.backgrounds = this.backgrounds.filter(snow => snow.isVisible());
    }    

    clearHomeElements() {
        this.home = this.home.filter(el => el.isVisible());
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
        this.home.forEach(el => el.draw());      
        this.backgrounds.forEach(snow => snow.draw());
        this.frequentObs.forEach(obs => obs.draw());
        this.notFrequentObs.forEach(obs => obs.draw());
        this.dog.forEach(dog => dog.draw());
        this.snowboard.forEach(snowb => snowb.draw());        
        this.enemies.forEach(enemy => enemy.draw());    
    }

    addBackground() {
        this.backgrounds.push(            
            new Background(this.ctx, 'snowLarge', this),
            new Background(this.ctx, 'snowMedium', this),
            new Background(this.ctx, 'snowSmall', this)
        )
    }

    addHomeElements() {
        this.home.push(
            new Home(this.ctx, 'skiCenter', this),
            new Home(this.ctx, 'snowLarge', this),
            new Home(this.ctx, 'snowMedium', this),
            new Home(this.ctx, 'snowSmall', this),
            new Home(this.ctx, 'dryTree', this),
            new Home(this.ctx, 'startLine', this),
            new Home(this.ctx, 'redFlagOne', this),
            new Home(this.ctx, 'blueFlagOne', this),
            new Home(this.ctx, 'redFlagTwo', this),
            new Home(this.ctx, 'blueFlagTwo', this)
        )
    }

    addFrequentObs() {
        this.frequentObs.push(            
            new Obstacle(this.ctx, 'rock', this),
            new Obstacle(this.ctx, 'tree', this),
            new Obstacle(this.ctx, 'dryTree', this),
            new Obstacle(this.ctx, 'cutTree', this),
            new Obstacle(this.ctx, 'pine', this),
            new Obstacle(this.ctx, 'rainbowRamp', this)                          
        )
    }

    addNotFrequentObs() {
        this.notFrequentObs.push(
            new Obstacle(this.ctx, 'chairliftEmpty', this),
            new Obstacle(this.ctx, 'chairliftFull', this),
            new Obstacle(this.ctx, 'rainbowRamp', this),
            new Obstacle(this.ctx, 'car', this)
        )
    }

    addDog() {
        this.dog.push(new Dog(this.ctx))
    }

    addSnowboard() {
        this.snowboard.push(new Snowboard(this.ctx))
    }

    addEnemy() {
        this.enemies.push(new Enemy(this.ctx, this))
        this.enemyLeft = !this.enemyLeft
    }

    move() {        
        this.applyActions();
        this.home.forEach(el => el.move());
        this.backgrounds.forEach(snow => snow.move());
        this.frequentObs.forEach(obs => obs.move());
        this.notFrequentObs.forEach(obs => obs.move());
        this.dog.forEach(dog => dog.move());
        this.snowboard.forEach(snowb => snowb.move());

        this.enemies.forEach(enemy => enemy.move());
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
        if (!this.player.invencible) {
            this.actions[key] = bool;        
        }
    }

    applyActions() {    
        // DOWN    
        if ((this.actions.s || this.actions.S) && !this.player.invencible) {
            this.vy = -4;
            this.vx = 0;
        }

        // KINDA LEFT
        if (this.actions.a || this.actions.A) {
            this.vx = 3;            
        }
                
        // LEFT       
        if ((this.actions.a || this.actions.A)  && (this.actions.w || this.actions.W)) {  
            this.vy = -3;
            this.vx = 4;           
        }
        
        // KINDA RIGHT
        if (this.actions.d || this.actions.D) {    
            this.vx = -3;       
        } 

        // RIGHT
        if ((this.actions.d || this.actions.D) && (this.actions.w || this.actions.W)) {        
            this.vy = -3;
            this.vx = -4;         
        } 
        
        // JUMP 
        if (this.actions.Enter) { 
            this.vy = -6; 
        }         

        // SHOOT
        if (this.actions.CapsLock){
            this.player.shoot();
        }
    }
    
    checkCollisions() {
        const lifes = document.querySelectorAll('.life');
		const lifesLength = lifes.length;
        const heartsContainer = document.getElementsByClassName('hearts-container');
        

        this.frequentObs.forEach(obs => {

            if (obs.collide(this.player) && !obs.collided) {
                obs.collided = true;

                if (obs.type === 'rainbowRamp'){
     
                    this.player.invencible = true
                    this.vy = -8;

                    setTimeout(() => {
                        this.player.invencible = false
                        this.vy = -4;
                    }, 2000)
                }  
                
                if (obs.type !== 'rainbowRamp') {
                    this.vy = 0;
                    this.vx = 0;
                    this.hitObstacle = true;
                    lifes[lifes.length - 1].remove();
                    this.player.playerReceiveDamage(1);

                    if (this.player.health < 1) {
                       this.gameOver();
                    } else {
                            setTimeout(() => {
                               this.vy = -4;
                            }, 200)
                    }
                }               
            }
        })
    
        this.notFrequentObs.forEach(obs => {     
            
            if (obs.collide(this.player) && !obs.collided) {
                obs.collided = true;

                if (obs.collide(this.player)) {
                    
                    if (obs.type === 'rainbowRamp'){
                        this.player.invencible = true
                        this.vy = -8;

                        setTimeout(() => {
                            this.player.invencible = false;
                            this.vy = -4;
                        }, 1000)
                    }                       
                
                    if (obs.type !=='rainbowRamp') {   
                        this.vy = 0;
                        this.vx = 0;
                        this.hitObstacle = true;
                        lifes[lifes.length - 1].remove();
                        this.player.playerReceiveDamage(1);

                        if (this.player.health < 1) {
                            this.gameOver();
                        } else {
                            setTimeout(() => {
                                this.vy = -4;
                            }, 200)
                        }   
                    }
                }
            } 
        })

        this.enemies.forEach(enemy => {

            if (enemy.collide(this.player)){   
                /*while (lifes.length > 0) {
                    lifes[lifesLength -1].remove()
                }
                */
                this.player.playerReceiveDamage(4);
                this.gameOver();
            }        

            this.player.snowballs.forEach((snowball, index) => {
    
                if (enemy.collide(snowball) && !snowball.collided) {
                    snowball.collided = true;
                    this.player.snowballs.splice(index, 1);
                    enemy.enemyReceiveDamage(1);         
                    this.killedYeti = true;                        
                    this.deadYetis ++;
                }
            })
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

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
}