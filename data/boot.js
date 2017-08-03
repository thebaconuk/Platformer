var boot = function(game) {
    console.log("Initialising Boot");

};

boot.prototype = {
    
    preload: function() {
            
        this.game.load.tilemap('level0', '/tiled/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', '/assets/tileset.png');
        this.game.load.image('player', '/assets/player.png');
    
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
                
    },

    create: function() {
        
        console.log("Boot Completed");
        this.game.state.start("main");
        
    }
}