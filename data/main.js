var main = function(game) {

    //WHERE DO I PUT THESE TO MAKE THEM GLOBAL?    
    //let map;
    //let layer0;
    //let layer1;

    //let cursors;

    //let player;
    
    //let playerGravity = 1400;
    //let playerJump = -575;
    //let playerAcc = 30;
    //let playerMaxX = 350;

    //let debugText;
    
    console.log("Initialising Main");
};

main.prototype = {
    
    create: function() {
        
        let playerGravity = 1400;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        map = this.game.add.tilemap('level0')
        map.addTilesetImage('default_tileset', 'tileset', 32, 32);
    
        layer0 = map.createLayer('background');
        layer1 = map.createLayer('foreground');
    
        player = this.game.add.sprite(64, 64, 'player');
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
    
        player.body.collideWorldBounds = true;
        player.body.gravity.y = playerGravity;
    
        map.setCollisionByExclusion([], true, layer1);
    
        cursors = this.game.input.keyboard.createCursorKeys(); 
    
        debugText = this.game.add.text(16, 16, 'Hello World');
    },
    
    update: function() {
        
        let playerJump = -575;
        let playerAcc = 30;
        let playerMaxX = 350;
        
        hitPlatform = this.game.physics.arcade.collide(player, layer1);
    
        //move left    
        if (cursors.left.isDown) {
            player.body.velocity.x = player.body.velocity.x - playerAcc;
            player.body.velocity.x = Math.max(player.body.velocity.x , -playerMaxX);
        }
    
        //move right
        else if (cursors.right.isDown) {
            player.body.velocity.x = player.body.velocity.x + playerAcc;
            player.body.velocity.x = Math.min(player.body.velocity.x , playerMaxX);
        }
    
        //deceleration moving right
        else if (player.body.velocity.x > 0) {
            player.body.velocity.x = player.body.velocity.x - playerAcc;
            if (player.body.velocity.x < 0) {
                player.body.velocity.x = 0;
            }
        
        }
    
        //deceleration moving left
        else if (player.body.velocity.x < 0) {
            player.body.velocity.x = player.body.velocity.x + playerAcc;
            if (player.body.velocity.x > 0) {
                player.body.velocity.x = 0;
            }
        }
    
        //jump
        if (cursors.up.isDown && player.body.blocked.down && hitPlatform) {
            player.body.velocity.y = playerJump;
        
        }
    
        debugText.text = 'player velocity: x= '+player.body.velocity.x + ' y= '+Math.round(player.body.velocity.y);
    }
}

