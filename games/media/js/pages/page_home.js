/* - BLITZGAMES APP --------------------------------------------------------- */
var BlitzGamesAppHome = {
	init: function() {
		this.projects.init();
	},
	projects: {
		$projects: null,
		config: {
			current: {
				$el: null
			},
			delay: 30, // Delay before showing next project [Milliseconds]
			fade: 100 // Time to fade each project in [Milliseconds]
		},
		init: function(){
			this.$projects = $('#projects .project');
			this.show();
			this.bind();
		},
		bind: function(){
			this.$projects.on('mouseenter mouseleave', $.proxy(BlitzGamesApp.animation.hover, this));
		},
		click: function(event){
			if( event.target.offsetParent.className === "stats" ) return; // Stops the window opening if the "stats" area is clicked!
			this.config.current.$el = $(event.currentTarget);
			BlitzGamesAppHome.window.control(event);
		},
		show: function(){
			this.$projects.each($.proxy(function(index, element){
				$(element).delay((index + 1) * this.config.delay).fadeIn(this.config.fade); // Incrementally show each project
			}, this));
		},
		deselect: function(){
			this.$projects.removeClass('selected');
		},
		select: function($element){
			$element.addClass('selected');
		}
	}

};


/* - DOM READY -------------------------------------------------------------- */
$(function() {

	// Initialize the Blitz Games App
	BlitzGamesAppHome.init();

});