const Board = require('./Board')
const BOARD_SIZE = 7
const URL = 'http://localhost:3000/cards'
const notifications = document.getElementById('notifications')
let board = new Board()
let boardData = null

startGame()
movingAnimal()
board.initialGame(BOARD_SIZE)
fetch(URL)
    .then(response => response.json())
    .then(data => {
        boardData = data
        renderBoard(document.getElementById('board'),board,boardData,onMatch,onWin)
    })

function startGame() {
    let object = document.getElementById('imgStart')
    object.style.display = "block"
    setTimeout(() => object.style.display = "none",1400)
}

function renderBoard(container,board,db,onMatch,onWin){
    notifications.innerHTML = `Unsuccessful attempts: ${board.fails}`
    container.innerHTML = ''
    for (let cell of board.board) {
        let card = document.createElement('div')
        let thisUrl
        for (let item = 0; item < db.length; item ++) {
            if (db[item].id === (cell.id % db.length) + 1) {
                thisUrl = db[item]["image url"]
                break
            }
        }
        card.innerHTML = `<img src=${thisUrl}>`
        switch (cell.status){
            case 0:
                card.classList = 'card off'
                card.childNodes[0].style.display = 'none'
                break
            case 1:
                card.classList = 'card'
                break
            case 2:
                card.classList = 'card down'
                card.childNodes[0].style.display = 'none'
                break
        }
        card.onclick = cardOnClick.bind(null,cell,container,board,db,onMatch,onWin)
        container.appendChild(card)
    }
}

function cardOnClick(cell,container,board,db,onMatch,onWin) {
    if (cell.status !== 0) cell.status = 1
    renderBoard(container,board,db,onMatch,onWin)
    if (board.openCards.length === 2) {
        let matchState = board.compare()
        if (matchState) {
            onMatch()
            let winState = board.isWin()
            if (winState) {
                onWin()
            }
        }
        setTimeout(() => {
            renderBoard(container,board,boardData,onMatch,onWin)
        },500)
    }
}

function onMatch() {
    let object = document.getElementById('imgMatch')
    object.style.display = "block"
    setTimeout(() => object.style.display = "none",700)
}

function onWin() {
    let object = document.getElementById('imgWin')
    object.style.display = "block"
}

function movingAnimal() {
    const animal = document.getElementById('animalWalking')
    let animalPosition = 0
    let isForward = true
    setInterval(()=>{
        if (isForward) animalPosition ++ 
        else animalPosition --
        if (animalPosition == 0){
            isForward = true
            animal.style.transform = 'scaleX(1)';
        }
        if (animalPosition == window.innerWidth - 150){
            isForward = false
            animal.style.transform = 'scaleX(-1)';
        }
        animal.style.left = `${animalPosition}px`
    },10)
} 