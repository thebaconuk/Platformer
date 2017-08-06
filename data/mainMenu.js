var mainMenu = function(game) {
    
};

mainMenu.prototype = {
    
    create:function() {
    
        this.game.add.image(0, 0, 'menuBG');

        //should I be making the below objects as .this? Or can I add them in here like: var menuTitle; and so on. If so howfar would there scope go? My thinking is by using .this im adding these objects into mainMenu only?

        //it depends Do you want to use the menuTitle elsewhere in the mainMenu code?
        //if answer is yes then yeah use this.menuTitle as you can then access it later in say the update function
        //if answer is no then you dont need to. So to understand why you might not want to store it in the mainMenu object, you have to understand about memory management in javascript.
        //in javascript something exists only as long as there is at least 1 thing referring to it. So for example if I do:
        //var IamReferingToSprite = this.game.add.sprite(....
        //in this example you are using the phaser "helper" feature this.game.add.sprite which automatically adds the sprite to the scene
        //so in this example we know that the sprite exists, because the scene contains a reference to it. What this means is that if you were not worried about changing the sprite in the future
        //you could safely just do it like so:
        //this.game.add.sprite(32, -512, "menuTitle") //(without assigning it to anything)
        //I notice that you are applying a tween to the menuTitle, so it does seem like we need to reference it...at least within this create:function() {}
        //so as we are only "using" the menuTitle here, then its probably the best bet to just do var menuTitle = this.game.add.sprite() .. and then this temporary reference to menuTitle
        //will get thrown away once the create: function() {} finishes.
        //remember, this is just a pointer (a reference) to the object. It is not the obect itself. As long as at least 1 other thing still has a reference to menuTitle (the scene does)
        //then javascript wont delete menuTitle prematurely!

        this.menuTitle = this.game.add.sprite(32, -512, 'menuTitle');
        this.menuTitle.alpha = 0.0;
        this.menuFadeIn = this.game.add.tween(this.menuTitle).to( { alpha: 1}, 1000, 'Linear', true);
        this.menuBounce = this.game.add.tween(this.menuTitle).to ( {y: 32}, 1000, 'Bounce', true);
        this.menuPulse = this.game.add.tween(this.menuTitle.scale).to ( {x: 1.05, y: 1.05}, 2000, 'Cubic', true, 1000, -1, true);
        //this.menuPulse.yoyo(true,1000); (jon ignore for my reference :)
        //this.menuPulse.repeat(10, 1000);(jon ignore for my reference :)

        var button; //what scope would this object be? Is it global, only available in the create:function(), only available in the mainMenu.prototype() or only available in mainMenu.js? How deep does the rabbit hole go!!! :)

        //with var (not the same as let/const remember) the scope is either what file you are in or what function you are in. So if you scroll up and see what function are we currently in...?
        //... create: function() {
        //well there is your answer, it will only exist within this function.
        var buttons = this.game.add.group();

        button = this.game.add.button(this.game.world.width - 256, this.game.world.height - 256, 'menuNewgame', newgameOnClick, this, 1, 2, 0);
        button.onInputOver.add(buttonOver, this);
        button.onInputOut.add(buttonOut, this);
        buttons.add(button);

        button = this.game.add.button(this.game.world.width - 256, this.game.world.height - 192, 'menuOptions', optionsOnClick, this, 1, 2, 0);
        button.onInputOver.add(buttonOver, this); //do I need to add this twice? My thinking is yes as I've kinda overwrite the first button instance?
        button.onInputOut.add(buttonOut, this);
        buttons.add(button);

        //yup you do need to add twice. The reason behind this is explained in the big comment above.
        //as you are adding the previous button to the scene/group then there is at least 1 reference to it. When you now do the second button =...
        //button will now point to the new button, but the old one doesn't just get deleted!

        //its worth checking to see what this.game.add.button is actually doing. I had a quick look:
        //https://phaser.io/docs/2.6.2/Phaser.GameObjectFactory.html#button
        //you will notice here that there is a "group" function parameter. It says its optional, but if you dont specify it then it gets added to teh world automatically.
        //well this is helpful in that it makes things nice and easy!... but...
        //you are also creating a buttons group and adding the button to that as well. So potentially your button will appear twice in the scene!!!
        //your best bet is to do teh following instead

        /*
        button = this.game.add.button(this.game.world.width - 256, this.game.world.height - 192, 'menuOptions', optionsOnClick, buttons, 1, 2, 0);
        button.onInputOver.add(buttonOver, this);
        //buttons.add(button); //<--- we dont need this anymore!
         */

        //notice how i have provided "buttons" as the group we want to add this new button to. We no longer need to manually add teh button to our buttons group!

    }
}

function buttonOver (a) {
    a.scale.x = 2.0; // within this function how can I do: If you are the button selected then scale 2.0 ELSE (the rest of the buttons) 1.0? I think I need an IF/ESLE statement but I haven't tatted with IF too much yet :)
    //your best bet is to utilise the other "events" phaser gives you for buttons. This way you can make buttons act indepenatly without having to know about each other.
    //i have fleshed out the example to demonstrate
}

function buttonOut(a) {
    //added this buttonOut callback event function. Scroll up and see where we create te hbuttons to see when it is added to said buttons!
    a.scale.x = 1.0;
}

function newgameOnClick () {
    
    this.game.state.start("main");
}

function optionsOnClick () {
    
    this.game.state.start("mainMenu");
}