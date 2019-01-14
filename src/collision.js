const t = require('three')
const Effects = require('./special_effects')

class Collision {
    constructor(){
		this.bugsInPath = [];
        // this.bugsToRemove = [];
        this.hasCollided = false;

    }



        doBugLogic(gameView, enemy, effectObject, collisionObject){
             
            let oneBug;
            let bugPos = new t.Vector3();
            const bugsToRemove = [];
            
            
            enemy.bugsInPath.forEach( function ( element, index ) {
                oneBug=enemy.bugsInPath[ index ];
                bugPos.setFromMatrixPosition( oneBug.matrixWorld );
                if(bugPos.z>20 &&oneBug.visible){//gone out of our view zone
                    bugsToRemove.push(oneBug);
                }else{//check collision
                    if(bugPos.distanceTo(gameView.heroSprite.position)<=0.5){
                        console.log("hit");


                        ////////// TA help
                        // this.hasCollided = true;
                        // console.log("gameview:", gameView)
                        collisionObject.hasCollided = true
                        effectObject.addHit(gameView);
                        effectObject.doHitLogic(gameView);
                        
                    }
                }
            });
            let fromWhere;
            bugsToRemove.forEach( function ( element, index ) {
                oneBug = bugsToRemove[ index ];
                fromWhere=enemy.bugsInPath.indexOf(oneBug);
                enemy.bugsInPath.splice(fromWhere,1);
                enemy.bugPool.push(oneBug);
                oneBug.visible=false;
                console.log("Bug REMOVED");
            });
        }

       

}

module.exports = Collision;
