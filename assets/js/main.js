window.addEventListener("load", function(){
    const startButton = document.querySelector("#start-btn");
    const board = document.querySelector("#game-board");
    const restartButton = document.querySelector("#restart-btn");
    const bgAudio = document.querySelector("#bg-sound")
    
    startButton.addEventListener("click", function(){
        startButton.style.display = "none";
        const game = new Game(board);
        game.start();
        bgAudio.play();
    })

    restartButton.addEventListener("click", function(){
        console.log("restartea<ndo")
        restartButton.style.display = "none";
        const game = new Game(board);
        game.start();
        restartButton.style.display = "flex";
        bgAudio.play();
    })

})