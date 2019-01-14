const t = require('three')

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
		{	
			// note: texture passed by reference, will be updated by the update function.
			this.texture = texture
			this.tilesHorizontal = tilesHoriz;
			this.tilesVertical = tilesVert;
			// how many images does this spritesheet contain?
			//  usually equals tilesHoriz * tilesVert, but not necessarily,
			//  if there at blank tiles at the bottom of the spritesheet. 
			this.numberOfTiles = numTiles;
			this.texture.wrapS = this.texture.wrapT = t.RepeatWrapping; 
			this.texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

			// how long should each image be displayed?
			this.tileDisplayDuration = tileDispDuration;

			// how long has the current image been displayed?
			this.currentDisplayTime = 0;

			// which image is currently being displayed?
			this.currentTile = 0;
				
			this.update = function( milliSec )
			{
				this.currentDisplayTime += milliSec;
				while (this.currentDisplayTime > this.tileDisplayDuration)
				{
					this.currentDisplayTime -= this.tileDisplayDuration;
					this.currentTile++;
					if (this.currentTile == this.numberOfTiles)
						this.currentTile = 0;
					let currentColumn = this.currentTile % this.tilesHorizontal;
					texture.offset.x = currentColumn / this.tilesHorizontal;
					let currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
					texture.offset.y = currentRow / this.tilesVertical;
				}
			};
        }	
    module.exports = TextureAnimator;