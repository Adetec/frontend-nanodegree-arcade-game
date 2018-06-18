let movementMultip = 40;
// Enemies our player must avoid
class Enemy {
    constructor(x, y, sp) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.sp = sp;
        //
        // Draw the enemy on the screen, required method for game
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    }

    // Random speed movement for each new Enemy
    randomSpeed() {
        this.sp = movementMultip * Math.floor(Math.random() * 10+1);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        let run = ()=>{this.x = -300; ; this.randomSpeed()};
        (this.x<505)?  this.x += this.sp * dt : run();
        
         
        
    }

    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
        this.moveX = 100;
        this.moveY = -83;
        this.remainAlive = 3;
        this.level = 1;
    }

    update() {
    
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
    // move player with arrows keys & prevent move if player will be offscreen
    handleInput(allowedKeys) {
        if (allowedKeys == 'left' && this.x > 0) {
            this.x -= this.moveX;
        }
        if (allowedKeys == 'right' && this.x < 400) {
            this.x += this.moveX;
        }
        if (allowedKeys == 'up' && this.y > 0) {
            this.y += this.moveY;
        }
        if (allowedKeys == 'down' && this.y < 400) {
            this.y -= this.moveY;
        }        
    }
    // Check if player reach the water reset his position & increase level
    increaseLevel() {
       if (this.y === -15) {
           setTimeout(() => {
            this.x = 200;
            this.y = 400;    
           }, 100);
           movementMultip += 10;
           this.level++;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let pos = 60;
//let xStart = -200;

for (let num = 1; num <= 3; num++){
    
    console.log(pos)
    
    let bug = new Enemy(-1000,pos, 200);
    
    allEnemies.push(bug);
    pos +=85;   
}
// Place the player object in a variable called player
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    player.increaseLevel();
});
