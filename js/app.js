/**************************
 *Declare global variables*
 **************************/
// Get Select player modal element:
const selectModal = document.querySelector('#select-player');
// Declare initial player image:
let playerSelected = 'images/char-boy.png';
//Declare Audio files objects in an object:
const audioFiles = {
    move: new Audio(`audio/move.wav`),
    collect: new Audio(`audio/collect.wav`),
    won: new Audio(`audio/won.wav`),
    collision: new Audio(`audio/collision.wav`)
};
// Declare movement multiplier and assign 40 into it as initial multiplyer:
let movementMultip = 40;
// Declare initial images boxe dimensions drawed inside our canvas: 
const box = {
    width: 50,
    height: 40
}


/*****x************
 *Create functions*
 ******************/

// Create getImage function that sets playerSelected by user:
function getImage(id) {
    let imageSelected = document.getElementById(id);// get image element by its Id that user clicked on
    playerSelected = imageSelected.getAttribute('src');// get player image source selected by user 
    imageSelected.style.opacity = 1;// change image opacity on click
    //When clicked, hide select model element after 1 seconde
    setTimeout(() => {
        selectModal.classList.add('hide');
        let gameCanvas = document.querySelector('canvas');
        gameCanvas.style.display = 'initial';
    }, 1000);
}

/*****x**********
 *Create classes*
 ****************/

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
    // Check if player collides with an enemy,
    // the player moves back to the start square
    checkCollisions() {
        // Get actual player position
        let playerPosition =  {
            x: player.x,
            y: player.y,
            width: box.width,
            height: box.height
        }
        // Get actual enemy position
        let enemyPosition = {
            x: this.x,
            y: this.y,
            width: box.width +10,
            height: box.height
        }
        // If collision happened:
        if (playerPosition.x < enemyPosition.x + enemyPosition.width && playerPosition.x + playerPosition.width > enemyPosition.x && playerPosition.y < enemyPosition.y + enemyPosition.height && playerPosition.y + playerPosition.height > enemyPosition.y) {
            audioFiles.collision.play();// Play sound
            player.resetPlayer();// Reset player initial position
            player.remainAlive--;// Decrese player lives
            lives.pop();// remove life object from lives array
            //If Player has less than 3 lives, display live key bonus 
            (player.remainAlive < 3 && player.remainAlive >0) && keyLive.display();
        }
    
    }

    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    // Create player costructor with sprite argument
    constructor(sprite) {
        this.sprite = sprite;// this will get image source before selecting player by user
        this.x = 200;
        this.y = 400;
        this.moveX = 100;//Player horizontal move ratio 
        this.moveY = -83;//Player vertical move ratio 
        this.remainAlive = 3;// Give player 3 lives
        this.level = 1;// Initial game level
        this.score = 0;// Initial game score
    }

    update() {
        this.sprite = playerSelected;// Set Player image source after selecting player by user
        this.gameOver();// call game over methode if player lose all lives
    }
    // Draw the player object, score, hearts live and level on our canvas:
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);// Draw player
        ctx.font = '24px arial';// Style level and score font
        ctx.strokeStyle = '#4caf50';//Style level color
        ctx.strokeText('Level: '+this.level, 200, 30);// Draw level
        ctx.fillText('Score: '+this.score, 350, 30);// Draw score
    }
    // Move player with arrows keys & prevent move if player will be offscreen
    handleInput(allowedKeys) {
        if (allowedKeys == 'left' && this.x > 0) {// If user press left key
            this.x -= this.moveX;// Move player 100px to the left
            audioFiles.move.play();// Play move sound effect
        }
        if (allowedKeys == 'right' && this.x < 400) {// If user press right key
            this.x += this.moveX;// Move player 100px to the right
            audioFiles.move.play();// Play move sound effect
        }
        if (allowedKeys == 'up' && this.y > 0) {// If user press up key
            this.y += this.moveY;// Move player 83px up
            audioFiles.move.play();// Play move sound effect
        }
        if (allowedKeys == 'down' && this.y < 400) {// If user press down key
            this.y -= this.moveY;// Move player 83px down
            audioFiles.move.play();// Play move sound effect
        }
        (allowedKeys == 'reload') && document.location.reload(true);
    }

    // Check if player reachs the water increase level & reset his position
    reachWater() {
        
       if (this.y === -15) {// If player reaches water
            audioFiles.won.play();// Play won sound effect
            movementMultip += 10;// Increase enemies speed by adding 10 to movement multiplier
            this.level++;// increase level
            // Display star score in the same pleyr position
            star.x = this.x;
            star.y = this.y;
            // Add score
            this.addScore();
            // Reset player to his initial position
            this.resetPlayer();
            // Hide the star score after 2 secondes
            setTimeout(() => {
                star.x = -100;
                star.y = -100;
                gem.display();
            }, 2000);
        }       
    }
    // Create prototype function that adds score
    addScore() {
        // Create array to store inside different player x position  coordinates in canvas columns
        const playerX = [0, 100, 200, 300, 400];
        // Create array to store inside different score ration in canvas columns
        const scores = [100, 80, 60, 40, 20];
        // Loop over playerX & scores arrays to match each array value based on their indexes
        for (let x = 0; x <= playerX.length ; x++) {
            if (playerX[x] == this.x) {// If the value array matches players column position
                this.score+= scores[x];// Add aray value to score
                star.score = scores[x];// Show the score value to be added on the star displayed
            }
        }
    }

    // Create prototype function that resets player position
    resetPlayer() {
       this.x = 200;
       this.y = 400;
    }

    // Create game over prototype function
    gameOver() {
        let gameOverModal = document.querySelector('#game-over');// Get Game over modal element
        let stats = document.querySelector('#stats');// get Stats elemnt
        if (this.remainAlive < 1) {// If player loses all his lives
            this.x = -100;// move player offscreen
            allEnemies = [];// delete enemies
            gameOverModal.classList.remove('hide');// Show gmae over modal element
            //Inner stats text 
            stats.innerHTML = `${gem.gemCollected} gems collected.
            Score: ${this.score}.
            Level: ${this.level}`;
            Player.score = 0;
        }
    }
}


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




class Star {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/Star.png';
        this.score = 0;
        this.gemScore = undefined;
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
    constructor(sprite, x, y) {
        this.x = x;
        this.positionX = [0, 100, 200, 300, 400];
        this.y = 70;
        this.positionY = [80, 165, 250];
        this.sprite = sprite;
        this.type = ['orange', 'blue', 'green'];
        this.gemSelected = undefined;
        this.gemCollected = 0;
    }

    random() {
        this.gemSelected = (Math.floor(Math.random() * this.type.length));
        this.sprite = `images/gem-${this.type[this.gemSelected]}.png`;
        this.x = this.positionX[Math.floor(Math.random() * this.positionX.length)];
        this.y = this.positionY[Math.floor(Math.random() * this.positionY.length)];
        console.log(this.sprite, this.x, this.gemSelected)
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x+10, this.y, 80, 135);
    }

    display() {
        this.random();
        setTimeout(() => {
            this.x = -100;
        }, 6000);
    }

    checkCollisions() {

        let playerPosition =  {
            x: player.x,
            y: player.y,
            width: box.width,
            height: box.height
        }
        let gemPosition = {
            x: this.x,
            y: this.y,
            width: box.width +10,
            height: box.height
        }

        if (playerPosition.x < gemPosition.x + gemPosition.width && playerPosition.x + playerPosition.width > gemPosition.x && playerPosition.y < gemPosition.y + gemPosition.height && playerPosition.y + playerPosition.height > gemPosition.y) {
            audioFiles.collect.play();
            player.score += (this.gemSelected+1)*100;
            this.x = -100;
            this.gemCollected++;
        }
        
    }
}

let gem = new Gems('images/gem-blue.png');

class Keylive {
    constructor(x, y) {
        this.sprite = 'images/key.png';
        this.x = x;
        this.positionX = [0, 100, 200, 300, 400];
        this.y = y;
        this.positionY = [80, 165, 250];
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x+10, this.y, 80, 135);
    }

    random() {
        this.x = this.positionX[Math.floor(Math.random() * this.positionX.length)];
        this.y = this.positionY[Math.floor(Math.random() * this.positionY.length)];
    }

    display() {
        this.random();
        setTimeout(() => {
            this.x = -100;
        }, 6000);
    }

    checkCollisions() {

        let playerPosition =  {
            x: player.x,
            y: player.y,
            width: box.width,
            height: box.height
        }
        let keyPosition = {
            x: this.x,
            y: this.y,
            width: box.width +10,
            height: box.height
        }

        if (playerPosition.x < keyPosition.x + keyPosition.width && playerPosition.x + playerPosition.width > keyPosition.x && playerPosition.y < keyPosition.y + keyPosition.height && playerPosition.y + playerPosition.height > keyPosition.y) {
            audioFiles.collect.play();
            player.remainAlive++;
            let heart = new Life(lives.length*20, 0);
            lives.push(heart);
            this.x = -100;
        }
        
    }


}

let keyLive = new Keylive(-200, 200);


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


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'reload'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    player.reachWater();
    gem.checkCollisions();
    keyLive.checkCollisions();
});
