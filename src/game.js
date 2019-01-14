// const BugManager = require('./bug_manager')
const t = require('three')
const World = require('./world')
const GameView = require('./game_view')
const Collision = require('./collision')
const keyboardHandler = require('./keyboard_handler')
// const Enemy = require('./enemy')
const Enemy2 = require('./enemy2')
const Effects = require('./special_effects')


class Game {

	constructor(){
		this.bounceValue = 0 
		this.gravity = 0.01; 
		this.score = 0;    
		this.notHitTime = new t.Clock();
		this.sphericalHelper = new t.Spherical();
		this.pathAngleValues=[1.52,1.57,1.62];
		this.jumping = false;
		// this.stats = 0;
		// this.player = player;
		this.gameOver = false;
    this.paused = false;
    this.validMove = true;
    this.gameView = new GameView();
    this.keypress = { jump: false, left: false, right: false, attack: false }
    this.col = new Collision();
    // console.log(this.gameView)
    this.bugReleaseInterval=0.5;
		this.lastBugReleaseTime=0;
    this.enemy = new Enemy2();
    this.effects = new Effects();
    this.doublejump = 1;
    // console.log(this)
	}


  
  start(){
    // console.log('starting...')
    document.addEventListener('keydown', (event) => keyboardHandler.onKeyDown(event, this.keypress), false);
    document.addEventListener('keyup', keyboardHandler.onKeyUp, false);
    this.notHitTime.start();
    this.gameView.createScene(this.effects);
    this.enemy.addWorldBugs(this.gameView.rollingGroundSphere);
    this.enemy.createBugsPool();
    this.gameView.render();
  //   this.bindKeyHandlers();
  //   this.lastTime = 0;

  //   // start 
    this.update();
  }



	update(){
    this.gameView.heroSprite.position.y += this.bounceValue;
    this.bounceValue-=this.gravity; 
    if((this.gameView.heroSprite.position.y - 0.3) <= (this.gameView.heroGroundedY )){
      this.jumping=false;
      this.bounceValue=(Math.random()*0.005)+0.01; 
    } 
    if (!this.jumping) { 
        if ( this.keypress.jump ) {//up, jump
          this.keypress.jump = false
					this.bounceValue=0.2;
					this.jumping=true;
        }
        else if ( this.keypress.right) {//right
				if(this.gameView.currentLane == this.gameView.middleLane){
          this.gameView.currentLane=this.gameView.rightLane;
          this.keypress.right = false;
				}else if(this.gameView.currentLane==this.gameView.leftLane){
          this.gameView.currentLane=this.gameView.middleLane;
          this.keypress.right = false;
				}else{
          this.validMove=false;
          this.keypress.right = false;	
				}
			} else if ( this.keypress.left) {//left
				if (this.gameView.currentLane==this.gameView.middleLane){
          this.gameView.currentLane=this.gameView.leftLane;
          this.keypress.left = false;
				}else if(this.gameView.currentLane==this.gameView.rightLane){
          this.gameView.currentLane=this.gameView.middleLane;
          this.keypress.left = false;
				}else{
          this.validMove=false;	
          this.keypress.left = false;
				}

			} else if (this.keypress.attack) {// spacebar pause
				if (this.paused) {
					this.paused = false
				} else if (!this.paused) {
					this.paused = true
				}
			}
    } else {
      this.keypress.jump = false
      this.keypress.right = false
      this.keypress.left = false
      this.keypress.attack = false
      
    }

    this.delta = this.gameView.clock.getDelta(); 
    this.gameView.annie.update(1000 * this.delta);
      // console.log("THIS COLLISION HANDLER IS", this.col)
      // this.gameView.scene.fog.density += 0.0001

      if (this.col.hasCollided){

        this.gameView.scene.fog.density += 0.006
        this.col.hasCollided = false
        // console.log("hit slow")
        if (this.gameView.rollingSpeed > 0.006){
          // console.log("hit slowzzzzzz")
          this.gameView.rollingSpeed -= 0.00025
        }
        this.col.timesHit += 1
        this.notHitTime.start();

      } 
      // else if (!this.col.hasCollided && (this.notHitTime.getElapsedTime() > 5)) {
      //   this.gameView.rollingSpeed += (0.0001 * this.col.timesHit)
      //   this.notHitTime.start();
      //   this.col.timesHit = 0
        
      // }

      // The Awake mechanic Game Over check
      if (this.gameView.scene.fog.density > 0.18){
        gameOver();
      }

      // console.log(Math.floor(gameTime.getElapsedTime()));
    
    if(this.gameView.clock.getElapsedTime()>this.bugReleaseInterval){
      // console.log("rollingGround is:", this.gameView.rollingGroundSphere)
      this.gameView.clock.start();
    	this.enemy.addPathBug(this.gameView.rollingGroundSphere);

    // // 	if(!hasCollided){
    // // 		score+=2*bugReleaseInterval;
    // // 		scoreText.innerHTML=score.toString();
    // // 	}
    }

    // console.log(this)

    this.col.doBugLogic(this.gameView, this.enemy, this.effects, this.col);
    this.effects.doHitLogic(this.gameView);
    
    this.gameView.rollingGroundSphere.rotation.x += this.gameView.rollingSpeed;
    this.gameView.rollingSkyCylinder.rotation.x += this.gameView.rollingSpeed;

    this.gameView.heroSprite.position.x = t.Math.lerp(this.gameView.heroSprite.position.x, this.gameView.currentLane, 10 * this.delta); //clock.getElapsedTime());

    this.gameView.render();

    // if (paused) {
    // 	cancelAnimationFrame( update )
    // } else {
    // requestAnimationFrame(update);//request next update
    // } 
      requestAnimationFrame(this.update.bind(this));
    }


	// animate(){
	// 	requestAnimationFrame( animate );
	// 	world.render();
	// 	this.update();
    // }
	

	

	// gameOver () {
	// cancelAnimationFrame( globalRenderID );
	// //window.clearInterval( powerupSpawnIntervalID );
	// }

	// onWindowResize() {
	// 	//resize & align
	// 	sceneHeight = window.innerHeight;
	// 	sceneWidth = window.innerWidth;
	// 	renderer.setSize(sceneWidth, sceneHeight);
	// 	camera.aspect = sceneWidth/sceneHeight;
	// 	camera.updateProjectionMatrix();
	// }

};
	///// StartUP HERE/////
    // init();
    ///////////////////
    
    module.exports = Game;
