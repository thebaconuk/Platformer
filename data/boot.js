var boot = function(game) {
    console.log("Initialising Boot");

}; //why does the ; need to be here or does it?

boot.prototype = { //what is a prototype?
    
    preload: function() { //if i put game in the () i don't have to put this. in front of everything but it seems to act weird?
            
        this.game.load.tilemap('level0', '/tiled/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', '/assets/tileset.png');
        this.game.load.image('player', '/assets/player.png');
    
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this. IS DRIVING ME INSANE!!?? WHAT IS THIS.? LOL        
    },

    create: function() {
        
        console.log("Boot Completed");
        this.game.state.start("main");
        
    }
}