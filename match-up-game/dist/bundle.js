/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./Board */ "./src/Board.js")
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDMUVBLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0QsWUFBWTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrQkFBa0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxRQUFRO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUMsS0FBSztBQUNMLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fYm9hcmQgPSBuZXcgQXJyYXkoKVxyXG4gICAgICAgIHRoaXMuX2ZhaWxzID0gMFxyXG4gICAgfVxyXG4gICAgZ2V0IGJvYXJkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib2FyZFxyXG4gICAgfVxyXG4gICAgZ2V0IGZhaWxzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mYWlsc1xyXG4gICAgfVxyXG4gICAgZ2V0IG9wZW5DYXJkcygpIHtcclxuICAgICAgICBsZXQgb3BlbkNhcmRzID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2JvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ib2FyZFtpXVtcInN0YXR1c1wiXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuQ2FyZHMucHVzaChpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcGVuQ2FyZHNcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsR2FtZShzaXplKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8PSBzaXplIDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNhcmQxID0gbmV3IE9iamVjdCgpXHJcbiAgICAgICAgICAgIGNhcmQxW1wiaWRcIl09IGlcclxuICAgICAgICAgICAgY2FyZDFbXCJzdGF0dXNcIl0gPSAyXHJcbiAgICAgICAgICAgIHRoaXMuX2JvYXJkLnB1c2goY2FyZDEpXHJcbiAgICAgICAgICAgIGxldCBjYXJkMiA9IG5ldyBPYmplY3QoKVxyXG4gICAgICAgICAgICBjYXJkMltcImlkXCJdID0gaVxyXG4gICAgICAgICAgICBjYXJkMltcInN0YXR1c1wiXSA9IDJcclxuICAgICAgICAgICAgdGhpcy5fYm9hcmQucHVzaChjYXJkMilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2h1ZmZsZShzaXplICogMilcclxuICAgIH1cclxuXHJcbiAgICBfc2h1ZmZsZShzaXplKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG9uZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNpemUpXHJcbiAgICAgICAgICAgIGxldCB0d28gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKVxyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMuX2JvYXJkW29uZV1cclxuICAgICAgICAgICAgdGhpcy5fYm9hcmRbb25lXSA9IHRoaXMuX2JvYXJkW3R3b11cclxuICAgICAgICAgICAgdGhpcy5fYm9hcmRbdHdvXSA9IHRlbXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbXBhcmUoKXtcclxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm9wZW5DYXJkc1xyXG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYm9hcmRbYXJyYXlbMF1dLmlkID09IHRoaXMuX2JvYXJkW2FycmF5WzFdXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmRbYXJyYXlbMF1dLnN0YXR1cyA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JvYXJkW2FycmF5WzFdXS5zdGF0dXMgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmRbYXJyYXlbMF1dLnN0YXR1cyA9IDJcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JvYXJkW2FycmF5WzFdXS5zdGF0dXMgPSAyXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mYWlscyArK1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGlzV2luKCl7XHJcbiAgICAgICAgbGV0IHdpbkJvb2xlYW4gPSB0cnVlXHJcbiAgICAgICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLl9ib2FyZCl7XHJcbiAgICAgICAgICAgIGlmIChjYXJkW1wic3RhdHVzXCJdICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbkJvb2xlYW4gPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3aW5Cb29sZWFuXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9hcmQiLCJjb25zdCBCb2FyZCA9IHJlcXVpcmUoJy4vQm9hcmQnKVxyXG5jb25zdCBCT0FSRF9TSVpFID0gN1xyXG5jb25zdCBVUkwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2NhcmRzJ1xyXG5jb25zdCBub3RpZmljYXRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vdGlmaWNhdGlvbnMnKVxyXG5sZXQgYm9hcmQgPSBuZXcgQm9hcmQoKVxyXG5sZXQgYm9hcmREYXRhID0gbnVsbFxyXG5cclxuc3RhcnRHYW1lKClcclxubW92aW5nQW5pbWFsKClcclxuYm9hcmQuaW5pdGlhbEdhbWUoQk9BUkRfU0laRSlcclxuZmV0Y2goVVJMKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgYm9hcmREYXRhID0gZGF0YVxyXG4gICAgICAgIHJlbmRlckJvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpLGJvYXJkLGJvYXJkRGF0YSxvbk1hdGNoLG9uV2luKVxyXG4gICAgfSlcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcclxuICAgIGxldCBvYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1nU3RhcnQnKVxyXG4gICAgb2JqZWN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gb2JqZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIiwxNDAwKVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJCb2FyZChjb250YWluZXIsYm9hcmQsZGIsb25NYXRjaCxvbldpbil7XHJcbiAgICBub3RpZmljYXRpb25zLmlubmVySFRNTCA9IGBVbnN1Y2Nlc3NmdWwgYXR0ZW1wdHM6ICR7Ym9hcmQuZmFpbHN9YFxyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXHJcbiAgICBmb3IgKGxldCBjZWxsIG9mIGJvYXJkLmJvYXJkKSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGxldCB0aGlzVXJsXHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSA9IDA7IGl0ZW0gPCBkYi5sZW5ndGg7IGl0ZW0gKyspIHtcclxuICAgICAgICAgICAgaWYgKGRiW2l0ZW1dLmlkID09PSAoY2VsbC5pZCAlIGRiLmxlbmd0aCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzVXJsID0gZGJbaXRlbV1bXCJpbWFnZSB1cmxcIl1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2FyZC5pbm5lckhUTUwgPSBgPGltZyBzcmM9JHt0aGlzVXJsfT5gXHJcbiAgICAgICAgc3dpdGNoIChjZWxsLnN0YXR1cyl7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0ID0gJ2NhcmQgb2ZmJ1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jaGlsZE5vZGVzWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0ID0gJ2NhcmQnXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdCA9ICdjYXJkIGRvd24nXHJcbiAgICAgICAgICAgICAgICBjYXJkLmNoaWxkTm9kZXNbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FyZC5vbmNsaWNrID0gY2FyZE9uQ2xpY2suYmluZChudWxsLGNlbGwsY29udGFpbmVyLGJvYXJkLGRiLG9uTWF0Y2gsb25XaW4pXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhcmQpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcmRPbkNsaWNrKGNlbGwsY29udGFpbmVyLGJvYXJkLGRiLG9uTWF0Y2gsb25XaW4pIHtcclxuICAgIGlmIChjZWxsLnN0YXR1cyAhPT0gMCkgY2VsbC5zdGF0dXMgPSAxXHJcbiAgICByZW5kZXJCb2FyZChjb250YWluZXIsYm9hcmQsZGIsb25NYXRjaCxvbldpbilcclxuICAgIGlmIChib2FyZC5vcGVuQ2FyZHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoU3RhdGUgPSBib2FyZC5jb21wYXJlKClcclxuICAgICAgICBpZiAobWF0Y2hTdGF0ZSkge1xyXG4gICAgICAgICAgICBvbk1hdGNoKClcclxuICAgICAgICAgICAgbGV0IHdpblN0YXRlID0gYm9hcmQuaXNXaW4oKVxyXG4gICAgICAgICAgICBpZiAod2luU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIG9uV2luKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyQm9hcmQoY29udGFpbmVyLGJvYXJkLGJvYXJkRGF0YSxvbk1hdGNoLG9uV2luKVxyXG4gICAgICAgIH0sNTAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbk1hdGNoKCkge1xyXG4gICAgbGV0IG9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWdNYXRjaCcpXHJcbiAgICBvYmplY3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxyXG4gICAgc2V0VGltZW91dCgoKSA9PiBvYmplY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiLDcwMClcclxufVxyXG5cclxuZnVuY3Rpb24gb25XaW4oKSB7XHJcbiAgICBsZXQgb2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltZ1dpbicpXHJcbiAgICBvYmplY3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZpbmdBbmltYWwoKSB7XHJcbiAgICBjb25zdCBhbmltYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5pbWFsV2Fsa2luZycpXHJcbiAgICBsZXQgYW5pbWFsUG9zaXRpb24gPSAwXHJcbiAgICBsZXQgaXNGb3J3YXJkID0gdHJ1ZVxyXG4gICAgc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICBpZiAoaXNGb3J3YXJkKSBhbmltYWxQb3NpdGlvbiArKyBcclxuICAgICAgICBlbHNlIGFuaW1hbFBvc2l0aW9uIC0tXHJcbiAgICAgICAgaWYgKGFuaW1hbFBvc2l0aW9uID09IDApe1xyXG4gICAgICAgICAgICBpc0ZvcndhcmQgPSB0cnVlXHJcbiAgICAgICAgICAgIGFuaW1hbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGVYKDEpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuaW1hbFBvc2l0aW9uID09IHdpbmRvdy5pbm5lcldpZHRoIC0gMTUwKXtcclxuICAgICAgICAgICAgaXNGb3J3YXJkID0gZmFsc2VcclxuICAgICAgICAgICAgYW5pbWFsLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZVgoLTEpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5pbWFsLnN0eWxlLmxlZnQgPSBgJHthbmltYWxQb3NpdGlvbn1weGBcclxuICAgIH0sMTApXHJcbn0gIl0sInNvdXJjZVJvb3QiOiIifQ==