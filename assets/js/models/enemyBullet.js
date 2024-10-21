class EnemyBullet extends Bullet {
  constructor(board, x, y) {
    super(board, x, y);
    this.width = 20;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";

    this.element.style.backgroundImage = "url('/assets/img/fireball.gif')";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
  }
  move(y, vy) {
    this.y -= this.vy;
  }
}
