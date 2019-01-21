const {keypress} = require('./game')

export const onKeyDown = function (event, keypress) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
      case 32: // space
        keypress.jump = true;
        break;
      case 37: // left
      case 65: // a
      keypress.left = true;
        break;
      case 40: // down
      case 83: // s
      // keypress.space = true;
        break;
      case 39: // right
      case 68: // d
      keypress.right = true;
        break;
      
      default:
        break;
    }
  };

//   if((this.gameView.heroSprite.position.y - 0.3) <= (this.gameView.heroGroundedY )){
//     this.jumping=false;
//     this.canDoubleJump = true;
//     this.jumpForce=(Math.random()*0.005)+0.012; 
//   } 
//   // if 
//   // (!this.jumping || this.canDoubleJump) 
//       // (true){ 
//       if ( this.keypress.jump && !this.jumping ) {//up, jump
        
//         this.keypress.jump = false
//         this.jumpForce = 0.2;
//         // this.gameView.heroSprite.position.y += this.jumpForce;
//         this.jumping=true;
//       }

//       if (this.keypress.jump && this.jumping && this.canDoubleJump){
//         this.keypress.jump = false
//         this.jumpForce = 0.15;
//         // this.gameView.heroSprite.position.y += this.jumpForce;
//         this.canDoubleJump = false
//       }
