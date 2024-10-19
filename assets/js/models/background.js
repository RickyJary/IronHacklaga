class Background {
    constructor(board, speedFactor = 1) {
      this.board = board;
      this.speedFactor = speedFactor;
      this.x = 0;
      this.y = 0;
      this.width = this.board.clientWidth;
      this.height = this.board.clientHeight;
  
      this.image1 = document.createElement("img"); // === new Image();
      this.image1.src = "/assets/img/newbg.png";
      this.image1.style.position = "absolute";
  
      this.image2 = document.createElement("img"); // === new Image();
      this.image2.src = "/assets/img/newbg.png";
      this.image2.style.position = "absolute";
    }
  
    draw() {
      this.image1.style.width = this.width + "px";
      this.image1.style.height = this.height + "px";
  
      this.image1.style.left = this.x + "px";
      this.image1.style.bottom = this.y + "px";
  
      this.image2.style.width = this.width + "px";
      this.image2.style.height = this.height + "px";
  
      this.image2.style.left = this.x + "px";
      this.image2.style.bottom = this.y + this.height + "px";
  
      this.board.appendChild(this.image1);
      this.board.appendChild(this.image2);
    }

    move () {
        this.y -= this.speedFactor;
        if(this.y <= -this.height ){
            this.y = 0;
        }
    }
}  