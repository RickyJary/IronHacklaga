class Enemy {
  constructor(board) {
    this.board = board;
    this.width = 60;
    this.height = 80;
    this.y = this.board.clientHeight;
    this.x = (Math.random() * this.board.clientWidth) - this.width;
    this.vy = -2;
    this.enemyBullets = [];
    this.shootingAudio = document.querySelector("#enemy-shoot")
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = "url('/assets/img/enemy.png')"
    this.element.style.backgroundSize = "cover"
    this.element.style.backgroundPosition = "center";
    if (this.x < 0) {
      this.x = 0;
    }

  }
  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
    this.board.appendChild(this.element);
    this.enemyBullets.forEach((bullet) => {
      bullet.draw();
    });


  }

  move() {
    this.y += this.vy;

    this.enemyBullets.forEach((bullet) => {
      bullet.move()
    })
  }

  shoot() {

    this.enemyBullets.push(
      new EnemyBullet(
        this.board,
        this.x + this.width / 3,
        this.y + this.height / 3
      )
    )
    this.shootingAudio.play()
  }
}