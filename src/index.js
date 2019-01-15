const Game = require("./game");
const GameView = require("./game_view");
// const Background = require("./background");

document.addEventListener("DOMContentLoaded", () => {
  const gameEl = document.getElementsByClassName("Main-Game");


  let game;
  // const bg = new Background()
  // const splashBackground = setInterval(bg.draw, 40);
  document.getElementById('play_text').innerHTML = 'Play'
  document.getElementById('title_text').innerHTML = 'Coder Run'
  document.getElementById('instructions_text').addEventListener('mouseover', () => {
    instructions_text.innerHTML = 
        `Inspired by a Software engineers nightmare <br> <br>
         more dramatic effect coming... <br> <br>
         I promise`})
  
  document.getElementById('keys').addEventListener('mouseover', () => {
    keys.innerHTML = '<br> <br> <br> <br> Use the right arrow/left arrow to move <br> <br> up to jump and up/up to double jump <br> <br> space to toggle music'
  })
  
  document.getElementById('play_btn').addEventListener('click', () => {   
    if (game) {
      game.clearGame()
    }
    
    document.getElementById('splash').style.visibility = 'hidden';

    game = new Game();
    game.start();
    
   

  })

 
  
});
