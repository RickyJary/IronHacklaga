class Game {
    constructor(board) {
        this.board = board;
        this.background = new Background(this.board);
        this.player = new Player(this.board);
        this.tick = 0;
        this.enemies = [];
        this.enemyTick = 100;
        this.powerUpTick = 600;
    }

    start () {
        this.interval = setInterval(() => {
            this.move();
            this.draw()
            
            this.tick++
            if (this.tick % this.enemyTick === 0) {
                this.enemies.push(new Enemy(this.board));}

            if (this.tick % this.powerUpTick === 0) {
                this.enemies.push(new PowerUp(this.board))
            }
        }, 1000/60);
        console.log(this.enemies)
    }

    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((enemy) => {
            enemy.move();
          });
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemies.forEach((enemy) => {
            enemy.draw();
          });
        
    }
}