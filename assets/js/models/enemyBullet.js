class EnemyBullet extends Bullet {
  constructor(board, x, y = 0) {
    super(board, x, y);
    this.width = 20;
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = "url('./assets/img/fireball.gif')";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";


  }
  move(y, vy) {
    this.y -= this.vy;
  }
  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
    this.board.appendChild(this.element);
  }

}
