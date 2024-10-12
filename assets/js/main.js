window.addEventListener("load", function(){
    const startButton = document.querySelector("#start-btn");
    const board = document.querySelector("#game-board");

    startButton.addEventListener("click", function(){
        startButton.style.display = "none";
        const game = new Game(board);
        game.start();
    })
})