var mainMenu = function(game) {
    
};

mainMenu.prototype = {
    
    create:function() {
    
    this.game.add.image(0, 0, 'menuBG');
    this.menuTitle = this.game.add.sprite(32, -512, 'menuTitle');
    this.menuTitle.alpha = 0.0;
        
    this.menuFadeIn = this.game.add.tween(this.menuTitle).to( { alpha: 1}, 1000, 'Linear', true);
    this.menuBounce = this.game.add.tween(this.menuTitle).to ( {y: 32}, 1000, 'Bounce', true);
    
    this.menuPulse = this.game.add.tween(this.menuTitle.scale).to ( {x: 1.1, y: 1.1}, 5000, 'Cubic', true, 1000, -1, true);
    //this.menuPulse.yoyo(true,1000);
    //this.menuPulse.repeat(10, 1000);
            
    },
    
    update:function () {
    
        
    }
}