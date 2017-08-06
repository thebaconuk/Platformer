var mainMenu = function(game) {
    
};

mainMenu.prototype = {
    
    create:function() {
    
    this.game.add.image(0, 0, 'menuBG');
    
    //should I be making the below objects as .this? Or can I add them in here like: var menuTitle; and so on. If so how far would there scope go? My thinking is by using .this im adding these objects into mainMenu only?    
    this.menuTitle = this.game.add.sprite(32, -512, 'menuTitle');
    this.menuTitle.alpha = 0.0;
    this.menuFadeIn = this.game.add.tween(this.menuTitle).to( { alpha: 1}, 1000, 'Linear', true);
    this.menuBounce = this.game.add.tween(this.menuTitle).to ( {y: 32}, 1000, 'Bounce', true);
    this.menuPulse = this.game.add.tween(this.menuTitle.scale).to ( {x: 1.05, y: 1.05}, 2000, 'Cubic', true, 1000, -1, true);
    //this.menuPulse.yoyo(true,1000); (jon ignore for my reference :)
    //this.menuPulse.repeat(10, 1000);(jon ignore for my reference :)
    
    var button; //what scope would this object be? Is it global, only available in the create:function(), only available in the mainMenu.prototype() or only available in mainMenu.js? How deep does the rabbit hole go!!! :)
    var buttons = this.game.add.group();
        
    button = this.game.add.button(this.game.world.width - 256, this.game.world.height - 256, 'menuNewgame', newgameOnClick, this, 1, 2, 0);
    button.onInputOver.add(buttonOver, this);
    buttons.add(button);
        
    button = this.game.add.button(this.game.world.width - 256, this.game.world.height - 192, 'menuOptions', optionsOnClick, this, 1, 2, 0);
    button.onInputOver.add(buttonOver, this); //do I need to add this twice? My thinking is yes as I've kinda overwrite the first button instance?
    buttons.add(button);
                
    }
}

function buttonOver (a) {

    a.scale.x = 2.0; // within this function how can I do: If you are the button selected then scale 2.0 ELSE (the rest of the buttons) 1.0? I think I need an IF/ESLE statement but I haven't tatted with IF too much yet :)  
}

function newgameOnClick () {
    
    this.game.state.start("main");
}

function optionsOnClick () {
    
    this.game.state.start("mainMenu");
}