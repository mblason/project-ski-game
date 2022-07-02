class Game {
    constructor(ctx) {
        this.ctx = ctx;        
        this.home = [];

        this.diffIndex = 0;
        this.difficulties = [
            { // RESTO 1 EN VELOCIDAD        
                vyDown: -3,
                vxKindaLeft: 2,
                vyLeft: -2,
                vxLeft: 3,
                vxKindaRight: -2,
                vyRight: -2,
                vxRight: -3,
                vyJump: -5,
                vyRampJump: -7                       
            },
            { //NORMAL
                vyDown: -4,
                vxKindaLeft: 3,
                vyLeft: -3,
                vxLeft: 4,
                vxKindaRight: -3,
                vyRight: -3,
                vxRight: -4,
                vyJump: -6,
                vyRampJump: -8
            },
            { // SUMO 2 EN VELOCIDADES
                vyDown: -7,
                vxKindaLeft: 5,
                vyLeft: -5,
                vxLeft: 6,
                vxKindaRight: -5,
                vyRight: -5,
                vxRight: -6,
                vyJump: -8,
                vyRampJump: -10 
            }
        ]
             
        this.scoreYetisStr = localStorage.getItem(SAVE_KEY_YETIS_SCORE);  
        this.highScoreDeadYetis = this.scoreYetisStr == null ? 0 : parseInt(this.scoreYetisStr);

        this.scoreDistanceStr = localStorage.getItem(SAVE_KEY_DISTANCE_SCORE);
        this.highScoreDistance = this.scoreDistanceStr == null ? 0 : parseInt(this.scoreDistanceStr);

        this.tickDistance = 0;
        this.distance = 0;    
        this.deadYetis = 0;

        this.backgrounds = [];
        this.tickBackground = 0;

        this.player = new Player(this.ctx, this);
        this.hitObstacle = false;
        this.hitRamp = false;
        this.hitSnowboard = false;

        this.enemies = [];
        this.enemyEatPlayer = false;
        this.minTime = 500;//180000; // 3 min en milisegundos
        this.maxTime = 2000;//300000; // 5 min en milisegundos
        this.randomAppearEnemy = Math.floor(Math.random() * (this.maxTime - this.minTime)) + this.minTime;
        this.tickAppearEnemy = 0; 

        this.frequentObs = [];
        this.notFrequentObs = [];
        this.tickFreqObs = 0;
        this.tickNotFreqObs = 0;       

        this.dogs = [];
        this.tickDog = 0;
        this.snowboards = [];    
        this.tickSnowboard = 0;

        this.intervalId = null;    
        
        this.actions = {
            ArrowDown: false, // down
            ArrowUp: false, // fullturn
            ArrowRight: false, // right
            ArrowLeft: false, // left
            ControlLeft: false, // jump
            Space: false // shoot
        }
        
        this.vy = 0;
        this.vx = 0;

        this.addHomeElements();
        this.setListenners();

        //SOUNDS
        //this.homeSound = new Audio();
        //this.homeSound.src = '/Sounds/home-sound.mp3';

        this.snowballSound = new Audio();
        this.snowballSound.src = '/Sounds/Snowball.mp3'
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
                         

            if (this.vy < 0 && this.vy > -8){
                this.tickDistance++; 
            }

            if (this.vy === -8){
                this.tickDistance += 5;
            }
                            
            if (this.tickDistance >= 100){
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

            if (this.tickDog == 3000){
                this.tickDog = 0;
                this.clearDog();
                this.addDog();
            }

            if (this.tickSnowboard == 2000){
                this.tickSnowboard = 0;
                this.clearSnowboard();
                this.addSnowboard();
            }

            if (this.tickAppearEnemy == this.randomAppearEnemy){ 
                this.tickAppearEnemy = 0;
                this.addEnemy();
            }

            if (this.tickAppearEnemy == 500){
                this.clearEnemies();
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
        this.dogs = this.dogs.filter(dog => dog.isVisible());
    }

    clearSnowboard() {
        this.snowboards = this.snowboards.filter(snowb => snowb.isVisible());
    }

    clearEnemies() {
        this.enemies = this.enemies.filter(enemy => enemy.isVisible());
    }

    draw() {       
        this.backgrounds.forEach(snow => snow.draw());
        this.frequentObs.forEach(obs => obs.draw());
        this.notFrequentObs.forEach(obs => obs.draw());
        this.player.draw();   
        this.home.forEach(el => el.draw());          
        this.dogs.forEach(dog => dog.draw());
        this.snowboards.forEach(snowb => snowb.draw());        
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
        this.dogs.push(new Dog(this.ctx, this))
    }

    addSnowboard() {
        this.snowboards.push(new Snowboard(this.ctx))
    }

    addEnemy() {
        const left = Math.random() > 0.5
        this.enemies.push(new Enemy(this.ctx, this, left))
    }

    move() {        
        this.applyActions();
        this.home.forEach(el => el.move());
        this.backgrounds.forEach(snow => snow.move());
        this.frequentObs.forEach(obs => obs.move());
        this.notFrequentObs.forEach(obs => obs.move());
        this.dogs.forEach(dog => dog.move());
        this.snowboards.forEach(snowb => snowb.move());

        this.enemies.forEach(enemy => enemy.move());
        this.player.move();

        if (this.vy == this.difficulties[this.diffIndex].vyJump && !this.player.isJumping){
            this.vy = this.difficulties[this.diffIndex].vyDown;
        }
    }

    setListenners() {
        document.onkeydown = e => this.switchActions(e.code, true);
        document.onkeyup = e => this.switchActions(e.code, false);
    }

    switchActions(code, bool) {
        if (!this.player.invencible) {
            this.actions[code] = bool;        
        }
    }

    applyActions() {    

        // DOWN    
        if (this.actions.ArrowDown && !this.player.invencible) {
            this.vy = this.difficulties[this.diffIndex].vyDown;
            this.vx = 0;
        }

        // KINDA LEFT
        if (this.actions.ArrowLeft && this.vy !==0) {
            this.vx = this.difficulties[this.diffIndex].vxKindaLeft;            
        }
                
        // LEFT       
        if (this.actions.ArrowLeft  && this.actions.ArrowUp && this.vy !==0) {  
            this.vy = this.difficulties[this.diffIndex].vyLeft;
            this.vx = this.difficulties[this.diffIndex].vxLeft;            
        }
        
        // KINDA RIGHT
        if (this.actions.ArrowRight && this.vy !==0) {    
            this.vx = this.difficulties[this.diffIndex].vxKindaRight;           
        } 

        // RIGHT
        if (this.actions.ArrowRight && this.actions.ArrowUp && this.vy !==0) {        
            this.vy = this.difficulties[this.diffIndex].vyRight; 
            this.vx = this.difficulties[this.diffIndex].vxRight;         
        } 
        
        // JUMP 
        if (this.actions.ControlLeft) { 
            this.vy = this.difficulties[this.diffIndex].vyJump; 
        }         

        // SHOOT
        if (this.actions.Space && !this.hitRamp){
            this.player.shoot();
        }
    }
    
    checkCollisions() {
        const lives = document.querySelectorAll('.life');
		const livesLength = lives.length;       

        this.frequentObs.forEach(obs => {

            if (obs.collide(this.player) && !obs.collided) {
                obs.collided = true;

                if (obs.type === 'rainbowRamp'){     
                    this.hitRamp = true;
                    this.player.invencible = true;
                    this.vy = this.difficulties[this.diffIndex].vyRampJump; 

                    setTimeout(() => {
                        this.hitRamp = false;
                        this.player.invencible = false;
                        this.vy = this.difficulties[this.diffIndex].vyDown; 
                    }, 2000)
                }  
                
                if (obs.type !== 'rainbowRamp' && !this.player.isJumping) {               
                    this.vy = 0;
                    this.vx = 0;
                    this.hitObstacle = true;
                    lives[livesLength - 1].remove();
                    this.player.playerReceiveDamage(1);

                    if (this.player.health < 1) {
                       this.gameOver();
                    } else {
                            setTimeout(() => {
                               this.vy = this.difficulties[this.diffIndex].vyDown;
                            }, 200)
                    }
                }       
                
                if (this.player.isJumping && (obs.type === 'cutTree' || obs.type === 'rock' || obs.type === 'rainbowRamp')){
                        this.player.invencible = true;
                        setTimeout(() => {
                            this.player.invencible = false;
                        }, 100)
                } else if (this.player.isJumping && (obs.type !== 'cutTree' || obs.type !== 'rock')) {
                    this.vy = 0;
                    this.vx = 0;
                    this.hitObstacle = true;
                    lives[livesLength - 1].remove();
                    this.player.playerReceiveDamage(1);

                    if (this.player.health < 1) {
                       this.gameOver();
                    } else {
                            setTimeout(() => {
                               this.vy = this.difficulties[this.diffIndex].vyDown;
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
                        this.hitRamp = true;
                        this.player.invencible = true
                        this.vy = this.difficulties[this.diffIndex].vyRampJump;

                        setTimeout(() => {
                            this.hitRamp = false;
                            this.player.invencible = false;
                            this.vy = this.difficulties[this.diffIndex].vyDown;
                        }, 1000)
                    }                       
                
                    if (obs.type !=='rainbowRamp') {   
                        this.vy = 0;
                        this.vx = 0;
                        this.hitObstacle = true;
                        lives[livesLength - 1].remove();
                        this.player.playerReceiveDamage(1);

                        if (this.player.health < 1) {
                            this.gameOver();
                        } else {
                            setTimeout(() => {
                                this.vy = this.difficulties[this.diffIndex].vyDown;
                            }, 200)
                        }   
                    }
                }
            } 
        })

        this.enemies.forEach((enemy) => {

            if (enemy.collide(this.player)){

                if (!enemy.isDead){           
                    this.enemyEatPlayer = true;     
                    this.player.playerReceiveDamage(4);
                    let lives = document.querySelectorAll('.life');
                    lives.forEach(heart => heart.remove());     
                    this.vy = 0;
                    this.vx = 0;
                    setTimeout(() => {
                        this.gameOver();
                    }, 850)         
                } 
                
                if (this.isDead){
                    this.enemyEatPlayer = false; 
                    this.player.invencible = true;
                    setTimeout(() => {
                        this.player.invencible = false;
                    }, 100)
                }
            }

            this.player.snowballs.forEach((snowball, index) => {
    
                if (enemy.collide(snowball) && !snowball.collided) {
                    snowball.collided = true;
                    this.player.snowballs.splice(index, 1);
                    

                    if (snowball.collided === true && !enemy.isDead && !this.enemyEatPlayer) {
                        this.snowballSound.play();
                        enemy.enemyReceiveDamage(1);
                        enemy.isDead = true;
                        this.deadYetis++;
                        const deadYetiContainer = document.querySelector('.count-yetis-killed');
                        deadYetiContainer.textContent = this.deadYetis;  
                    }
                } 
            })                     
        })

        this.snowboards.forEach((man) => {            
            if (man.collide(this.player)){
                this.vy = 0;
                this.vx = 0;
                this.hitSnowboard = true;
                
                setTimeout(() => {
                    this.vy = this.difficulties[this.diffIndex].vyDown;
                }, 500)
            }   
        })
    }
 
    gameOver() {         
        clearInterval(this.intervalId);
        this.intervalId = null; 

        //UBICO Y HAGO VISIBLE EL GAME OVER CONTAINER
        const gameOverContainer = document.getElementById('game-over-container');
        gameOverContainer.classList.remove('invisible');

        //UBICO E IMPRIMO LOS SCORES FINALES
        const finalYetisKilled = document.querySelector('.final-yetis-killed');
        finalYetisKilled.textContent = this.deadYetis;

        const finalDistanceTraveled = document.querySelector('.final-distance');
        finalDistanceTraveled.textContent = this.distance;

        //UBICO E IMPRIMO LOS BEST SCORES    

        if (this.deadYetis > this.highScoreDeadYetis){
            this.highScoreDeadYetis = this.deadYetis;
            localStorage.setItem(SAVE_KEY_YETIS_SCORE, this.highScoreDeadYetis);
        }    

        const bestYetisKilled = document.querySelector('.best-yetis-killed');
        bestYetisKilled.textContent = this.highScoreDeadYetis;

        if (this.distance > this.highScoreDistance){
            this.highScoreDistance = this.distance;
            localStorage.setItem(SAVE_KEY_DISTANCE_SCORE, this.highScoreDistance); 
        }
        
        const bestDistance = document.querySelector('.best-distance');
        bestDistance.textContent = this.highScoreDistance;      
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

}

