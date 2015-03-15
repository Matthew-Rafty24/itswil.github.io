var Enlightenment = (function() {

    var init = function() {
        transcend();
    };

    var getHsl = function(h, s, l) {
        return 'hsl('+ h + ',' + s + '%,' + l + '%)';
    };

    var transcend = function() {
        var hue = Math.random() * 360;

        var body = document.body;
        body.style.backgroundColor = getHsl(hue, 100, 98);

        var bodyLinks = document.querySelectorAll('body a');
        for (var i = 0; i < bodyLinks.length; i++) {
            bodyLinks[i].style.color = getHsl(hue, 100, 30);
        }
    };

    return {
        init: init
    };

})();

setTimeout(Enlightenment.init, 1);
