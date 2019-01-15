const t = require('three');
const GameView = require('./game_view');
const Item = require('./items');

class Enemy{
    constructor(){
        this.bugsInPath = []
        this.bugPool =[]
        this.items = new Item();
        this.spawnTimer = new t.Clock().start();
       

    }


  addWorldBugs(ground){
    // console.log("worldbug ground is:", ground)
    this.currentGround = ground
    const numBugs=36;
    const gap=6.28/36;
    for(let i=0;i<numBugs;i++){
      this.addBug(false,i*gap, true, this.currentGround);
      this.addBug(false,i*gap, false, this.currentGround);
    }
  }

  addBug(inPath, row, isLeft){
    this.newBug;
    const sphericalHelper = new t.Spherical();
    const worldRadius = 26;
    const pathAngleValues = [1.52,1.57,1.62]
    // this.currentGround = currentGround
    if(inPath){

        // console.log("MAKING PATH BUG")
        // console.log(this.bugPool)
      if(this.bugPool.length === 0)return;
        this.newBug = this.bugPool.pop();
        this.newBug.visible = true;
        this.bugsInPath.push(this.newBug);
     
        if(Math.random()>0.5){
        // This handles the starting position of objects relative to the spinning world
        sphericalHelper.set( worldRadius+1, pathAngleValues[row], -this.currentGround.rotation.x+4 );
        }else {
        //// This is for Flying Bugs
        
        sphericalHelper.set( worldRadius+2, pathAngleValues[row], -this.currentGround.rotation.x+4 );
        }
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


  addPathBug(ground, recievedBugPool, gameView){
    this.currentGround = ground
    let options=[0,1,2];

    
    // console.log('recieved bugpool addpath', this.bugPool)
    if(Math.random()<0.05){
      let lane10= Math.floor(Math.random()*2);
      this.items.addItem(lane10, this.currentGround);
      this.items.createItem();
    }else{
      
      if(this.spawnTimer > 15){
      this.addBug(true, 0, false, ground, this.bugPool);
      options.splice(0,1);
      this.addBug(true, 1, false, ground, this.bugPool);
      options.splice(1,1);
      this.addBug(true, 2, false, ground, this.bugPool);
      options.splice(2,1);
      } 
    

      if(Math.random()>0.2){
        // Add difficulty here!
        let lane1= Math.floor(Math.random()*3);
        this.addBug(true, lane1, false, ground, this.bugPool);
        let lane2= Math.floor(Math.random()*3);
        this.addBug(true, lane2, false, ground, this.bugPool);
        // let lane3= Math.floor(Math.random()*3);
        // this.addBug(true, lane3, false, ground, this.bugPool);
      }
      if(Math.random()>0.5){
        // Add difficulty here!
        let lane4= Math.floor(Math.random()*3);
        this.addBug(true, lane4, false, ground, this.bugPool);
        let lane5= Math.floor(Math.random()*3);
        this.addBug(true, lane5, false, ground, this.bugPool);
        let lane6= Math.floor(Math.random()*3);
        this.addBug(true, lane6, false, ground, this.bugPool);
        // let lane7= Math.floor(Math.random()*3);
        // this.addBug(true, lane7, false, ground, this.bugPool);
      }

    }




    // if(Math.random()<0.05){
    //   let lane10= Math.floor(Math.random()*2);
    //   this.items.addItem(lane10, this.currentGround);
    //   this.items.createItem();
      
    //   console.log('current ground', this.currentGround)
    // }a
  }

  createBug(){
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

  createBugsPool(){
    // console.log("making bug pool")
    let maxBugsInPool=100;
    let newBug;
    
    for(let i=0; i<maxBugsInPool;i++){
      newBug=this.createBug();
      this.bugPool.push(newBug);
    }
    // console.log("Generated bug pool", this.bugPool)
  }
}

module.exports = Enemy;
