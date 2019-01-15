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

	constructor(){
		this.bounceValue = 0 
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
    this.soundOn = false
    

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

  //   // start 
    this.update();
  }

  gameOver(){
    
    cancelAnimationFrame(this.update);
    // clearInterval(this.update);
    document.getElementById('splash').style.visibility = 'visible';  
    document.getElementById('instructions_text').innerHTML = 'You fell asleep';
   
    document.getElementById('title_text').innerHTML = `You stayed awake ${Math.floor(this.gameView.gameTime.getElapsedTime())} seconds...`
    document.getElementById('play_text').innerHTML = 'Try Again?';  

    // document.getElementById('splash-effect').style.visibility = 'hidden'; 
    // document.getElementById('splash').style.visibility = 'hidden';
    
    document.getElementById('play_btn').addEventListener('click', () => {
      console.log("CLICKED THE BUTTON")
    
      window.location.reload()
      // document.getElementById('splash-effect').style.visibility = 'hidden'; 
      // clearInterval(this.start());
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
    // this.soundOn = true;
    // this.music.start(this);


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
    document.getElementById('score').innerHTML = `${this.score}`;

    this.gameView.heroSprite.position.y += this.bounceValue;
    this.bounceValue-=this.gravity; 

    if((this.gameView.heroSprite.position.y - 0.3) <= (this.gameView.heroGroundedY )){
      this.jumping=false;
      this.canDoubleJump = true;
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
          this.bounceValue=0.15;
          // this.gameView.heroSprite.position.y += this.bounceValue;
          this.canDoubleJump = false
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

			 if (this.keypress.space) {// spacebar pause
          if (this.soundOn) {
            this.soundOn = false
            this.music.stop();
          } else if (!this.soundOn) {
            this.soundOn = true
            this.music.start(this);
          }
          this.keypress.space = false
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
        this.hitCoeff = ((0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60)) < 0.005) ? (0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60)) : 0.005
        this.gameView.scene.fog.density += 0.005 + (0.005 * (Math.floor(this.gameView.gameTime.getElapsedTime())/60))
        this.col.hasCollided = false
          if (this.gameView.rollingSpeed > 0.006){
            this.gameView.rollingSpeed -= 0.00025
          }
          this.col.timesHit += 1
          this.notHitTime.start();
        } 

      // increases the frequency of bug realease
      console.log(this.gameView.gameTime.getElapsedTime())
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
        this.finished = true
        // this.gameOver.bind(this);
        this.gameOver();
      }

      // console.log(Math.floor(gameTime.getElapsedTime()));
    
    if(this.gameView.clock.getElapsedTime()>this.bugReleaseInterval){
      this.gameView.clock.start();
    	this.enemy.addPathBug(this.gameView.rollingGroundSphere);

    	if(!this.col.hasCollided){
        this.score += 200 * this.bugReleaseInterval;

        if(this.gameView.clock.getElapsedTime() > 20){
          this.score += 200 * this.bugReleaseInterval
        }
        if(this.gameView.clock.getElapsedTime() > 40){
          this.score += 200 * this.bugReleaseInterval
        }
        console.log(this.score)
        
    		
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


      if (!this.finished){
        requestAnimationFrame(this.update.bind(this));
      }
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
  
    clearGame() {
      clearInterval(this.start());
      // this.music.stop();
      // this.soundOn = false;
    }
    
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


    
