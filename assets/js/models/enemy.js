class Enemy {
    constructor(board){
        this.board = board;
        this.width = 80;
        this.height = 50;
        this.y = this.board.clientHeight;
        this.x = Math.random() * this.board.clientWidth;
        this.vy = -2;
        this.enemyBullets = [];

        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.backgroundColor = "green";
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

        this.enemyBullets.forEach((bullet) =>{
          bullet.move()})
      }

      shoot() {
          
          this.enemyBullets.push(
            new EnemyBullet(
              this.board,
              this.x + this.width / 2,
              this.y + this.height / 2
            )
          )
        
    }
}