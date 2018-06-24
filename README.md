# Classic Arcade Game Clone

## Table of Contents

* [Introduction](#introduction)
* [Game rules](#game-rules)
* [Additinal Functionality](#additinal-functionality)
* [Credits](#sound-effect-credits)

## Introduction:
### The game:
The game is part of the [Front-end Nano-degree project](https://github.com/udacity/frontend-nanodegree-arcade-game) from Udacity, you can play [here](http://adellassagarcade.bitballoon.com/).

### Game interface:
![Game interface](http://adellassagarcade.bitballoon.com/images/game-interface.jpg)
### When game starts:
A modal is displayed asking user to choose a player
![Select player modal](http://adellassagarcade.bitballoon.com/images/select-player-modal.jpg)
### When game is over
A modal is opened displaying game stats
![Game over modal](http://adellassagarcade.bitballoon.com/images/game-over-modal.jpg)

## Game rules

In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player have 3 lives, he can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once the player collides with an enemy, he moves back to the start square and loses a heart live. Once the player reaches the water, he wins and the score is incremented.
*  Player can collect gems. Once collected, the score is incremented depend on gem color.
*  If player collides with enemy and loses a heart, a key is displayed randomly, so he can try to collect it before it will be hidden in 6 secondes and win a new life.
*  Once the game is over, user can play again on pressing `p` key.

## Additinal functionality:
In addition to the basic functionality, there's more cool functionality to the game. For example, here are some additional features that I added:

### Player Selection:
Player can select his desired character before playing
### Score:
##### When player reaches water:
From left to right, a star is displayed, and player will have additional score depending on wich column he's positioned:
* Square 1: +100.
* Square 2: +80.
* Square 3: +60.
* Square 4: +40.
* Square 5: +20.

##### When player collect gems:
* Orange gem: +100.
* Blue gem: +200.
* Green gem: +300.

### Collectibles:
* Player can collect gems to win additional score like mentionned above.
* If player has less than 3 hearts, player will be allowed to win an additional heart by collectin the key

### Sound effect:

When something occurs like collision, item collected or game won, a sound effect is played

### keyboard shortcuts:

Player can press `P` key to restart game.

## Sound effects credits
1- `move.wav`: [Player moves](https://freesound.org/people/TheyCallMeCaudex/sounds/266138/)
2- `collect.wav`: [Collect items](https://freesound.org/people/Mattix/sounds/402766/)
3- `won.wav`: [Collect items](https://freesound.org/people/Higgs01/sounds/430925/)
4- `collision.wav`: [Collect items](https://freesound.org/people/noirenex/sounds/159408/)