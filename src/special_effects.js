const t = require('three')
const GameView = require('./game_view')
const Enemy = require('./enemy')


class Effects {
    constructor(){
        this.particleCount = 80
        this.particleGeometry = new t.Geometry();
        this.partMaterial = new t.ParticleBasicMaterial({color: 0xff3200, size: 0.05});
        this.particles = new t.Points( this.particleGeometry, this.partMaterial );
        this.hitPower = 1.1;
    }
    doHitLogic(gameView){
        if(!this.particles.visible)return;
        for (let i = 0; i < this.particleCount; i ++ ) {
            let vertex = new t.Vector3();
            this.particleGeometry.vertices.push( vertex );
        }
        for (var i = 0; i < this.particleCount; i ++ ) {
            // console.log("this is:", this)
            this.particleGeometry.vertices[i].multiplyScalar(this.hitPower);
        }

        if(this.hitPower>1.005){
            this.hitPower-=0.007;
        }else{
            this.particles.visible=false;
        }
        this.particleGeometry.verticesNeedUpdate = true;
        // console.log("QQQQQQQ gameView is:", gameView)
        gameView.scene.add( this.particles );
        // this.particles.visible=false;        
    }

    addHit(gameView){
        this.particles.position.y=gameView.heroSprite.position.y;
        this.particles.position.z=16;
        this.particles.position.x = gameView.heroSprite.position.x;
        for (var i = 0; i < this.particleCount; i ++ ) {
            var vertex = new t.Vector3();
            vertex.x = -0.2+Math.random() * 0.4;
            vertex.y = -0.2+Math.random() * 0.4 ;
            vertex.z = -0.2+Math.random() * 0.4;
            this.particleGeometry.vertices[i]=vertex;
        }
        this.hitPower=1.1;
        this.particles.visible=true;
    }




}










    // explode(){
        // particles.position.y=-1;
        // particles.position.z=16;
        // particles.position.x=heroSprite.position.x;
        // for (var i = 0; i < particleCount; i ++ ) {
        //     var vertex = new t.Vector3();
        //     vertex.x = -0.2+Math.random() * 0.4;
        //     vertex.y = -0.2+Math.random() * 0.4 ;
        //     vertex.z = -0.2+Math.random() * 0.4;
        //     particleGeometry.vertices[i]=vertex;
        // }
        // explosionPower=1.1;
        // particles.visible=true;
    // }
    
    // addHitParticles(gameView){
    //     // const particleCount = 20
    //     // const particles;
    //     // particleGeometry = new t.Geometry();
    //     for (let i = 0; i < this.particleCount; i ++ ) {
    //         let vertex = new t.Vector3();
    //         this.particleGeometry.vertices.push( vertex );
    //     }
    //     // let partMaterial = new t.ParticleBasicMaterial({
    //     // color: 0xff3200,
    //     // size: 0.05
    //     // });
    //     // particles = new t.Points( particleGeometry, partMaterial );
    //     gameView.scene.add( this.particles );
    //     this.particles.visible=false; 
       
    // }

module.exports = Effects;
