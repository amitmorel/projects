//BASIC FUNCTION
document.getElementById("btnBackUp").onclick = function () {
    var main = document.getElementById('main');
    var pin = document.createElement('i');
    pin.classList = 'pin';
    var inside = document.createElement('div');
    inside.innerHTML = document.getElementById('input').value;
    inside.classList = "note yellow";
    inside.appendChild(pin);
    var container = document.createElement('div');
    container.classList = 'quote-container';
        var btnX = document.createElement('button');
        btnX.innerHTML = 'X';
        btnX.classList = 'btnX';
        btnX.onclick = function () {this.parentNode.remove(this)};
        container.appendChild(btnX);
        container.appendChild(inside);
        main.appendChild(container);
    }


//SERVER FUNCTION
window.onload = function () {
    var xhttp = new XMLHttpRequest(); //
    xhttp.onreadystatechange = function() { //
        if (this.readyState == 4 && this.status == 200) { //
        var exist = JSON.parse(xhttp.responseText);
            for (var item of exist){
                addElement(item.title, item.id);
            }
        }
    };
    xhttp.open("GET", "http://localhost:3000/todo", true); //
    xhttp.send();

    
    btnAdd.onclick = function () {
        var input = document.getElementById('input').value;
        addElement(input);
        xhttp.open("POST", "http://localhost:3000/todo"); //
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //
        xhttp.send(JSON.stringify({ "title": input }));
        
    }

    function addElement(string,id) {
        var main = document.getElementById('main');
        var pin = document.createElement('i');
        pin.classList = 'pin';
        var inside = document.createElement('div');
        inside.innerHTML = string;
        inside.classList = "note yellow";
        inside.appendChild(pin);
        var container = document.createElement('div');
        container.classList = 'quote-container';
        var btnX = document.createElement('button');
        btnX.innerHTML = 'X';
        btnX.classList = 'btnX';
        btnX.onclick = function () {deleteElement(this,id)};
        container.appendChild(btnX);
        container.appendChild(inside);
        main.appendChild(container);
    }

    function deleteElement(item,id) {
        xhttp.open("DELETE", "http://localhost:3000/todo/"+JSON.stringify(id)); //
        xhttp.send(JSON.stringify({})); //
        item.parentNode.remove(item);
    }
}
