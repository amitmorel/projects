# Match Up Game
##Concept
### CSS
1. Over-Squared-Red-Picnic-Map game with rounded-corners cards 
1. Common back for all cards - image
1. layout - grid
### game cycle
1. Each click and change renders the view again - the DOM is exact display of the objects
1. before the game the player can choose the number of the cards for playing
1. game starts - a randomal order of cards over the board
1. when player clicks a card - the card is opened
when player clicks another card:
    * if the cards match - both will stay on the board
    * if the cards don't - both will be closed
1. Each fail is counted


## Componnents and Interactions
1. db.json
    ```js
    {"cards":
        [
            {
                "id":1,
                "image url": 'url'
            },
            /...
        ]
    }
    
    ```
1. ```html
    <body>
        <span id=triesCounter></span>
        <div id="board">
            <div class="card down"></div>
            <div class="card up"></div>
            <!-- ... -->
        </div>
    </body>
    ```
1. ```css
    body {/*background image of map*/}
    #board {display:grid /*and other props*/}
    .card {/*the corners and shape*/}
    .down {/*the back side of the card*/}
    .up {}
    
    ```
## `index.html`
    `function renderBoard(board)` - 
        for each card on board
        create `div.card`
        status 0/2 - cards closed
        status 1 - cards open
        onclick - can turn card in status 2 to 1
        triesCounter - shows board's `this._fails` attribute
    }

    `function getFromDB()` - fetch DB and sends to board
    
### `class Board`
####Attributes:
* `this._board` - owns 1D array of card literal objects `[{id,status},...]`

* (each card contains:
`id` - in database
`status` - 
    * 0 - card out of game
    * 1 - card is open in this round
    * 2 - card is closed
)

####Methods
* `initialGame(size)` - gets size, and pulls couples of same IDs
* `_shuffle` - called by `initialGame(size)` for shuffling the order of the ids in array `=>` by randomaizing two indexes in array, and replace between them (each time for 100 times)
* `compare()` - passes over array and finds two cards in status 1 `if (id == id)` `true =>` truns both to status 0 `false =>` turn both to status 2 and raises fails counter ++
* `isWin()` - win is when all cards are in status 0