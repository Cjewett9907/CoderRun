const t = require('three');

class Item {

	constructor(){
        this.itemPool = []
        this.newItem = []
        this.itemMap = null;


    }
    addItem(row, ground){
        
   
        const sphericalHelper = new t.Spherical();
        const worldRadius = 26;
        const pathAngleValues = [1.52,1.57,1.62]
     
        this.newItem = this.createItem();
        // console.log(this.newItem)
        this.newItem.visible = true;
            
         // This handles the starting position of objects relative to the spinning world
        sphericalHelper.set( worldRadius+1, pathAngleValues[row], -ground.rotation.x+4 );
            
        //// This is for Flying Bugs
        // sphericalHelper.set( worldRadius+2, pathAngleValues[row], -ground.rotation.x+4 );
        this.itemPool.push(this.newItem);
        // console.log("old ground", ground)
        this.newItem.position.setFromSpherical( sphericalHelper );
        this.groundVector = ground.position.clone().normalize();
        let itemVector = this.newItem.position.clone().normalize();
        this.newItem.quaternion.setFromUnitVectors(itemVector, this.groundVector);
        this.newItem.rotation.x += (Math.random() * (2*Math.PI/10))+-Math.PI/10;
       
        ground.add(this.newItem);

        // console.log("new item", this.newItem)
        // console.log("new ground", ground)
    
        }

        createItem(){
   
        
            this.itemMap = new t.TextureLoader().load( "./coffee.png");
            this.spriteMaterial = new t.SpriteMaterial( { map: this.itemMap, color: 0xffffff } );
        
            let item = new t.Sprite( this.spriteMaterial );
            item.scale.set(1, 1, 1)
            item.receiveShadow=false;
            item.position.y = -1;
            item.position.z = 5;
            this.itemPool.push(item);
            return item;
          }
}
module.exports = Item;
