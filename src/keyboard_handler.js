const {keypress} = require('./game')

export const onKeyDown = function (event, keypress) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        
        keypress.jump = true;
        // console.log("pressed jump", keypress.jump)
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
      case 32: // space
      keypress.space = true;
        
        break;
      default:
        break;
    }
  };

export const onKeyUp = function (event) {
    // switch (event.keyCode) {
    //   case 38: // up
    //   case 87: // w
    //     moveForward = false;
    //     break;
    //   case 37: // left
    //   case 65: // a
    //     moveLeft = false;
    //     break;
    //   case 40: // down
    //   case 83: // s
    //     moveBackward = false;
    //     break;
    //   case 39: // right
    //   case 68: // d
    //     moveRight = false;
    //     break;
    //   default:
    //     break;
    // }
  };