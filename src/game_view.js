const t = require('three');
const Enemy = require('./enemy2');
const TextureAnimator = require('./texture_animator');
const Collision = require('./collision');

class GameView {
  constructor(game) {
    this.clock = new t.Clock();
    this.gameTime = new t.Clock();
    
    this.renderer = new t.WebGLRenderer({alpha:true});
    this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.scene = new t.Scene();
    this.scene.fog = new t.FogExp2( 0x000000, .02 );
    
    this.heroGroundedY = -1.5; 
    this.skyGeometry = new t.CylinderGeometry( 35,35,250,32);
    
    
		this.skyMaterial = new t.MeshBasicMaterial ( { 
      // color: 0x0CDBEE
      map: new t.TextureLoader().load('./matrix_green2.png')
    } )		
		this.rollingSkyCylinder = new t.Mesh( this.skyGeometry, this.skyMaterial );
		this.sides = 80;
		this.tiers = 80;
		this.worldRadius = 26;
		this.sphereGeometry = new t.SphereGeometry( this.worldRadius, this.sides, this.tiers);	
		this.sphereMaterial = new t.MeshBasicMaterial ( { 
      // color: 0x04FA38
       map: new t.TextureLoader().load('./matrix_green2.png')
      } )
    this.rollingGroundSphere = new t.Mesh( this.sphereGeometry, this.sphereMaterial );
    this.rollingSpeed = 0.008; 
    
		this.spriteMap = new t.TextureLoader().load( "./run_2_red.png" );
	  this.spriteMaterial = new t.SpriteMaterial( { 
      map: this.spriteMap, 
      color: 0xffffff } );
    this.annie = new TextureAnimator( this.spriteMap, 2, 1, 2, 160 );
  	this.heroSprite = new t.Sprite( this.spriteMaterial );	
    this.heroGroundedY = -1.5; 
    
    this.sphericalHelper = new t.Spherical();
    this.pathAngleValues=[1.52,1.57,1.62];
    

    this.leftLane = -1;
		this.rightLane = 1;
    this.middleLane = 0;  
    this.currentLane = this.middleLane;
    
		


    this.bugPool =[];
    // this.enemy = new Enemy();
    this.game = game;
  }

    createScene(effects){
      this.clock.start();
      this.gameTime.start();
      
      this.renderer.setClearColor(0xfffafa, 1); 
      this.renderer.shadowMap.enabled = true;//enable shadow
      this.renderer.shadowMap.type = t.PCFSoftShadowMap;
      this.renderer.setSize( this.sceneWidth, this.sceneHeight );
      this.dom = document.getElementById('Main-Game');
      
      // console.log("renderer is:", this.renderer)
      this.dom.appendChild(this.renderer.domElement);
      //this.stats = new Stats();
      //this.dom.appendChild(this.stats.dom);
      
      this.addWorld();
      this.addHero();
      this.addLight();
      this.addSky();

      // effects.addHit(this)

      this.camera = new t.PerspectiveCamera( 90, this.sceneWidth / this.sceneHeight, .1, 100);
      this.camera.position.z = 20;
      this.camera.position.y = 2;
      this.camera.position.x = 0;
      this.renderer.render(this.scene, this.camera);//draw
      
      window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
  
    }



    addHero(){			
			this.heroSprite.scale.set(2, 2, 1)
			this.scene.add( this.heroSprite );
			
			this.heroSprite.position.y= this.heroGroundedY
			this.heroSprite.position.z= 16;
			this.currentLane=this.middleLane;
			this.heroSprite.position.x = this.currentLane;
	}

	/// populate world functions
	addWorld(){
		this.rollingGroundSphere.receiveShadow = true;
		this.rollingGroundSphere.castShadow = false;
		this.rollingGroundSphere.rotation.z = -Math.PI/2;
		this.scene.add( this.rollingGroundSphere );
		this.rollingGroundSphere.position.y = -24;
    this.rollingGroundSphere.position.z = 2;
    // const enemy = new Enemy();
    // Enemy.addWorldBugs(this.rollingGroundSphere);
    
	}
	
	addSky(){
		this.rollingSkyCylinder.rotation.z = 0.5 * Math.PI;
		// rollingSkyCylinder.flipSided = true;
		this.rollingSkyCylinder.receiveShadow = true;
		this.rollingSkyCylinder.castShadow = false;
		this.skyGeometry.scale( 1, -1, 1 );
		this.scene.add( this.rollingSkyCylinder );
		this.rollingSkyCylinder.position.y = -24;
		this.rollingSkyCylinder.position.z = 2;
		// rollingSkyCylinder.rotation.z=-Math.PI/2;
	}
	
	addLight(){
		this.hemisphereLight = new t.HemisphereLight(0xfffafa,0x000000, .9)
		this.scene.add(this.hemisphereLight);
		this.sun = new t.DirectionalLight( 0xcdc1c5, 0.9);
		this.sun.position.set( 12,6,-7 );
		this.sun.castShadow = true;
		this.scene.add(this.sun);
		//Set up shadow properties for the sun light
		this.sun.shadow.mapSize.width = 256;
		this.sun.shadow.mapSize.height = 256;
		this.sun.shadow.camera.near = 0.5;
		this.sun.shadow.camera.far = 50 ;
  }

  render(){
    this.renderer.render(this.scene, this.camera);//draw
  }

  onWindowResize(){

    // this.renderer.bind(this)

    //resize & align
    // console.log("this is:", this)
		this.sceneHeight = window.innerHeight;
		this.sceneWidth = window.innerWidth;
		this.renderer.setSize(this.sceneWidth, this.sceneHeight);
		this.camera.aspect = this.sceneWidth/this.sceneHeight;
		this.camera.updateProjectionMatrix();
	}

}

module.exports = GameView;