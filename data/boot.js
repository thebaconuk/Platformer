var boot = function(game) {
    
    console.log("Initialising Boot");
};

boot.prototype = { 
    preload: function() {
        
        this.game.load.tilemap('level0', '/tiled/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', '/assets/tileset.png');
        this.game.load.image('player', '/assets/player.png');
        this.game.load.image('menuBG', '/assets/menuBG.png');
        this.game.load.image('menuTitle', '/assets/menuTitle.png');
        this.game.load.spritesheet('menuNewgame', '/assets/menuNewgame.png', 96, 32);
        this.game.load.spritesheet('menuOptions', '/assets/menuOptions.png', 96, 32);
    
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },

    create: function() {
        
        this.game.state.start("mainMenu");
    }
};