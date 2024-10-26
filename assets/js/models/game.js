class Game {
  constructor(board, isHardMode = false) {
    this.board = board;
    this.isHardMode = isHardMode;
    this.tickRate = 1;
    this.background = new Background(this.board);
    this.player = new Player(this.board);
    this.tick = 0;
    this.enemies = [];
    this.asteroids = [];
    this.powerUps = [];
    this.enemyShootingTick = 200;
    this.enemyTick = 200;
    this.powerUpTick = 400;
    this.asteroidTick = 100;
    this.cleanUpTick = 333;
    this.score = 0;

    this.liveCounter = new LiveCounter(this.board, this.player.lives);
    this.gameOverBoard = document.querySelector("#game-over");
    this.bgAudio = document.querySelector("#bg-sound")
    this.gameOverSound = document.querySelector("#game-over-sound")
    this.xplosound = document.querySelector("#xplosound")
    this.scoreBoard = document.querySelector("#score")
  }

  start() {
    this.gameOverSound.pause();
    this.bgAudio.currentTime = 0;
    this.bgAudio.play();
    this.gameOverBoard.style.display = "none";
    this.interval = setInterval(() => {
      console.log(this.enemies)
      this.move();
      this.draw();
      this.checkCollisions();

      this.tick++;
      if(this.tick % this.cleanUpTick === 0){
        this._cleanup();
      }
      this.score = this.tick;
      if (this.tick % Math.floor(this.enemyTick / this.tickRate) === 0) {
        this.enemies.push(new Enemy(this.board));
      }

      if (this.tick % this.powerUpTick === 0) {

        const types = ["speed", "life", "rate"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        this.powerUps.push(new PowerUp(this.board, randomType));

      }

      if (this.tick % Math.floor(this.asteroidTick / this.tickRate) === 0) {
        this.asteroids.push(new Asteroid(this.board));
      }

      if (
        this.tick % Math.floor(this.enemyShootingTick / this.tickRate) === 0
      ) {
        this.enemies.forEach((enemy) => {
          enemy.shoot();
        });
      }

      const limit = this.isHardMode ? 7 : 5;
      if (this.tick % 1000 === 0) {
        if (this.tickRate < limit) {
          this.tickRate += this.isHardMode ? 0.5 : 0.2;
        }
      }

      this.scoreBoard.innerHTML = `Your Score: ${this.score}`
    }, 1000 / 60);

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
    });
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
    });
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
    });

    if (enemy) { 
      enemy.enemyBullets.forEach((enemyBullet) => {
        enemyBullet.element.remove();
      });
      this.enemies = this.enemies.filter(
        (enemyFromArr) => enemyFromArr !== enemy
      );
      enemy.element.remove();
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        this.gameOver();
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
        this.gameOver();
      }
    }

    if (power) {

      this.powerUps = this.powerUps.filter(
        (powerFromArr) => powerFromArr !== power

      );

      power.element.remove();
      switch (power.type) {
        case "speed":
          this.player.vy += 2;
          this.player.vx += 2;
          break;
        case "life":
          this.player.lives += 1;
          this.liveCounter.lives = this.player.lives;
          this.liveCounter.draw();

          break;
        case "rate":
          this.player.shootingRate -= 100;
          break;
        default:
          console.log("Tipo de power-up no reconocido");
      }
    }

    this.player.bullets.find((bullet) => {
      const enemyCollided = this.enemies.find((enemy) => {
        return bullet.collideWith(enemy);
      });

      if (enemyCollided) {
        enemyCollided.element.style.backgroundImage =
          "url('/assets/img/xplosion.gif')";
          this.xplosound.currentTime = 24.9;
          this.xplosound.volume = 1;
          this.xplosound.play();


          setTimeout(() => {
            this.enemies = this.enemies.filter(
              (enemyFromArr) => enemyFromArr !== enemyCollided
            );
            enemyCollided.element.remove();
            enemyCollided.enemyBullets.forEach((enemyBullet) => {
              enemyBullet.element.remove();
            });
            this.xplosound.pause();
      
          }, 600);

        bullet.element.remove();
        this.player.bullets = this.player.bullets.filter(
          (bulletFromArr) => bulletFromArr !== bullet
        );
        this.tick += 100;
      }
    });

    const enemiesBullets = [];
    this.enemies.forEach((enemy) => enemiesBullets.push(...enemy.enemyBullets));
    const collidedBullet = enemiesBullets.find((bullet) =>
      this.player.collideWith(bullet)
    );
    if (collidedBullet) {
      this.enemies.forEach((enemy) => {
        enemy.enemyBullets = enemy.enemyBullets.filter(
          (bullet) => bullet !== collidedBullet
        );
        collidedBullet.element.remove();
      });

      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    clearInterval(this.interval);
    this.bgAudio.pause();
    
    this.player.actions.canShoot = false;
    this.gameOverSound.currentTime = 15;
    this.gameOverSound.play();


    document.dispatchEvent(
      new CustomEvent("game-over", {
        detail: {
          score: this.score,
        },
      })
    );
  }

_cleanup(){
  const boardWidth = this.board.clientWidth;
  const boardHeight = this.board.clientHeight;

  this.enemies = this.enemies.filter((enemy) => {
    const isOutOfBounds =
      enemy.x + enemy.width < 0 || 
      enemy.x > boardWidth ||      
      enemy.y + enemy.height < 0 ||
      enemy.y > boardHeight;  

    if (isOutOfBounds) {
      enemy.element.remove(); 
      return false;           
    } else {
      return true;            
    }
  });

  this.asteroids = this.asteroids.filter((asteroid) => {
    const isOutOfBounds =
      asteroid.x + asteroid.width < 0 ||
      asteroid.x > boardWidth ||         
      asteroid.y + asteroid.height < 0 ||
      asteroid.y > boardHeight;         

    if (isOutOfBounds) {
      asteroid.element.remove()
      return false;            
    } else {
      return true;             
    }
  });

  this.player.bullets = this.player.bullets.filter((bullet) => {
    const isOutOfBounds =
      bullet.x + bullet.width < 0 || 
      bullet.x > boardWidth ||        
      bullet.y + bullet.height < 0 || 
      bullet.y > boardHeight;         

    if (isOutOfBounds) {
      bullet.element.remove(); 
      return false;           
    } else {
      return true;             
    }
  });

  this.enemies.forEach((enemy) => {
    enemy.enemyBullets = enemy.enemyBullets.filter((bullet) => {
      const isOutOfBounds =
        bullet.x + bullet.width < 0 || 
        bullet.x > boardWidth ||       
        bullet.y + bullet.height < 0 || 
        bullet.y > boardHeight;       

      if (isOutOfBounds) {
        bullet.element.remove(); 
        return false;   
      } else {
        return true;  
      }
    });
  });
}
}