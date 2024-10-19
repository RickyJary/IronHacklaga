window.addEventListener("load", function(){
    let game;

    const startButton = document.querySelector("#start-btn");
    const startButton2 = document.querySelector("#start-btn2")
    const board = document.querySelector("#game-board");
    const restartButton = document.querySelector("#restart-btn");
    const restartButton2 = document.querySelector("#restart-btn2");
    const bgAudio = document.querySelector("#bg-sound")
    const form = document.querySelector("#score-submit")
    const highscore = document.querySelector("#highscore")
    const gameOverBoard = document.querySelector("#game-over");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        
        const formData = new FormData(form);
        const gameScore = game.score;
        const dataToSave = {
            ...Object.fromEntries(formData),
            score: gameScore
        };
        console.log(gameScore)
        let storedData = JSON.parse(sessionStorage.getItem('scoreData')) || [];
        storedData.push(dataToSave);
        storedData.sort((a, b) => b.score - a.score);
        storedData = storedData.slice(0, 3);
        sessionStorage.setItem('scoreData', JSON.stringify(storedData));
    });

    // form.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(form);
    //     const dataArr = [];
    //     const dataToSave = {
    //         ...Object.fromEntries(formData),
    //         score: 0
    //     }
    //     if(dataArr.length < 3) {
    //         dataArr.push(dataToSave)
    //     }
    //     sessionStorage.setItem('scoreData', JSON.stringify(dataArr))
    // })
    
    startButton.addEventListener("click", function(){
        startButton.style.display = "none";
        game = new Game(board);
        game.start();
        listenGameOver();
        bgAudio.play();
    })

    startButton2.addEventListener("click", function(){
        startButton2.style.display = "none";
        game = new Game(board, true);
        game.start();
        listenGameOver();
        bgAudio.play();
    })



    restartButton.addEventListener("click", function(){
        restartButton.style.display = "none";
        game = new Game(board);
        game.start();
        listenGameOver();
        restartButton.style.display = "flex";
        bgAudio.currentTime = 0;
        bgAudio.play();
    })

    restartButton2.addEventListener("click", function(){
        restartButton.style.display = "none";
        game = new Game(board, true);
        game.start();
        listenGameOver();
        restartButton.style.display = "flex";
        bgAudio.currentTime = 0;
        bgAudio.play();
    })

    function listenGameOver() {
        document.addEventListener('game-over', (event) => {
            console.log(event.detail);

            
            
            if (event.detail.score < 100) {
                form.classList.add('hidden');
            }

            gameOverBoard.style.display = "flex";
        })
    }
})