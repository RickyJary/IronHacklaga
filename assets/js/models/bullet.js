class Bullet {
  constructor(board, x, y) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 30;
    this.vy = 15;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = "url('./assets/img/missile.gif')"
    this.element.style.backgroundSize = "cover"
    this.element.style.backgroundPosition = "center";


    this.board.appendChild(this.element);
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

  }

  move(y, vy) {
    this.y += this.vy;
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