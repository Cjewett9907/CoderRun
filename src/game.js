// const BugManager = require('./bug_manager')
const t = require('three');
const GameView = require('./game_view');
const Collision = require('./collision');
const keyboardHandler = require('./keyboard_handler');
const Enemy2 = require('./enemy2');
const Effects = require('./special_effects');
const Item = require('./items');
const Sound = require('./sounds');


class Game {

	constructor(difficulty){

    this.difficulty = difficulty

		this.jumpForce = 0 
		this.gravity = 0.012; 
		this.score = 0;    
		this.notHitTime = new t.Clock();
		this.sphericalHelper = new t.Spherical();
		this.pathAngleValues=[1.52,1.57,1.62];
		this.jumping = false;
		this.stats = 0;
		// this.player = player;
		this.finshed = false;
    this.paused = false;
    this.validMove = true;
    this.gameView = new GameView();
    this.keypress = { jump: false, left: false, right: false, attack: false }
    this.col = new Collision();
   
    this.bugReleaseInterval=0.5;
		this.lastBugReleaseTime=0;
    this.enemy = new Enemy2();
    this.effects = new Effects();
    this.item = new Item();
    this.doubleJump = 2;
    this.col.timeshit = 0;
    this.col.mercy = false;
    this.boostable = false;
    this.canDoubleJump = true;
    this.soundOn = false;
    this.boostDiff = 0

	}


  
  start(){
    
    this.finished = false
    document.addEventListener('keydown', (event) => keyboardHandler.onKeyDown(event, this.keypress), false);
    document.addEventListener('keyup', keyboardHandler.onKeyUp, false);
    this.notHitTime.start();
    this.gameView.createScene(this.effects);
    this.enemy.addWorldBugs(this.gameView.rollingGroundSphere);
    this.enemy.createBugsPool();
    this.gameView.render();
    this.playSounds();
    debugger
    console.log("difficulty is", this.difficulty)
    console.log(this.difficulty === 'hard')

    if (this.difficulty === 'hard') {
      this.gameView.rollingSpeed = 0.01
    } 

    this.update();
  }

  gameOver(){
    
    cancelAnimationFrame(this.update);
    document.getElementById('splash').style.visibility = 'visible';  
    document.getElementById('instructions_text').innerHTML = 'HEAR THE STORY AGAIN?';
    document.getElementById('title_text').innerHTML = `YOU SURVIVED ${Math.floor(this.gameView.gameTime.getElapsedTime())} SECONDS...`
    document.getElementById('play_text').innerHTML = 'TRY AGAIN?';  
    document.getElementById('play_btn').addEventListener('click', () => {
      window.location.reload()
      this.clearGame();
      
    })
  }
  gameWon(){
    
    cancelAnimationFrame(this.update);
    document.getElementById('splash').style.visibility = 'visible';  
    document.getElementById('title_text').innerHTML = 'YOU ESCAPED CODER RUN!!!';
    document.getElementById('instructions_text').innerHTML = 'HEAR THE STORY AGAIN?';
    document.getElementById('play_text').innerHTML = 'Play Again?';  
    document.getElementById('play_btn').addEventListener('click', () => {
      window.location.reload()
      this.clearGame();
      
    })
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
    this.music = new Sound('./spider_dance.mp3');
    this.soundOn = true; 
    this.music.start(this);


    document.getElementById('Main-Game').addEventListener('click', () => {
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
    document.getElementById('score').innerHTML = `${this.score} PTS`;

    this.gameView.heroSprite.position.y += this.jumpForce;
    this.jumpForce-=this.gravity; 

    if((this.gameView.heroSprite.position.y - 0.3) <= (this.gameView.heroGroundedY )){
      this.jumping=false;
      this.canDoubleJump = true;
      this.jumpForce=(Math.random()*0.005)+0.012; 
    } 
    // if 
    // (!this.jumping || this.canDoubleJump) 
        // (true){ 
        if ( this.keypress.jump && !this.jumping ) {//up, jump
          
          this.keypress.jump = false
          this.jumpForce = 0.2;
          // this.gameView.heroSprite.position.y += this.jumpForce;
          this.jumping=true;
        }

        if (this.keypress.jump && this.jumping && this.canDoubleJump){
          this.keypress.jump = false
          this.jumpForce = 0.15;
          // this.gameView.heroSprite.position.y += this.jumpForce;
          this.canDoubleJump = false
        }

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
      
      this.keypress.jump = false
      this.keypress.right = false
      this.keypress.left = false
      this.keypress.attack = false

    this.delta = this.gameView.clock.getDelta(); 
    this.gameView.annie.update(1000 * this.delta);

      if (this.col.hasCollided){
        this.col.mercy = true
        this.hitCoeff = ((0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60)) < 0.005) ? (0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60)) : 0.005
        this.gameView.scene.fog.density += 0.005 + (this.hitCoeff)
        this.col.hasCollided = false
          if (this.gameView.rollingSpeed > 0.008){
            this.gameView.rollingSpeed -= 0.0001
            this.boostDiff += 0.0001
          }
          this.col.timesHit += 1
          this.notHitTime.start();
        } 

      // increases the frequency of bug realease
      if (this.difficulty === 'easy'){
        if (this.gameView.gameTime.getElapsedTime() > 30){
          this.bugReleaseInterval=0.45;
        }
        if (this.gameView.gameTime.getElapsedTime() > 60){
          this.bugReleaseInterval=0.40;
        }
        if (this.gameView.gameTime.getElapsedTime() > 90){
          this.bugReleaseInterval=0.35;
        }
        if (this.gameView.gameTime.getElapsedTime() > 120){
          this.bugReleaseInterval=0.30;
        }
        if (this.gameView.gameTime.getElapsedTime() > 180){
          this.finished = true;
          this.gameWon();
        }
      } else if (this.difficulty === 'hard'){
        if (this.gameView.gameTime.getElapsedTime() > 30){
          this.bugReleaseInterval=0.42;
        }
        if (this.gameView.gameTime.getElapsedTime() > 60){
          this.bugReleaseInterval=0.37;
        }
        if (this.gameView.gameTime.getElapsedTime() > 90){
          this.bugReleaseInterval=0.32;
        }
        if (this.gameView.gameTime.getElapsedTime() > 120){
          this.bugReleaseInterval=0.25;
        }
        if (this.gameView.gameTime.getElapsedTime() > 180){
          this.finished = true;
          this.gameWon();
        }
      }



      if (this.col.gotItem && !(this.gameView.scene.fog.density < 0.011)) {
        this.col.gotItem = false
        this.gameView.scene.fog.density -= 0.01
      }

      if (this.col.mercy && (this.notHitTime.getElapsedTime() > 5)) {
        this.col.mercy = false
        // this.col.hasCollided = false
        console.log(this.boostDiff)

        this.gameView.rollingSpeed += this.boostDiff * 2
        this.boostDiff = 0
      }
      if (Math.floor(this.notHitTime.getElapsedTime()) % 5 === 0 && this.boostable === true && this.gameView.rollingSpeed < 0.015 && this.difficulty === 'easy' ){
        this.boostable = false
        this.gameView.rollingSpeed += 0.0003
      } else if (Math.floor(this.notHitTime.getElapsedTime()) % 5 === 0 && this.boostable === true && this.gameView.rollingSpeed < 0.015 && this.difficulty === 'hard'){
         this.boostable = false
         this.gameView.rollingSpeed += 0.0004
      }
      else if (Math.floor(this.notHitTime.getElapsedTime()+1) % 5 === 0){
        this.boostable = true
      }

      // The Awake mechanic Game Over check
      if (this.gameView.scene.fog.density > 0.16){
        this.finished = true
        // this.gameOver.bind(this);
        this.gameOver();
      }
    
    if(this.gameView.clock.getElapsedTime()>this.bugReleaseInterval && this.gameView.gameTime.getElapsedTime() > 3){
      this.gameView.clock.start();
    	this.enemy.addPathBug(this.gameView.rollingGroundSphere, this.difficulty);

    	if(!this.col.hasCollided){
        this.score += 200 * this.bugReleaseInterval;

        if(this.gameView.clock.getElapsedTime() > 20){
          this.score += 200 * this.bugReleaseInterval
        }
        if(this.gameView.clock.getElapsedTime() > 40){
          this.score += 200 * this.bugReleaseInterval
        }
    	}
    }
    this.col.doBugLogic(this.gameView, this.enemy, this.effects, this.col, this.item, this.difficulty);
    this.effects.doHitLogic(this.gameView);
    
    this.gameView.rollingGroundSphere.rotation.x += this.gameView.rollingSpeed;
    this.gameView.rollingSkyCylinder.rotation.x += this.gameView.rollingSpeed;

    this.gameView.heroSprite.position.x = t.Math.lerp(this.gameView.heroSprite.position.x, this.gameView.currentLane, 10 * this.delta); //clock.getElapsedTime());

    this.gameView.render();

      if (!this.finished){
        requestAnimationFrame(this.update.bind(this));
      }
    }
  
    clearGame() {
      clearInterval(this.start());
      this.music.stop();
      this.soundOn = false;
    }
};
    
    module.exports = Game;


    
