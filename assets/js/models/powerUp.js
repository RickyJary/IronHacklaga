class PowerUp extends Enemy {
  constructor(board, type) {
    super(board)
    this.width = 30;
    this.height = 30;
    this.y = this.board.clientHeight;
    this.x = Math.random() * this.board.clientWidth;
    this.vy = -8;
    this.type = type;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    switch (this.type) {
      case "speed":
        this.element.classList.add("blue-buff");
        this.element.style.background =
          `url('/assets/img/speed.png') center / contain no-repeat, 
           radial-gradient(circle, rgba(63, 206, 251, 1) 0%, rgba(238, 252, 255, 1) 100%)`;
        break;
      case "life":
        this.element.classList.add("red-buff");
        this.element.style.background =
          `url('/assets/img/player.png') center / contain no-repeat, 
           radial-gradient(circle, rgba(251, 63, 63, 1) 0%, rgba(255, 238, 238, 1) 100%)`;
        break;
      case "rate":
        this.element.classList.add("green-buff");
        this.element.style.background =
          `url('/assets/img/rockets.gif') center / contain no-repeat, 
           radial-gradient(circle, rgba(63,251,66,1) 0%, rgba(238,255,250,1) 100%)`;
        break;
      default:
        this.element.style.backgroundColor = "yellow";
    }
    this.board.appendChild(this.element);
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

  }

  move() {
    this.y += this.vy;
  }
}