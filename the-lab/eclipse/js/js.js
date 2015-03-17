$(function(){

	/*
	* Variables
	*/
	var START_TIME;
	var PAUSE_TIME;
	var IS_TIMER_ACTIVE = false;
	var IS_DELAY_ACTIVE = false;
	var ZERO_TIMER = '<span class="minutes digits">0</span><span class="seconds digits">00</span><span class="milliseconds digits">.00</span>';
	var TIMER;
	var INTERVAL_TIMESTAMP  = 0;
	var COLORS = ['green', 'blue', 'red', 'orange', 'yellow', 'purple'];
	var SOUND_LIBRARY = {
		start: 'sound-start',
		pause: 'sound-pause',
		interval: 'sound-interval',
		clear: 'sound-clear',
		minute: 'sound-minute'
	};

	var stopwatch = $('.stopwatch');
	var stopwatchValue = stopwatch.find('.value');
	var stopwatchM = stopwatch.find('.minutes');
	var stopwatchS = stopwatch.find('.seconds');
	var stopwatchMS = stopwatch.find('.milliseconds');
	var header = $('header');
	var aside = $('aside');
	var delayOn = $('.delay.on');
	var delayOff = $('.delay.off');


	/*
	* Events
	*/
	$('.stopwatch').click(function(event) {

		if (IS_DELAY_ACTIVE && stopwatch.hasClass('ready')) {
			delayTriggerTimer();
		} else {
			triggerTimer();
		}
	});

	$(window).keypress(function(event) {
		
		if (event.which == '32') { // Spacebar

			if (IS_DELAY_ACTIVE && stopwatch.hasClass('ready')) {
				delayTriggerTimer();
			} else {
				triggerTimer();
			}
	
		} else if (event.which == '13') { // Enter

			if (!stopwatch.hasClass('running')) {
				resetTimer();
			}
		} else if (event.which == '68') { // Shift + D Key

			if (IS_DELAY_ACTIVE) {
				IS_DELAY_ACTIVE = false;
				delayOff.fadeIn().delay(500).fadeOut();
			} else {
				IS_DELAY_ACTIVE = true;
				delayOn.fadeIn().delay(500).fadeOut();
			}
		}
	});
	
	$(window).resize(function(event) {
		centerStopwatch();
	});
	centerStopwatch();


	/*
	* Functions
	*/
	function centerStopwatch() {
		var newMargin = ($(window).height() - stopwatch.height())/2;
		stopwatch.css({'margin-top': newMargin});
	}

	function colorSwitch() {

		var currentColorIndex = null;

		// Remove any color classes before adding new color
		for (i=0; i<COLORS.length; i++) {
			if (stopwatch.hasClass(COLORS[i])) {
				currentColorIndex = i;
				stopwatch.removeClass(COLORS[i]);
			}
		}

		// Choose another color if it is the same as previous
		var randomNumber;
		do {
			randomNumber = Math.floor(Math.random()*COLORS.length);
		}
		while (currentColorIndex == randomNumber);
		stopwatch.addClass(COLORS[randomNumber]);
	}
	colorSwitch();

	function delayTriggerTimer() {
		var count = 0;
		var countdown = 4;

		playSound(SOUND_LIBRARY.interval);

		var delay = setInterval(function () {

			count++;

			if (count < countdown) {

				playSound(SOUND_LIBRARY.interval);

			} else if (count == countdown) {

				clearInterval(delay);
				triggerTimer(); 
			}

		}, 1000);
	}

	function triggerTimer() {

		if (stopwatch.hasClass('ready')) {
			playSound(SOUND_LIBRARY.start);

			toggleElements();  // Hide Elements
			
			stopwatch.addClass('running').removeClass('ready paused');

			START_TIME = new Date().getTime();
			
			// updateDisplay() every millisecond
			TIMER = setInterval(updateDisplay, 1);

		} else if (stopwatch.hasClass('running')){
			playSound(SOUND_LIBRARY.pause);

			toggleElements(); // Show Elements

			stopwatch.addClass('paused').removeClass('ready running');

			// Stop TIMER
			clearInterval(TIMER);

			PAUSE_TIME = new Date().getTime();

		} else if (stopwatch.hasClass('paused')) {
			playSound(SOUND_LIBRARY.start);
			
			toggleElements();

			stopwatch.addClass('running').removeClass('paused ready');

			// Fake a new START_TIME incorporating the PAUSE_TIME
			var currentTime = new Date().getTime();
			START_TIME = (currentTime - PAUSE_TIME) + START_TIME;

			TIMER = setInterval(updateDisplay, 1);
		}
	}

	function resetTimer() {
		playSound(SOUND_LIBRARY.clear);

		INTERVAL_TIMESTAMP = 0;

		stopwatch.addClass('ready').removeClass('paused running').fadeOut(200, function() {
			updateDigits([0, '00', '00']);
			colorSwitch();
		}).fadeIn(200);
	}

	function updateDisplay() {
		// Milliseconds passed = Current time - Time of Stopwatch Start click (START_TIME)
		var ms = new Date().getTime() - START_TIME;

		ms++;

		// Show new time value
		var array = msToTime(ms);

		updateDigits(array);
	}

	function updateDigits(array) {

		stopwatchM.text(array[0]);
		stopwatchS.text(array[1]);
		stopwatchMS.text('.' + array[2]);
	}

	function msToTime(ms) {
		var milliseconds = ms % 1000;
		var seconds = Math.floor((ms / 1000) % 60);
		var minutes = Math.floor((ms / (60 * 1000)) % 60);

		milliseconds = milliseconds.toString().substr(0, 2);
		milliseconds = (milliseconds < 10 ? '0' : '') + milliseconds;
		seconds = (seconds < 10 ? '0' : '') + seconds;
		//minutes = (minutes < 10 ? '0' : '') + minutes;

		// If 10 seconds have passed AND at least 9 seconds have passed since last beep
		if (seconds % 10 === 0 && INTERVAL_TIMESTAMP + 9000 < ms) {
			INTERVAL_TIMESTAMP = ms; // Update INTERVAL_TIMESTAMP to last beep time
			triggerInterval(seconds);
		}

		return [minutes, seconds, milliseconds]
	}

	function playSound(sound) {

		document.getElementById(sound).play();
	}

	function triggerInterval(seconds) {

		if (seconds % 60 === 0) {

			playSound(SOUND_LIBRARY.minute);

		} else {

			playSound(SOUND_LIBRARY.interval);
		}
	}

	function toggleElements() {
		header.fadeToggle();
		aside.fadeToggle();
	}
});