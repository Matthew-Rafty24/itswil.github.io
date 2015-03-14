var Enlightenment = (function() {

    var COLORS = [
        'blue',
        'green',
        'orange',
        'red',
        'purple',
        'yellow'
    ];

    var init = function() {
        var body = document.body;
        var randomNumber = Math.floor(Math.random() * COLORS.length);

        body.className += ' enlighten enlighten-' + COLORS[randomNumber];
    };

    return {
        init: init
    };

})();

setTimeout(Enlightenment.init, 1);
