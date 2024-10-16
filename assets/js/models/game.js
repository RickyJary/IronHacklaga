class Game {
    constructor(board) {
        this.board = board;
        this.background = new Background(this.board);
        this.player = new Player(this.board);
        this.tick = 0;
        this.enemies = [];
        this.asteroids = [];
        this.powerUps = [];
        this.enemyShootingTick = 200;
        this.enemyTick = 100;
        this.powerUpTick = 600;
        this.asteroidTick = 50;
        this.liveCounter = new LiveCounter(this.board, this.player.lives);
        this.gameOverBoard = document.querySelector("#game-over");
    }

    start () {
        this.gameOverBoard.style.display = "none";
        this.interval = setInterval(() => {
            this.move();
            this.draw();
            this.checkCollisions();
            
            this.tick++
            if (this.tick % this.enemyTick === 0) {
                this.enemies.push(new Enemy(this.board));}

            if (this.tick % this.powerUpTick === 0) {
                this.powerUps.push(new PowerUp(this.board))
            }

            if (this.tick % this.asteroidTick === 0) {
                this.asteroids.push(new Asteroid(this.board))
            }

            if(this.tick % this.enemyShootingTick === 0) {
                this.enemies.forEach((enemy) => {
                  enemy.shoot();
                })
            }

            

        }, 1000/60);
        
        this.liveCounter.draw();
       
    }

    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((enemy) => {
            enemy.move();
          });
        this.powerUps.forEach((power) => {
            power.move();
          });
        this.asteroids.forEach((asteroid) => {
          
            asteroid.move();
        })
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemies.forEach((enemy) => {
            enemy.draw();
          });
        this.powerUps.forEach((power) => {
            power.draw();
          });
        this.asteroids.forEach((asteroid) => {
            asteroid.draw();
        })
        
    }

    checkCollisions() {
        const enemy = this.enemies.find((enemy) => {
          return this.player.collideWith(enemy);
        });

        const power = this.powerUps.find((power) => {
            return this.player.collideWith(power);
        });

        const asteroid = this.asteroids.find((asteroid) => {
            return this.player.collideWith(asteroid);
        })
    
        if (enemy) {
          this.enemies = this.enemies.filter(
            (enemyFromArr) => enemyFromArr !== enemy
          );
          enemy.element.remove();
          this.player.lives -= 1;
          this.liveCounter.lives = this.player.lives;
          this.liveCounter.draw();
    
          if (this.player.lives === 0) {
            window.clearInterval(this.interval);
            this.gameOverBoard.style.display = "flex";
          }
        }

        if (asteroid) {
          this.asteroids = this.asteroids.filter(
            (asteroidFromArr) => asteroidFromArr !== asteroid
          );
          asteroid.element.remove();
          this.player.lives -= 1;
          this.liveCounter.lives = this.player.lives;
          this.liveCounter.draw();
    
          if (this.player.lives === 0) {
            window.clearInterval(this.interval);
            this.gameOverBoard.style.display = "flex";
          }
        }

        if (power) {
          this.powerUps = this.powerUps.filter(
            (powerFromArr) => powerFromArr !== power
          );
          power.element.remove();
          ////////////////////////FALTA POR PONER LOS TIPOS DE POWERUP, CONDICIONES Y EFECTOS////////////////
        }
    
        this.player.bullets.find((bullet) => {
          const enemyCollided = this.enemies.find((enemy) => {
            return bullet.collideWith(enemy);
          });
    
          if (enemyCollided) {
            enemyCollided.element.remove();
            this.enemies = this.enemies.filter(
              (enemyFromArr) => enemyFromArr !== enemyCollided
            );
    
            bullet.element.remove();
            this.player.bullets = this.player.bullets.filter(
              (bulletFromArr) => bulletFromArr !== bullet
            );
          }
        });


        const enemiesBullets = []
        this.enemies.forEach(enemy => enemiesBullets.push(...enemy.enemyBullets))
        const collidedBullet = enemiesBullets.find(bullet => this.player.collideWith(bullet))
        if (collidedBullet) {
          this.enemies.forEach(enemy => {
            enemy.enemyBullets = enemy.enemyBullets.filter(bullet => bullet !== collidedBullet);
          });

          if (collidedBullet.element) {
            collidedBullet.element.remove();
          }
          this.player.lives -= 1;
          this.liveCounter.lives = this.player.lives;
          this.liveCounter.draw();
    
          if (this.player.lives === 0) {
            window.clearInterval(this.interval);
            this.gameOverBoard.style.display = "flex";
          }
        }
        
    
      }
}