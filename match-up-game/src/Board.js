class Board {
    constructor () {
        this._board = new Array()
        this._fails = 0
    }
    get board() {
        return this._board
    }
    get fails() {
        return this._fails
    }
    get openCards() {
        let openCards = []
        for (let i = 0; i < this._board.length; i++) {
            if (this._board[i]["status"] == 1) {
                openCards.push(i)
            }
        }
        return openCards
    }

    initialGame(size) {
        for(let i = 1; i <= size ; i++){
            let card1 = new Object()
            card1["id"]= i
            card1["status"] = 2
            this._board.push(card1)
            let card2 = new Object()
            card2["id"] = i
            card2["status"] = 2
            this._board.push(card2)
        }
        this._shuffle(size * 2)
    }

    _shuffle(size){
        for (let i = 0; i < 100; i++){
            let one = Math.floor(Math.random() * size)
            let two = Math.floor(Math.random() * size)
            let temp = this._board[one]
            this._board[one] = this._board[two]
            this._board[two] = temp
        }
    }
    
    compare(){
        let array = this.openCards
        if (array.length == 2) {
            if (this._board[array[0]].id == this._board[array[1]].id) {
                this._board[array[0]].status = 0
                this._board[array[1]].status = 0
                return true
            }
            else {
                this._board[array[0]].status = 2
                this._board[array[1]].status = 2
                this._fails ++
                return false
                }
        }
        
    }

    isWin(){
        let winBoolean = true
        for (let card of this._board){
            if (card["status"] != 0) {
                winBoolean = false
            }
        }
        return winBoolean
    }
}

module.exports = Board