const t = require('three')
const Effects = require('./special_effects')

class Collision {
    constructor(){
		this.bugsInPath = [];
        // this.bugsToRemove = [];
        this.hasCollided = false;
        this.gotItem = false

    }



        doBugLogic(gameView, enemy, effectObject, collisionObject, item){
             
            let oneBug;
            let oneItem;
            let bugPos = new t.Vector3();
            let itemPos = new t.Vector3();
            const bugsToRemove = [];
            const itemsToRemove = [];
            

            enemy.items.itemPool.forEach( function ( element, index ) {
                // console.log("bugs in path", enemy.bugsInPath)
                oneItem = enemy.items.itemPool[ index ];
                if (oneItem) {
                    // console.log("IN THE LENGTH CHECKER ")        
                    itemPos.setFromMatrixPosition( oneItem.matrixWorld );
                    // console.log("one Item:", oneItem)
                    // console.log("item pos AFTER", itemPos)
                    if(itemPos.z>20 &&oneItem.visible){//gone out of our view zone
                        itemsToRemove.push(oneItem);
                    }else {
                        if(itemPos.distanceTo(gameView.heroSprite.position)<=0.5){
                        console.log("Coffee")

                        collisionObject.gotItem = true
                    // effectObject.addItem(gameView);
                     // effectObject.doItemLogic(gameView);
                        }
                    }
                }
            });
        






            enemy.bugsInPath.forEach( function ( element, index ) {
                // console.log("bugs in path", enemy.bugsInPath)
                oneBug=enemy.bugsInPath[ index ];
             
                bugPos.setFromMatrixPosition( oneBug.matrixWorld );
                // console.log("enemy is", enemy)
                // console.log("Bug Pos is", bugPos)
                // console.log("one bug", oneBug)
               
                // console.log("enemy", enemy)
               

                // console.log("item Pos is", itemPos)
                // console.log("bugPos is", bugPos)
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
                    // item logic
                    // else if(itemPos.distanceTo(gameView.heroSprite.position)<=0.5){
                    //     console.log("Coffee")

                    //     collisionObject.gotItem = true
                    //     // effectObject.addItem(gameView);
                    //     // effectObject.doItemLogic(gameView);

                    // }



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

            itemsToRemove.forEach( function ( element, index ) {
                oneItem = itemsToRemove[ index ];
                fromWhere=enemy.items.itemPool.indexOf(oneItem);
                enemy.items.itemPool.splice(fromWhere,1);
                oneItem.visible=false;
                console.log("item REMOVED");
            });
        }

  

       

}

module.exports = Collision;
