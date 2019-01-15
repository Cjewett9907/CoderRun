const Game = require("./game");
const GameView = require("./game_view");
// const Background = require("./background");

document.addEventListener("DOMContentLoaded", () => {
  const gameEl = document.getElementsByClassName("Main-Game");


  let game;
  // const bg = new Background()
  // const splashBackground = setInterval(bg.draw, 40);
  document.getElementById('play_text').innerHTML = 'Play'
  document.getElementById('title_txt').innerHTML = 'Coder Run'
  document.getElementById('instructions_text').innerHTML = 
        `Inspired by a Software engineers nightmare <br> <br>
         more dramatic effect coming... <br> <br>
         I promise`

  document.getElementById('play_btn').addEventListener('click', () => {   
    if (game) {
      game.clearGame()
    }
    document.getElementById('splash').style.visibility = 'hidden';
    // clearInterval(splashBackground)

    game = new Game();
    game.start();


  })

 
  
});
