const Game = require("./game");
const GameView = require("./game_view");
// const Background = require("./background");

document.addEventListener("DOMContentLoaded", () => {
  const gameEl = document.getElementsByClassName("Main-Game");


  let game;
  // const bg = new Background()
  // const splashBackground = setInterval(bg.draw, 40);
  document.getElementById('play_text').innerHTML = 'PLAY'
  document.getElementById('title_text').innerHTML = 'CODER RUN'
  document.getElementById('instructions_text').addEventListener('click', () => {
    instructions_text.innerHTML = 
        `After studying exessively for exams, Max is trapped in the nightmare world of Coder Run <br> <br>
         Help Max escape the gauntlet of buggy code!`})
  
  document.getElementById('keys').addEventListener('click', () => {
    keys.innerHTML = '<br> Use arrow keys or WASD to move, <br> pressing up twice performs a double jump. <br>  Bugs make you drowsy, Coffee wakes you up!'
  })

  document.getElementById('play_btn').addEventListener('click', () => {   
    if (game) {
      game.clearGame()
    }
    
    document.getElementById('splash').style.visibility = 'hidden';
    game = new Game();
    game.start();
  })

  document.getElementById('diff').addEventListener('click', () => {   
    document.getElementById('diff').style.visibility = 'hidden'
    var items = document.getElementsByClassName('diff-settings');
      for (var i=0; i < items.length; i++) {
        items[i].style.visibility = 'visible';
      }  
  })
  document.getElementById('diff-div').addEventListener('click', () => {   
    document.getElementById('diff').style.visibility = 'visible'
    var items = document.getElementsByClassName('diff-settings');
      for (var i=0; i < items.length; i++) {
        items[i].style.visibility = 'hidden';
      }  
  })

 
  
});
