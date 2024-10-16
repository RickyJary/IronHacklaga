window.addEventListener("load", function(){
    const startButton = document.querySelector("#start-btn");
    const board = document.querySelector("#game-board");
    const restartButton = document.querySelector("#restart-btn");
    
    startButton.addEventListener("click", function(){
        startButton.style.display = "none";
        const game = new Game(board);
        game.start();
    })

    restartButton.addEventListener("click", function(){
        restartButton.style.display = "none";
        const game = new Game(board);
        game.start();
    })
})