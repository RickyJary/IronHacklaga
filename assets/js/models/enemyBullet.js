class EnemyBullet extends Bullet {
    super(board, x, y) {
      


      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.backgroundColor = "red";
    }
    move(y, vy) {
        this.y -= this.vy;
    }
}