class LiveCounter {
  constructor(board, lives) {
    this.lives = lives;
    this.board = board;

    this.shield = document.createElement("div");
    this.shield.style.position = "absolute";
    this.shield.className = "shield";
    this.shield.style.width = "30px";
    this.shield.style.height = "30px";
    this.shield.style.zIndex = "10";
    this.shield.style.backgroundImage = "url('./assets/img/player.png')";
    this.shield.style.backgroundSize = "cover";
    this.shield.style.backgroundPosition = "center";
    this.shield.style.backgroundColor = "transparent";
  }

  draw() {
    const shields = this.board.querySelectorAll(".shield");

    shields.forEach((shield) => {
      shield.remove();
    });

    Array(this.lives)
      .fill("x")
      .forEach((_, index) => {
        this.shield.style.left = `${(index + 1) * 50}px`;
        this.shield.style.top = "20px";

        this.board.appendChild(this.shield.cloneNode());
      });
  }
}
