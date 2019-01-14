


		
// import * as Enemy from './enemy'

const Enemy = require('./enemy')
const TextureAnimator = require('./texture_animator')


class World {
  constructor() {

	
	this.spriteMap = new THREE.TextureLoader().load( "./art/run_2_red.png" );
	this.spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	this.heroSprite = new THREE.Sprite( spriteMaterial );	
	this.heroGroundedY = -1.5; 

	this.skyGeometry = new THREE.CylinderGeometry( 35,35,250,32);
	this.skyMaterial = new THREE.MeshBasicMaterial ( { map: new THREE.TextureLoader().load('./art/matrix_green2.png')} )		
	this.rollingSkyCylinder = new THREE.Mesh( skyGeometry, skyMaterial );

	this.sides = 80;
	this.tiers = 80;
	this.worldRadius = 26;
	this.sphereGeometry = new THREE.SphereGeometry( worldRadius, sides, tiers);	
	this.sphereMaterial = new THREE.MeshBasicMaterial ( { map: new THREE.TextureLoader().load('./art/matrix_green2.png')} )
	this.rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	this.rollingSpeed = 0.008; 
	
	this.bounceValue = 0 
	this.gravity = 0.01; 

	this.middleLane = 0;  
	this.currentLane = middleLane;

	this.score = 0;
	this.hasCollided = false; 
	this.bugsInPath = [];
	this.bugPool = []
	this.clock = new t.Clock();
	this.gameTime = new t.Clock();
	this.notHitTime = new t.Clock();
	this.sphericalHelper = new THREE.Spherical();
	this.pathAngleValues=[1.52,1.57,1.62];
	this.sceneWidth = window.innerWidth;
	this.sceneHeight = window.innerHeight;
	this.scene = new t.Scene();
	this.scene.fog = new THREE.FogExp2( 0x000000, .05 );
	
	camera = new THREE.PerspectiveCamera( 90, sceneWidth / sceneHeight, .1, 100);
	this.renderer = new THREE.WebGLRenderer({alpha:true});
	// this.dom = 
	// this.scoreText = ""
	this.jumping = false;
	// this.stats = 
	this.player = player;
	this.gameOver = false;
	this.paused = false;
    //     this.ctx = ctx;
    //     this.game = game;
    //     this.ship = this.game.addShip();
	  }

	createScene(){
			

			clock.start();
			gameTime.start();
		
			// dif
			
			renderer.setClearColor(0xfffafa, 1); 
			renderer.shadowMap.enabled = true;//enable shadow
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			renderer.setSize( sceneWidth, sceneHeight );
			dom = document.getElementById('Main-Entry');
			dom.appendChild(renderer.domElement);
			//stats = new Stats();
			//dom.appendChild(stats.dom);
			// createBugsPool();
			addWorld();
			addHero();
			addLight();
			addSky();
			// addExplosion();
			
			camera.position.z = 20;
			camera.position.y = 2;
			camera.position.x = 0;
			
			window.addEventListener('resize', onWindowResize, false);//resize callback

			document.onkeydown = game.handleKeyDown;
			
			scoreText = document.createElement('div');
			scoreText.style.position = 'absolute';
			//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
			scoreText.style.width = 100;
			scoreText.style.height = 100;
			//scoreText.style.backgroundColor = "blue";
			scoreText.innerHTML = "0";
			scoreText.style.top = 50 + 'px';
			scoreText.style.left = 10 + 'px';
			document.body.appendChild(scoreText);
		
			let infoText = document.createElement('div');
			infoText.style.position = 'absolute';
			infoText.style.width = 100;
			infoText.style.height = 100;
			infoText.style.backgroundColor = "yellow";
			infoText.innerHTML = "UP - Jump, Left/Right - Move";
			infoText.style.top = 10 + 'px';
			infoText.style.left = 10 + 'px';
			document.body.appendChild(infoText);
	}


    addHero(){			
			heroSprite.scale.set(2, 2, 1)
			scene.add( heroSprite );
			annie = new TextureAnimator( spriteMap, 2, 1, 2, 160 );
			// heroSphere.receiveShadow = true;
			// heroSphere.castShadow=true;
			heroSprite.position.y= heroGroundedY
			heroSprite.position.z= 16;
			currentLane=middleLane;
			heroSprite.position.x=currentLane;
	}


	

	/// populate world functions
	addWorld(){
		rollingGroundSphere.receiveShadow = true;
		rollingGroundSphere.castShadow=false;
		rollingGroundSphere.rotation.z=-Math.PI/2;
		scene.add( rollingGroundSphere );
		rollingGroundSphere.position.y=-24;
		rollingGroundSphere.position.z=2;
		Enemy.addWorldBugs();
	}
	
	addSky(){
		rollingSkyCylinder.rotation.z = 0.5 * Math.PI;
		// rollingSkyCylinder.flipSided = true;
		rollingSkyCylinder.receiveShadow = true;
		rollingSkyCylinder.castShadow=false;
		skyGeometry.scale( 1, -1, 1 );
		scene.add( rollingSkyCylinder );
		rollingSkyCylinder.position.y=-24;
		rollingSkyCylinder.position.z=2;
		// rollingSkyCylinder.rotation.z=-Math.PI/2;
	}
	
	addLight(){
		let hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
		scene.add(hemisphereLight);
		sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
		sun.position.set( 12,6,-7 );
		sun.castShadow = true;
		scene.add(sun);
		//Set up shadow properties for the sun light
		sun.shadow.mapSize.width = 256;
		sun.shadow.mapSize.height = 256;
		sun.shadow.camera.near = 0.5;
		sun.shadow.camera.far = 50 ;
	}


	render(){
		renderer.render(scene, camera);//draw
	}
}

module.exports = World;
