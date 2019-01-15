// const BugManager = require('./bug_manager')
const t = require('three');
const World = require('./world');
const GameView = require('./game_view');
const Collision = require('./collision');
const keyboardHandler = require('./keyboard_handler');
// const Enemy = require('./enemy')
const Enemy2 = require('./enemy2');
const Effects = require('./special_effects');
const Item = require('./items');
const Sound = require('./sounds');


class Game {

	constructor(){
		this.bounceValue = 0 
		this.gravity = 0.012; 
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
    this.item = new Item();
    this.doubleJump = 2;
    this.col.timeshit = 0;
    this.col.mercy = false;
    this.boostable = false;
    this.canDoubleJump = false;
    this.soundOn = false

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
    // this.item.createItem();
    this.gameView.render();
  //   this.bindKeyHandlers();
  //   this.lastTime = 0;

  //   // start 
    this.update();
  }

  gameOver(){
    // cancelAnimationFrame( this.update);
    // clearInterval(this.update);
    document.getElementById('splash').style.visibility = 'visible';  
    document.getElementById('instructions').innerHTML = '';
    // document.getElementById('title_text').innerHTML = 'You stayed awake Xnum seconds...'; (Math.floor(Math.floor(this.gameView.gameTime.getElapsedTime()))
    document.getElementById('play_btn_text').innerHTML = 'Try Again?';   
  }
  
  isMusicPlaying() {
    if (this.soundOn) {
      return 'on';
    } else {
      return 'off';
    }
  }


  playSounds() {
    this.handleMusic();
    
  }

  handleMusic() {
    this.music = new Sound('./sounds/srcxxxx');
    document.getElementById('music').addEventListener('click', () => {
      if (this.soundOn) {
        this.soundOn = false;
        this.music.stop();
      } else {
        this.soundOn = true;
        this.music.start(this);
      }
    }, false);
  }




	update(){
    this.gameView.heroSprite.position.y += this.bounceValue;
    this.bounceValue-=this.gravity; 
    if((this.gameView.heroSprite.position.y - 0.3) <= (this.gameView.heroGroundedY )){
      this.jumping=false;
      this.bounceValue=(Math.random()*0.005)+0.012; 
    } 
    // if 
    // (!this.jumping || this.canDoubleJump) 
        // (true){ 
        if ( this.keypress.jump && !this.jumping ) {//up, jump
          
          this.keypress.jump = false
          this.bounceValue=0.2;
          // this.gameView.heroSprite.position.y += this.bounceValue;
          this.jumping=true;
          
          // if (this.canDoubleJump && this.doubleJump > 0){
          //   console.log("can double")
          //   this.keypress.jump = false
          //   this.bounceValue=0.2;
          //   this.canDoubleJump = false
          // }
        }

        if (this.keypress.jump && this.jumping && this.canDoubleJump){
          this.keypress.jump = false
          this.bounceValue=0.2;
          // this.gameView.heroSprite.position.y += this.bounceValue;
          this.jumping=true;
          this.canDoubleJump === false
        }
      

        // else if (this.jumping && this.doubleJump) { 
        //   if ( this.keypress.jump ) {//up, jump
        //     this.doublejump = false
        //     console.log("is double")
        //     this.bounceValue=0.1;
        //     this.jumping=true;
        //   }
        // }

        if ( this.keypress.right) {//right
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
        }

			 if ( this.keypress.left) {//left
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
        }

			 if (this.keypress.attack) {// spacebar pause
          if (this.paused) {
            this.paused = false
          } else if (!this.paused) {
            this.paused = true
          }
		  	}
      
      this.keypress.jump = false
      this.keypress.right = false
      this.keypress.left = false
      this.keypress.attack = false

    this.delta = this.gameView.clock.getDelta(); 
    this.gameView.annie.update(1000 * this.delta);
      // console.log("THIS COLLISION HANDLER IS", this.col)
      // this.gameView.scene.fog.density += 0.0001

      if (this.col.hasCollided){
        this.col.mercy = true
        this.gameView.scene.fog.density += 0.005 + (0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60))
        this.col.hasCollided = false
          if (this.gameView.rollingSpeed > 0.006){
            this.gameView.rollingSpeed -= 0.00025
          }
          this.col.timesHit += 1
          this.notHitTime.start();

        } 


      if (this.col.gotItem && !(this.gameView.scene.fog.density < 0.011)) {
        this.col.gotItem = false
        this.gameView.scene.fog.density -= 0.01
      }

      if (this.col.mercy && (this.notHitTime.getElapsedTime() > 5)) {
        this.col.mercy = false
        this.col.hasCollided = false
        this.gameView.rollingSpeed += 0.001
      }
      console.log()
      if (Math.floor(this.notHitTime.getElapsedTime()) % 5 === 0 && this.boostable === true){
        this.boostable = false
        this.gameView.rollingSpeed += 0.0002
      } else if (Math.floor(this.notHitTime.getElapsedTime()+1) % 5 === 0){
        this.boostable = true
      }

      // The Awake mechanic Game Over check
      if (this.gameView.scene.fog.density > 0.16){
        // this.gameOver.bind(this);
        this.gameOver();
      }

      // console.log(Math.floor(gameTime.getElapsedTime()));
    
    if(this.gameView.clock.getElapsedTime()>this.bugReleaseInterval){
      this.gameView.clock.start();
    	this.enemy.addPathBug(this.gameView.rollingGroundSphere);

    	if(!this.col.hasCollided){
        this.score += 100 * this.bugReleaseInterval;
        console.log(this.score)
    		// this.scoreText.innerHTML=this.score.toString();
    	}
    }
    this.col.doBugLogic(this.gameView, this.enemy, this.effects, this.col, this.item);
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
	

    // endGame() {
    //   clearInterval(this.createEnemy);
    //   document.getElementById('splash').style.visibility = 'visible';
    //   document.getElementById('play_btn_txt').innerHTML = 'Play Again';
    //   document.getElementById('instructions').innerHTML = '';
    //   document.getElementById('title_txt').innerHTML = 'The empire defeated you.';
    // }
  
    // clearGame() {
    //   clearInterval(this.create);
    //   this.music.stop();
    //   this.soundOn = false;
    // }
    
    // draw() {
    //   document.getElementById('damage').innerHTML = `Health: ${100 - Math.floor(this.damage)}%`;
    //   document.getElementById('score').innerHTML = `Score: ${Math.floor(this.killedTieFighters)}`;
    //   document.getElementById('music').innerHTML = `Sound: ${this.musicPlaying()}`;
    //   this.bg.draw();
    //   this.drawEnemies();
    // }

	

};
	///// StartUP HERE/////
    // init();
    ///////////////////
    
    module.exports = Game;
