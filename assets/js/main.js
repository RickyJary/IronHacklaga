window.addEventListener("load", function () {
  let game;

  const startButton = document.querySelector("#start-btn");
  const startButton2 = document.querySelector("#start-btn2");
  const board = document.querySelector("#game-board");
  const restartButton = document.querySelector("#restart-btn");
  const restartButton2 = document.querySelector("#restart-btn2");

  const form = document.querySelector("#score-submit");
  const highscore = document.querySelector("#highscore");
  const gameOverBoard = document.querySelector("#game-over");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const gameScore = game.score;
    const dataToSave = {
      ...Object.fromEntries(formData),
      score: gameScore,
    };
    let storedData = JSON.parse(localStorage.getItem("scoreData")) || [];
    storedData.push(dataToSave);
    storedData.sort((a, b) => b.score - a.score);
    storedData = storedData.slice(0, 3);
    localStorage.setItem("scoreData", JSON.stringify(storedData));
    form.classList.add("hidden");
    renderHighScores();
    highscore.classList.remove("hidden");
  });

  function renderHighScores() {
    const storedData = JSON.parse(localStorage.getItem("scoreData")) || [];
    const highscoreBoard = document.querySelector("#highscore-board");

    highscoreBoard.innerHTML = "";
    storedData.forEach((data, index) => {
      const scoreElement = document.createElement("div");
      scoreElement.textContent = `${index + 1}. ${data.name}: ${data.score}`;
      highscoreBoard.appendChild(scoreElement);
    });
  }

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
  //     localStorage.setItem('scoreData', JSON.stringify(dataArr))
  // })

  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    highscore.classList.add("hidden");
    game = new Game(board);
    game.start();
    listenGameOver();
  });

  startButton2.addEventListener("click", function () {
    startButton2.style.display = "none";
    highscore.classList.add("hidden");
    game = new Game(board, true);
    game.start();
    listenGameOver();
  });

  restartButton.addEventListener("click", function () {
    restartButton.style.display = "none";
    highscore.classList.add("hidden");
    game = new Game(board);
    game.start();
    listenGameOver();
    restartButton.style.display = "flex";
  });

  restartButton2.addEventListener("click", function () {
    restartButton.style.display = "none";
    highscore.classList.add("hidden");
    game = new Game(board, true);
    game.start();
    listenGameOver();
    restartButton.style.display = "flex";
  });

  function listenGameOver() {
    document.addEventListener("game-over", (event) => {
      let storedData = JSON.parse(localStorage.getItem("scoreData")) || [];

      const isHighScore =
        storedData.length < 3 ||
        event.detail.score > storedData[storedData.length - 1].score;

      if (isHighScore) {
        form.classList.remove("hidden");
      } else {
        form.classList.add("hidden");
        renderHighScores();
        highscore.classList.remove("hidden");
      }
      gameOverBoard.style.display = "flex";
    });
  }
 
});
