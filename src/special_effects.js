const t = require('three')
const GameView = require('./game_view')


class Effects {
    constructor(){
        this.particleCount = 80
        this.particleGeometry = new t.Geometry();
        this.coffeeMaterial = new t.ParticleBasicMaterial({color: 0xFCF302, size: 0.05})
        this.partMaterial = new t.ParticleBasicMaterial({color: 0xff3200, size: 0.05});
        this.particles = new t.Points( this.particleGeometry, this.partMaterial );
        this.coffeeParticles = new t.Points( this.particleGeometry, this.coffeeMaterial );
        this.cafPower = 1.5;
        this.hitPower = 1.1;
    }
    doHitLogic(gameView){
        if(!this.particles.visible)return;
        for (let i = 0; i < this.particleCount; i ++ ) {
            let vertex = new t.Vector3();
            this.particleGeometry.vertices.push( vertex );
        }
        for (var i = 0; i < this.particleCount; i ++ ) {
            this.particleGeometry.vertices[i].multiplyScalar(this.hitPower);
        }

        if(this.hitPower>1.005){
            this.hitPower-=0.007;
        }else{
            this.particles.visible=false;
        }
        this.particleGeometry.verticesNeedUpdate = true;
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
    // doCoffeeLogic(gameView){
    //     if(!this.coffeeParticles.visible)return;
    //     for (let i = 0; i < this.particleCount; i ++ ) {
    //         let vertex = new t.Vector3();
    //         this.particleGeometry.vertices.push( vertex );
    //     }
    //     for (var i = 0; i < this.particleCount; i ++ ) {
    //         this.particleGeometry.vertices[i].multiplyScalar(this.cafPower);
    //     }

    //     if(this.cafPower>1.005){
    //         this.cafPower-=0.007;
    //     }else{
    //         this.coffeeParticles.visible=false;
    //     }
    //     this.particleGeometry.verticesNeedUpdate = true;
    //     gameView.scene.add( this.coffeeParticles );
    //     // this.coffeeParticles.visible=false;        
    // }

    // addCoffee(gameView){
    //     this.coffeeParticles.position.y=gameView.heroSprite.position.y;
    //     this.coffeeParticles.position.z=16;
    //     this.coffeeParticles.position.x = gameView.heroSprite.position.x;
    //     for (var i = 0; i < this.particleCount; i ++ ) {
    //         var vertex = new t.Vector3();
    //         vertex.x = -0.2+Math.random() * 0.4;
    //         vertex.y = -0.2+Math.random() * 0.4 ;
    //         vertex.z = -0.2+Math.random() * 0.4;
    //         this.particleGeometry.vertices[i]=vertex;
    //     }
    //     this.cafPower=1.1;
    //     this.coffeeParticles.visible=true;
    // }




}



module.exports = Effects;
