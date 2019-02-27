window.onload = function () {
    // var url = 'https://json-server-mv5sc1igk.now.sh/shopify/products/';
    var imgUrl = 'https://picsum.photos/200/?image=';
    // var headers = { 'content-type': 'application/json' };
    var mainDiv = document.getElementById('areaProducts');
    var cartBody = document.getElementById('cartBody');
    var cart = document.getElementById('areaCart');
    
    changeColors();
    loadProducts();
    loadCart();

    function changeColors() {
        var colors = document.getElementById('colors');
        colors.oninput = function () {
            document.querySelector(':root').style.setProperty('--main-color', colors.value);
        };
    }

    //unused in 'now' version
    function sendRequest(httpMethod, url, headers, body, cb) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (cb) cb(xhr.responseText);
        };
        xhr.open(httpMethod, url);

        if (headers) {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        xhr.send(body);
    }

    function loadProducts() {
        // sendRequest('GET', url, headers, null, function (answer) {
        for (let item of database()) {
            // (function (x) {
            var container = document.createElement('div');
            container.classList = 'item';
            var img = document.createElement('img');
            img.src = imgUrl + item.image;
            container.appendChild(img);
            var title = document.createElement('span');
            title.innerHTML = item.name + '  ' + item.price + '₪';
            container.appendChild(title);
            var cart = document.createElement('button');
            cart.innerHTML = '<i class="fas fa-cart-plus"></i>';
            cart.onclick = function () { addToCart(item.id, item.name, item.price); };
            container.appendChild(cart);
            mainDiv.appendChild(container);
            // })(item);
        }
        // });
    }
    document.getElementById('btnCart').onclick = function () {
        if (cart.style.display == 'none') {
            cart.style.display = 'block';
        }
        else {
            cart.style.display = 'none';
        }
    };

    function addToCart(id, name, price) {
        var cartMemory = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
        var isUnique = true;
        for (var item of cartMemory) {
            if (id == item.id) {
                isUnique = false;
                item.quantity += 1;
            }
        }
        if (isUnique) {
            cartMemory.push({
                id: id,
                name: name,
                quantity: 1,
                price: price
            });
        }
        localStorage.setItem('cart', JSON.stringify(cartMemory));
        loadCart();
        cart.style.display = 'block';
    }

    function loadCart() {
        cartBody.innerHTML = '';
        var cartMemory = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
        var totalPrice = 0;
        var orderArray = [];
        if (cartMemory) {
            for (var item of cartMemory) {
                var row = document.createElement('tr');
                row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>
                    ${item.quantity}</td><td>${item.price}</td>`;
                cartBody.appendChild(row);
                totalPrice += parseInt(item.price) * parseInt(item.quantity);
                orderArray.push(item.id);
            }
        }
        document.getElementById('totalPrice').innerHTML = totalPrice;
        document.getElementById('btnBuyNow').onclick = function () {
            // sendRequest('POST', 'http://localhost:3000/orders/', headers, JSON.stringify({
            //     productIds: orderArray,
            //     totalPrice: totalPrice
            // }), function () {
                cart.innerHTML = '<span id="success"> Order Made Successfully</span>';
                localStorage.clear();
            // });
        };
    }

    document.getElementById('clearCart').onclick = function () {
        localStorage.clear();
        loadCart();
    };

    function database () {
        var data = [{
            id: 1,
            image: "077",
            name: "Davidson's Wavewing",
            price: 88
        }, {
            id: 2,
            image: "913",
            name: "Winter Creeper",
            price: 99
        }, {
            id: 3,
            image: "721",
            name: "Woolly Hawkweed",
            price: 102
        }, {
            id: 4,
            image: "596",
            name: "Hayfield Tarweed",
            price: 12
        }, {
            id: 5,
            image: "094",
            name: "Yellow Phacelia",
            price: 116
        }, {
            id: 6,
            image: "951",
            name: "Fragrant Sage",
            price: 78
        }, {
            id: 7,
            image: "973",
            name: "Lophophora",
            price: 20
        }, {
            id: 8,
            image: "929",
            name: "Thymeleaf Buckwheat",
            price: 110
        }, {
            id: 9,
            image: "886",
            name: "Cupseed",
            price: 76
        }, {
            id: 10,
            image: "280",
            name: "Wattle Signalgrass",
            price: 26
        }, {
            id: 11,
            image: "431",
            name: "Narrowleaf Pussytoes",
            price: 92
        }, {
            id: 12,
            image: "908",
            name: "White Snakeroot",
            price: 67
        }, {
            id: 13,
            image: "214",
            name: "Compact Prairie Clover",
            price: 23
        }, {
            id: 14,
            image: "077",
            name: "Sasanqua Camellia",
            price: 113
        }, {
            id: 15,
            image: "512",
            name: "Purple Poppymallow",
            price: 81
        }, {
            id: 16,
            image: "824",
            name: "Chihuahuan Lovegrass",
            price: 61
        }, {
            id: 17,
            image: "817",
            name: "Aboriginal Willowherb",
            price: 40
        }, {
            id: 18,
            image: "908",
            name: "African Couchgrass",
            price: 102
        }, {
            id: 19,
            image: "381",
            name: "Tunbridge Filmy Fern",
            price: 73
        }, {
            id: 20,
            image: "151",
            name: "Upright Chickweed",
            price: 69
        }, {
            id: 21,
            image: "424",
            name: "Lecidea Lichen",
            price: 85
        }, {
            id: 22,
            image: "157",
            name: "Tapertip False Wheatgrass",
            price: 13
        }, {
            id: 23,
            image: "182",
            name: "Flame Lily",
            price: 15
        }, {
            id: 24,
            image: "468",
            name: "Flame Violet",
            price: 69
        }, {
            id: 25,
            image: "633",
            name: "White Bur Cucumber",
            price: 22
        }, {
            id: 26,
            image: "637",
            name: "Canadian Horseweed",
            price: 60
        }, {
            id: 27,
            image: "522",
            name: "Pylais' Orthotrichum Moss",
            price: 66
        }, {
            id: 28,
            image: "386",
            name: "Moringa",
            price: 115
        }];

        return data
    }

};