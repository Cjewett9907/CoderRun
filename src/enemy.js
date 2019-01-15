

//////////////////////////
// Bug related code
///////////////////////
const t = require('three');
const GameView = require('./game_view');
const Items = require('./items');

  exports.addWorldBugs = function(ground){
    // console.log("worldbug ground is:", ground)
    numBugs=36;
    gap=6.28/36;
    for(let i=0;i<numBugs;i++){
      this.addBug(false,i*gap, true, ground);
      this.addBug(false,i*gap, false, ground);
    }
  }

  exports.addBug = function(inPath, row, isLeft, currentGround, bugPool = [], gameView, bugsInPath = []){
    this.newBug;
    const sphericalHelper = new t.Spherical();
    const worldRadius = 26;
    const pathAngleValues = [1.52,1.57,1.62]
    this.currentGround = currentGround
    this.bugsInPath = bugsInPath
 
    if(inPath){
      if(bugPool.length === 0)return;
        this.newBug = bugPool.pop();
        this.newBug.visible = true;
        gameView.bugsInPath.push(this.newBug);
     
        // This handles the starting position of objects relative to the spinning world
        sphericalHelper.set( worldRadius+1, pathAngleValues[row], -this.currentGround.rotation.x+4 );
      }else {
        this.newBug = this.createBug();
        let swarmAreaAngle=0;//[1.52,1.57,1.62];
      
    
          if(isLeft){
            swarmAreaAngle=1.68+Math.random()*0.1;
          }else{
            swarmAreaAngle=1.46-Math.random()*0.1;
          }

          sphericalHelper.set( worldRadius+1, swarmAreaAngle, row );
        }

    this.newBug.position.setFromSpherical( sphericalHelper );
    this.groundVector = this.currentGround.position.clone().normalize();
    let bugVector = this.newBug.position.clone().normalize();
    this.newBug.quaternion.setFromUnitVectors(bugVector, this.groundVector);
    this.newBug.rotation.x += (Math.random() * (2*Math.PI/10))+-Math.PI/10;
    this.currentGround.add(this.newBug);

  }


  exports.addPathBug = (ground, recievedBugPool, gameView) => {
    let options=[0,1,2];
    let lane= Math.floor(Math.random()*3);
    this.addBug(true, lane, false, ground, recievedBugPool);
    options.splice(lane,1);
    
    if(Math.random()>0.5){
      // Add difficulty here!
      let lane1= Math.floor(Math.random()*2);
      this.addBug(true, lane1, false, ground, recievedBugPool);
      let lane2= Math.floor(Math.random()*2);
      this.addBug(true, lane2, false, ground, recievedBugPool);
      let lane3= Math.floor(Math.random()*2);
      this.addBug(true, lane3, false, ground, recievedBugPool);
    }

    if(Math.random()<0.05){
      // let lane5= Math.floor(Math.random()*2);
      // Items.addItem(lane5);
    }
  }

  exports.createBug = () => {
    let midPointVector= new t.Vector3();
    let vertexVector= new t.Vector3();

    this.bugMap = new t.TextureLoader().load( "./red_spider.png");
    this.spriteMaterial = new t.SpriteMaterial( { map: this.bugMap, color: 0xffffff } );

    let bug = new t.Sprite( this.spriteMaterial );
    bug.scale.set(1, 1, 1)
    bug.receiveShadow=false;
    bug.position.y = -1;
    bug.position.z = 5;
    // console.log(bug)
    return bug;
  }

  exports.createBugsPool = (bugPool = []) => {
    // console.log("making bug pool")
    this.bugPool = bugPool
    let maxBugsInPool=100;
    let newBug;
    
    for(let i=0; i<maxBugsInPool;i++){
      newBug=this.createBug();
      this.bugPool.push(newBug);
    }
    // console.log("Generated bug pool", this.bugPool)
  }

// }
// module.exports = Enemy;
