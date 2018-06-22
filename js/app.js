const modal = document.querySelector('.modal');
let playerSelected = 'images/char-boy.png';
function getImage(id) {
    let imageSelected = document.getElementById(id);
    console.log(imageSelected.getAttribute('src'));
    playerSelected = imageSelected.getAttribute('src');
    imageSelected.style.opacity = 1;
    setTimeout(() => {
        modal.classList.add('hide');
        let gameCanvas = document.querySelector('canvas');
        gameCanvas.style.display = 'initial';
    }, 1000);
}

let movementMultip = 40;
const box = {
    width: 50,
    height: 40
}
let waterScore = 0;
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

    checkCollisions() {

        let playerPosition =  {
            x: player.x,
            y: player.y,
            width: box.width,
            height: box.height
        }
        let enemyPosition = {
            x: this.x,
            y: this.y,
            width: box.width +10,
            height: box.height
        }

        if (playerPosition.x < enemyPosition.x + enemyPosition.width && playerPosition.x + playerPosition.width > enemyPosition.x && playerPosition.y < enemyPosition.y + enemyPosition.height && playerPosition.y + playerPosition.height > enemyPosition.y) {
            player.resetPlayer();
            player.remainAlive--;
            lives.pop();
        }
        
    }

    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(sprite) {
        this.sprite = sprite;
        this.x = 200;
        this.y = 400;
        this.moveX = 100;
        this.moveY = -83;
        this.remainAlive = 3;
        this.level = 1;
        this.score = 0;
    }

    update() {
        this.gameOver();
        this.sprite = playerSelected;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.font = '24px fantasy';
        ctx.strokeStyle = '#4caf50';
        ctx.strokeText('Level: '+this.level, 200, 30);
        ctx.fillText('Score: '+this.score, 350, 30)
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
    // Check if player reachs the water increase level & reset his position
    reachWater() {
        
       if (this.y === -15) {
        movementMultip += 10;
        this.level++;
        star.x = this.x;
        star.y = this.y;
        this.addScore();
        this.resetPlayer();
            setTimeout(() => {
                star.x = -100;
                star.y = -100;
            }, 2000);
        }       
    }

    addScore() {
        const playerX = [0, 100, 200, 300, 400];
        const scores = [100, 80, 60, 40, 20];
        for (let x = 0; x <= playerX.length ; x++) {
            if (playerX[x] == this.x) {
                this.score+= scores[x];
                star.score = scores[x];
            }
        }
    }

    // reset player position
    resetPlayer() {
       this.x = 200;
       this.y = 400;
    }

    gameOver() {
        if (this.remainAlive < 1) {
            this.x = -100;
            allEnemies = [];
            ctx.strokeText('game over', 200, 300);   
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let pos = 60;
//let xStart = -200;

for (let num = 1; num <= 3; num++){
    
    
    let bug = new Enemy(-1000,pos, 200);
    
    allEnemies.push(bug);
    pos +=85;   
}
// Place the player object in a variable called player
let player = new Player(playerSelected);

class Life {
    constructor(x, y) {
        this.sprite = 'images/Heart.png';
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 42;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
        
    }
}

let lives = [];

for (let i = 1; i <= player.remainAlive; i++) {
    let heart = new Life(i*20, 0);
    lives.push(heart);
    
}


class Star {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/Star.png';
        this.score = 0;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.font = '16px arial';
        ctx.strokeStyle = 'red';
        ctx.strokeText('+'+this.score, this.x+35, this.y+110);
        
    }
}

let star = new Star(-100, -100);

class Gems {
    constructor() {
        this.x = 100;
        this.y = 300;
        this.sprite = 'images/gem-blue.png';
    }
}



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
    player.reachWater();
});
