/* - BLITZGAMES APP --------------------------------------------------------- */
var BlitzGamesApp = {

	init: function() {
		this.enable();
		this.mobile.init();
		this.fancybox.init();
	},
	enable: function(){
		$('body').removeAttr('class'); // This removes the no-js class
	},
	windowSize: function(){
		var $window = $(window),
			width = $window.width(),
			size = '';
		if(width > 1300){
			size = 'widescreen';
		}
		else if(width > 768){
			size = 'computer';
		}
		else if(width > 480 && width <= 768){
			size = 'tablet';
		}
		else if(width > 225 && width <= 480){
			size = 'smartphone';
		}
		else if(width <= 225){
			size = 'phone';
		}
		return size; // Return the size string
	},
	analytics: {
		track: function(category, action, opt_label, opt_value){
			_gaq = _gaq || false;
			category = category || null;
			action = action || null;
			opt_label = opt_label || null;
			opt_value = opt_value || null;
			if( _gaq ){
				_gaq.push(['_trackEvent', category, action, opt_label, opt_value]);
			}
		}
	},
	mobile: {
		$handle: $('#mobile-handle'),
		$nav: $('header nav'),
		init: function(){
			this.bind();
		},
		bind: function(){
			this.$handle.on('click', $.proxy(this.toggle, this));
		},
		toggle: function(event){
			event.preventDefault();
			(this.$nav.is(':visible') ? this.$nav.removeAttr('style') : this.$nav.show());
		}
	},
	popup: {
		open: function(url, windowName, width, height, scrollbars){
			var position = {
				left: ( screen.width ? (screen.width - width) / 2 : 100 ),
				top: ( screen.height ? (screen.height - height) / 2 : 100 )
			},
			settings = 'width=' + width + ',height=' + height + ',top=' + position.top + ',left=' + position.left + ',scrollbars=' + scrollbars + ',location=no,directories=no,status=0,menubar=no,toolbar=no,resizable=no';
			window.open(url, windowName, settings);
		}
	},
	game: {
		$window: null,
		init: function($window){
			this.$window = $window;
			this.bind();
		},
		bind: function(){
			this.$window.find('#video .play-icon').on('click', $.proxy(this.video.click, this.video));
		},
		video: {
			click: function(event){
				if( event ) event.preventDefault();
				this.render();
			},
			render: function(){
				var parent = BlitzGamesApp.game;
				var $video = parent.$window.find('#video');
				var source = $video.data('source');
				$video.html('<iframe class="video" src="http://www.youtube.com/embed/' + source + '?wmode=opaque&autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>');
				BlitzGamesApp.analytics.track(parent.$window.find('h1').text(), 'Window', 'Video Play'); // Track the click
			}
		}
	},
	animation: {
		hover: function(event){
			var $el = $(event.currentTarget);
			switch( event.type ){
				case 'mouseenter':
					$el.find('img').stop(true).fadeTo(250, 0.6);
					break;
				case 'mouseleave':
					$el.find('img').stop(true).fadeTo(100, 1);
					break;
			}
		}
	},
	fancybox: {
		init: function(){
			$('.fancybox').fancybox({
				helpers: {
					overlay: {
						css: {
							'overflow': 'hidden'
						}
					}
				}
			});
		}
	}
};


/* - DOM READY -------------------------------------------------------------- */
$(function() {

	// Initialize the Blitz Games App
	BlitzGamesApp.init();

});