const t = require('three')
const Effects = require('./special_effects')

class Collision {
    constructor(){
		this.bugsInPath = [];
        this.hasCollided = false;
        this.gotItem = false
    }
        doBugLogic(gameView, enemy, effectObject, collisionObject, item, difficulty){
             
            let oneBug;
            let oneItem;
            let bugPos = new t.Vector3();
            let itemPos = new t.Vector3();
            const bugsToRemove = [];
            const itemsToRemove = [];
            
            enemy.items.itemPool.forEach( function ( element, index ) {
              
                oneItem = enemy.items.itemPool[ index ];
                if (oneItem) {      
                    itemPos.setFromMatrixPosition( oneItem.matrixWorld );
                    if(itemPos.z>20 &&oneItem.visible){
                        //Out of view, remove it
                        itemsToRemove.push(oneItem);
                    }else {
                        if(itemPos.distanceTo(gameView.heroSprite.position)<=0.5){
                        collisionObject.gotItem = true
                        }
                    }
                }
            });
        
            enemy.bugsInPath.forEach( function ( element, index ) {
                oneBug=enemy.bugsInPath[ index ];
                bugPos.setFromMatrixPosition( oneBug.matrixWorld );
    
                if(bugPos.z>20 &&oneBug.visible){
                    //Out of view, remove it
                    bugsToRemove.push(oneBug);
                }else if(difficulty === 'hard') {
                    if(bugPos.distanceTo(gameView.heroSprite.position)<=0.6){
                        collisionObject.hasCollided = true
                        effectObject.addHit(gameView);
                        effectObject.doHitLogic(gameView);
                    }
                }
                else{
                    //collision check
                    if(bugPos.distanceTo(gameView.heroSprite.position)<=0.5){
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
            });

            itemsToRemove.forEach( function ( element, index ) {
                oneItem = itemsToRemove[ index ];
                fromWhere=enemy.items.itemPool.indexOf(oneItem);
                enemy.items.itemPool.splice(fromWhere,1);
                oneItem.visible=false;
            });
        }
}

module.exports = Collision;
