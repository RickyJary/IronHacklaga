class PowerUp extends Enemy {
    constructor(board){
        super(board)
        this.width = 30;
        this.height = 30;
        this.y = this.board.clientHeight;
        this.x = Math.random() * this.board.clientWidth;
        this.vy = -10;
    
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.backgroundColor = "yellow";
    }

draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
  }

  move() {
    this.y += this.vy;
  }
}