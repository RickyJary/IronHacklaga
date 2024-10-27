class Player {
  constructor(board) {
    this.board = board
    this.width = 40;
    this.height = 60;
    this.y = 0;
    this.x = 320;
    this.vy = 7;
    this.vx = 7;
    this.bullets = [];
    this.lives = 3;
    this.shootingSound = document.querySelector("#player-shoot")
    this.shootingRate = 1000;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.className = "player";
    this.element.style.backgroundImage = "url('/assets/img/player.gif')"
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundColor = "transparent"

    this.setListeners();
    this.actions = {
      up: false,
      down: false,
      left: false,
      right: false,
      canShoot: true
    };
  }

  move() {
    if (this.actions.up) {
      this.y += this.vy;
    } else if (this.actions.down) {
      this.y -= this.vy;
    }

    if (this.actions.left) {
      this.x -= this.vx;
    } else if (this.actions.right) {
      this.x += this.vx;
    }

    if (this.x < 0) {
      this.x = this.board.clientWidth;
    }

    if (this.x > this.board.clientWidth) {
      this.x = 0;
    }

    if (this.y > this.board.clientHeight) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.y = this.board.clientHeight;
    }


    this.bullets.forEach((bullet) => {
      bullet.move()
    })
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);

    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  shoot() {
    if (this.actions.canShoot) {
      const shootingSound = new Audio(this.shootingSound.src);
      shootingSound.play();
      this.bullets.push(
        new Bullet(
          this.board,
          this.x + this.width / 2.5,
          this.y + this.height / 2.5
        )

      );

      this.actions.canShoot = false;


      setTimeout(() => {
        this.actions.canShoot = true;
      }, this.shootingRate);
    }


  }

  setListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.actions.up = true;
          break;
        case "ArrowDown":
          this.actions.down = true;
          break;
        case "ArrowLeft":
          this.actions.left = true;
          break;
        case "ArrowRight":
          this.actions.right = true;
          break;
        case " ":
          this.shoot();
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.actions.up = false;
          break;
        case "ArrowDown":
          this.actions.down = false;
          break;
        case "ArrowLeft":
          this.actions.left = false;
          break;
        case "ArrowRight":
          this.actions.right = false;
          break;
      }
    });
  }
  collideWith(entity) {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.height + this.y > entity.y
    );
  }


}
