$(document).ready(function (){
    var url = "http://localhost:3000/todo/";

    function sendRequest(url, httpMethod, body, cb) {
        $.ajax({
            method:httpMethod,
            url:url,
            dataTyle:"json",
            data:body
        })
        .done(cb);
    }
     
    function restart() {
        $('#main').html('');
        sendRequest(url,"GET",null,function (result) {
            for (var note of result){
                creator(note);
            }
        });
    }

    function creator (note) {
        var container= $('<div>').addClass('quote-container').appendTo($('#main'));
        var inside = $('<div>').addClass('note yellow').text(note.title).appendTo(container);
        var pin = $('<i>').addClass('pin').appendTo(inside);
        var X = $('<button>').html('X').addClass('btnX').click(function () {deleteElement(note.id)}).appendTo(container);
    }

    restart();

    $('#btnJquery').click(function() {
        var input = $('#input').val();
        sendRequest(url,"POST",{"title": input});
        restart();
    });

    function deleteElement(id) {
        sendRequest(url+JSON.stringify(id),"DELETE",JSON.stringify({}),restart);
    }
});