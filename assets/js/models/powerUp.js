class PowerUp extends Enemy {
    constructor(board, type){
        super(board)
        this.width = 30;
        this.height = 30;
        this.y = this.board.clientHeight;
        this.x = Math.random() * this.board.clientWidth;
        this.vy = -10;
        this.type = type;
    
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        switch (this.type) {
          case "speed":
              this.element.style.backgroundColor = "blue";
              break;
          case "life":
              this.element.style.backgroundColor = "red";
              break;
          case "rate":
              this.element.style.backgroundColor = "green";
              break;
          default:
              this.element.style.backgroundColor = "yellow";
      }
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