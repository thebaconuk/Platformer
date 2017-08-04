var boot = function(game) {
    console.log("Initialising Boot");
    this.menuOption = 'settings';

}; //why does the ; need to be here or does it?
/*

there are two types of function:

---
//function
function boot1() {
}
---

and

---
//anonymous function (also called lambda, inline, temporary)
let boot2 = function() {
};
---

the first type of function is defined as a declaration within your code so it is considered a first class citizen. Similar to how you dont use ; for if else elseif while switch.

the second is actually the same as doing var abc = 123; It is a standard expression so needs termination with a ; It just so happens that we are splitting our standard line of code over
multiple lines... because... well otherwise creating a function this way would be painful:
var boot = function() { var wtf=123; console.log('hello'); if (wtf === 123) { console.log('wtf'); }

there is also a difference in that you could reassign boot2 to something else as its just a variable. You generally cant do the same for functions written as a declaration (example 1)
 */

boot.prototype = { //what is a prototype?
    /*
    all "objects" in javascript have extra stuff!
    Javascript treats most things as an object (including string, function, etc)

    the prototype is like the global blueprint for said object. If you imagine you created a 1000 enemy ship objects and each ship you could call enemy.kill(). It would be pretty
    wasteful to create 1000 copies of the kill function! The solution to this is the prototype. Here is an example:

    ---
    function EnemyShip() {
        this.alive = true;
    }

    EnemyShip.prototype.kill = function() {
        this.alive = false;
    }

    let ship1 = new EnemyShip();
    let ship2 = new EnemyShip();

    ship1.kill();
    ---

    you can see here I am defining my object constructor with the function EnemyShip() { line. This allows us to create new ships via ship1 = new EnemyShip();
    now after you can see i am attaching a function to EnemyShip.prototype.kill. This creates 1 function for kill() that is only ever defined once but then can be called for each ship!

    As things get more complicated in your code you end up having to do lots of weird stuff like inheriting prototypes which all gets a bit messy...(read on)...

    So javascript is pretty cool in that you can build your objects up like this in a rather lazy fashion. If you remember the "class" stuff I have mentioned, this is basically
    javascript abstracting (making far far far far nicer) this prototype stuff into a specialised syntax. The same example as above:

    ---
    class EnemyShip {
        constructor() {
            this.alive = true;
        }

        kill() {
            this.alive = false;
        }
    }

    let ship1 = new EnemyShip();
    let ship2 = new EnemyShip();

    ship1.kill();
    ---

    its much cleaner as everything is self contained within the class block. Under the hood, javascript will construct the object in pretty much teh same way, the difference is you
    dont have to deal with the prototype. When you come to do inheritance, javascript also provides super magic sugar syntax to do away with the nasty prototype crap from ye old!

     */
    preload: function() { //if i put game in the () i don't have to put this. in front of everything but it seems to act weird?
        /*
        so within index.html you are doing this:

        ---
        game.state.add("boot", boot);
        ---

        you are telling phaser to add a state called "boot". The second parameter ...boot... is actually an object/class definition. You can see this within THIS file.
        The examples in the prototype comment above explain about object definition and then construction.

        so you are giving phaser the definition of your boot object. Later on phaser will handle doing something along the lines of: currentState = new boot();

        what this means, is that your preload: function() {
        }

        actually belongs to your boot object. So you can assume that this.blah will refer to the current instance of that object. Or in english, when phaser creates
        a copy of your boot state, it will call theBootCopy.preload(). Where you can then act upon your states need to preload stuff!

        the "constructor" (the code that gets run when the NEW keyword is used) is where we would generally assign the values for an object instance. In the example of this boot
        state, well this would be any variables you might need specifically to the current state. You can see this at the top of the file, I have added this.menuOption = 'settings';

         */

        this.game.load.tilemap('level0', '/tiled/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', '/assets/tileset.png');
        this.game.load.image('player', '/assets/player.png');
    
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this. IS DRIVING ME INSANE!!?? WHAT IS THIS.? LOL
        //this looks like a phaser specific thing. your best bet in situations like this is to google search for "scale.pageAlignVertically".
        //it seems its an automated way for phaser to position the game window in the browser window.
    },

    create: function() {
        
        console.log("Boot Completed");
        this.game.state.start("main");
        
    }
};