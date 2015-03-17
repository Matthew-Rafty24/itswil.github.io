$(function(){
	// Scroll to top
	$('.scroll-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop:'0px'}, 500);
	});

	// IE7/8 background hack: faking media queries
	if ($.browser.msie && parseInt($.browser.version, 10) === 8 || $.browser.msie && parseInt($.browser.version, 10) === 7) {

		var bg = $('.bg img');

		function resizeBG() {
			if ($(window).width() < 480) {
				bg.css({'width': '1200px'})
			} else if ($(window).width() >= 480 && $(window).width() < 1024) {
				bg.css({'width': '1400px'})
			} else if ($(window).width() > 1680) {
				bg.css({'width': '100%'})
			} else {
				bg.css({'width': '1680px'});
			}
		}
		// Init
		bg.show();
		resizeBG();

		// On resize
		$(window).resize(function(event) {
			resizeBG();
		});
	}
});