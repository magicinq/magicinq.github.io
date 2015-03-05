/* - COVERS ----------------------------------------------------------------- */
var covers = {
	timeout: 7000,
	fade: 1000
}
var cycle = {
	timeout: 4000,
	transition: 500
}
function coversInit()
{

	// Hovering over the title / sub-title
	$('#covers-data .title, #covers-data .sub-title').hover(function() {

		// Pause the slide show
		coversHandleAction('pause');

	}, function() {

		// Restart the slide show again
		coversHandleAction('start');

	});

	// Ensure all covers are defined as covers (IE8 Fix)
	$('#covers li[data-type="cover"]').css({ backgroundSize: "cover" });

	// Bindings to the next arrow
	$('.covers-arrows #covers-prev').click(function(event) {

		// Prevent default actions
		event.preventDefault();

		// Go to the previous cover
		coversKeyPress('previous');

	});

	// Binding to the previous arrow
	$('.covers-arrows #covers-next').click(function(event) {

		// Prevent default actions
		event.preventDefault();

		// Go to the next cover
		coversKeyPress('next');

	});

	// Setup the covers navigation
	coversNavigation();

	// Setup the covers and start the animation
	coversSetup();

}
function coversSetup()
{

	// Define specific variables
	var coverData, coverLogo, coverTitle, coverSubTitle, logoElement, titleElement, subTitleElement;

	// Define the elements into variables
	logoElement = $('#covers-data .logo');
	titleElement = $('#covers-data .title');
	subTitleElement = $('#covers-data .sub-title');

	// Verify there is some cover data
	coverData = $('#covers .cover:eq(0) .cover-data');
	if( coverData.length > 0 )
	{

		// Check if there is a logo
		coverLogo = coverData.children('.logo');
		if( coverLogo.length > 0 )
		{

			// Update the cover logo
			logoElement.html( coverLogo.html() ).css({ marginRight: 0 });

		}

		// Check if there is a title
		coverTitle = coverData.children('.title');
		if( coverTitle.length > 0 )
		{

			// Update the cover logo
			titleElement.html('<em>' + coverTitle.html() + '</em>').css({ marginRight: 0 });

		}

		// Check if there is a sub-title
		coverSubTitle = coverData.children('.sub-title');
		if( coverSubTitle.length > 0 )
		{

			// Update the cover logo
			subTitleElement.html('<em>' + coverSubTitle.html() + '</em>').css({ marginRight: 0 });

		}

	}

	// Call to start the covers sliding
	covers.delay = setTimeout(coversAnimate, covers.timeout);

	// Show the first item in the nav
	coversNavigationHandle( $('#covers .cover:eq(0)').attr('id') );


}
function coversAnimate()
{

	// Define specific variables
	var currentIdx, nextIdx, coverData, coverLogo, coverTitle, coverSubTitle, logoElement, titleElement, subTitleElement;

	// Find the first cover
	currentIdx = $('#covers .current').index();

	// Calculate the next index
	nextIdx = ( (currentIdx + 1) < covers.maxCovers ) ? currentIdx + 1 : 0;

	// Handle the covers navigation
	coversNavigationHandle( $('#covers .cover:eq(' + nextIdx + ')').attr('id') );

	// Define the elements into variables
	logoElement = $('#covers-data .logo');
	titleElement = $('#covers-data .title');
	subTitleElement = $('#covers-data .sub-title');

	// Hide all the information, and do more on the last one..
	logoElement.animate({ marginRight: -300 }, covers.fade / 3, function() {

		// Clear up the style attribute
		$(this).removeAttr('style');

		// Clear up the inners
		$(this).html('');

	});
	
	titleElement.animate({ marginRight: -400 }, covers.fade / 3, function() {

		// Clear up the style attribute
		$(this).removeAttr('style');

		// Clear up the inners
		$(this).html('');

	});
	
	subTitleElement.animate({ marginRight: -400 }, covers.fade / 3, function() {
		// Clear up the style attribute
		$(this).removeAttr('style');

		// Clear up the inners
		$(this).html('');

		// Verify there is some cover data
		coverData = $('#covers .cover:eq(' + nextIdx + ') .cover-data');
		
		if (coverData.length > 0) {
			// Check if there is a logo
			coverLogo = coverData.children('.logo');
			
			if (coverLogo.length > 0) {
				// Update the cover logo
				logoElement.html( coverLogo.html() ).animate({ marginRight: 0 }, covers.fade / 3);
			}

			// Check if there is a title
			coverTitle = coverData.children('.title');
			
			if (coverTitle.length > 0) {
				// Update the cover logo
				titleElement.html('<em>' + coverTitle.html() + '</em>').animate({ marginRight: 0 }, covers.fade / 3);
			}

			// Check if there is a sub-title
			coverSubTitle = coverData.children('.sub-title');
			
			if (coverSubTitle.length > 0) {
				// Update the cover logo
				subTitleElement.html('<em>' + coverSubTitle.html() + '</em>').animate({ marginRight: 0 }, covers.fade / 3);
			}
		}
	});

	// Fade out the current cover
	$('#covers .cover:eq(' + currentIdx + ')').fadeOut(covers.fade, function() {
		// Remove the current class and the style attribute
		$(this).removeClass('current');
	});

	// Fade in the next cover
	$('#covers .cover:eq(' + nextIdx + ')').fadeIn(covers.fade, function() {
		// Add the current class
		$(this).addClass('current');
	});

	// Re-call this function to keep cycling
	covers.delay = setTimeout(coversAnimate, covers.timeout);
}

function coversHandleAction(action) {
	// Clear any current timeouts
	clearTimeout(covers.idle);
	clearTimeout(covers.delay);

	// Determine what action to handle
	if (action == 'pause') {
		// Define a time out for idle users
		covers.idle = setTimeout(coversAnimate, 15000);
	} else if (action == 'start') {
		// Restart the covers animation
		covers.delay = setTimeout(coversAnimate, covers.timeout / 2);
	}
}

function coversHandleSpecific(cover) {
	// Define specific variables
	var currentIdx, nextIdx, coverData, coverLogo, coverTitle, coverSubTitle, logoElement, titleElement, subTitleElement;

	// Find the first cover
	currentIdx = $('#covers .current').index();

	// Calculate the next index
	nextIdx = $('#covers #' + cover).index();

	// Only process if the current slide is not already seen
	if( (currentIdx != nextIdx) && (!$('#covers li').is(':animated')))
	{

		// Handle the covers navigation
		coversNavigationHandle( $('#covers .cover:eq(' + nextIdx + ')').attr('id') );

		// Pause the current cover animation
		clearTimeout(covers.idle);
		clearTimeout(covers.delay);

		// Define the elements into variables
		logoElement = $('#covers-data .logo');
		titleElement = $('#covers-data .title');
		subTitleElement = $('#covers-data .sub-title');

		// Hide all the information, and do more on the last one..
		logoElement.animate({ marginRight: -300 }, covers.fade / 3, function() {

			// Clear up the style attribute
			$(this).removeAttr('style');

			// Clear up the inners
			$(this).html('');

		});
		titleElement.animate({ marginRight: -400 }, covers.fade / 3, function() {

			// Clear up the style attribute
			$(this).removeAttr('style');

			// Clear up the inners
			$(this).html('');

		});
		subTitleElement.animate({ marginRight: -400 }, covers.fade / 3, function() {

			// Clear up the style attribute
			$(this).removeAttr('style');

			// Clear up the inners
			$(this).html('');

			// Verify there is some cover data
			coverData = $('#covers .cover:eq(' + nextIdx + ') .cover-data');
			if( coverData.length > 0 )
			{

				// Check if there is a logo
				coverLogo = coverData.children('.logo');
				if( coverLogo.length > 0 )
				{

					// Update the cover logo
					logoElement.html( coverLogo.html() ).animate({ marginRight: 0 }, covers.fade / 3);

				}

				// Check if there is a title
				coverTitle = coverData.children('.title');
				if( coverTitle.length > 0 )
				{

					// Update the cover logo
					titleElement.html('<em>' + coverTitle.html() + '</em>').animate({ marginRight: 0 }, covers.fade / 3);

				}

				// Check if there is a sub-title
				coverSubTitle = coverData.children('.sub-title');
				if( coverSubTitle.length > 0 )
				{

					// Update the cover logo
					subTitleElement.html('<em>' + coverSubTitle.html() + '</em>').animate({ marginRight: 0 }, covers.fade / 3);

				}

			}

		});

		// Fade out the current cover
		$('#covers .cover:eq(' + currentIdx + ')').fadeOut(covers.fade, function() {

			// Remove the current class and the style attribute
			$(this).removeClass('current');

		});

		// Fade in the next cover
		$('#covers .cover:eq(' + nextIdx + ')').fadeIn(covers.fade, function() {

			// Add the current class
			$(this).addClass('current');

		});

		// Re-call this function to keep cycling
		covers.delay = setTimeout(coversAnimate, covers.timeout);

	}

}
function coversNavigation()
{

	// Define function specific variables
	var currentCover, navWidth;

	// Loop through all the covers in the list
	$('#covers li[data-type="cover"]').each(function(i) {

		// Update the current cover id
		currentCover = $(this).attr('id');

		// Insert the item into the covers navigation unit
		$('#covers-nav').append('<li id="' + currentCover + '_nav"><a href="/" data-ref="' + currentCover + '">' + i + '</a></li>');

		// Bind the click event to this specific item
		$('#' + currentCover + '_nav a').click(function(event) {

			// Prevent default action
			event.preventDefault();

			// DEBUG
			coversHandleSpecific( $(this).attr('data-ref') );

		});

	});

	// Set the max covers variable
	covers.maxCovers = $('#covers .cover').length;

	// Calculate the total navigation width
	navWidth = covers.maxCovers * $('#covers-nav li').outerWidth(true, true);

	// Set the width on the covers navigation then fade it in
	$('#covers-nav').width(navWidth).fadeIn(1000);

	// Fade in the next and previous controls
	$('#covers-prev, #covers-next').fadeIn(1000);

}
function coversKeyPress(direction)
{

	// Define function specific variables
	var currentIdx, nextIdx, nextElement;

	// Find the first cover
	currentIdx = $('#covers .current').index();

	// Check which direction, and define the next index
	switch( direction )
	{
		case 'next':
			nextIdx = ((currentIdx + 1) == covers.maxCovers ) ? 0 : currentIdx + 1;
			break;
		case 'previous':
			nextIdx = ((currentIdx - 1) == -1 ) ? covers.maxCovers - 1 : currentIdx - 1;
			break;
	}

	// Get the element with the desired index
	nextElement = $('#covers .cover:eq(' + nextIdx + ')').attr('id');

	// Call the function to handle the switching
	coversHandleSpecific(nextElement);

}
function coversNavigationHandle(currentCover)
{

	// Ensure all covers nav have the current removed
	$('#covers-nav li').removeAttr('class');

	// Add the selected class to the current slide
	$('#covers-nav #' + currentCover + '_nav').addClass('current');

}


/* - CAREERS CYCLING -------------------------------------------------------- */
function startCycle(timeout)
{

	// Check if the time out is set or not
	var calcTimeout = (timeout) ? timeout : cycle.timeout;

	// Setup the timeout to do the first cycle
	cycle.delay = setTimeout(doCycle, calcTimeout);

}
function stopCycle()
{

	// Clear the current timeouts
	clearTimeout(cycle.delay);

}
function doCycle()
{

	// Clear any current timeouts
	clearTimeout(cycle.delay);

	// Define function specific variables
	var totalItems, currentItem, nextItem;

	// Get the total number of items, and calculate for 0 indexes
	totalItems = $('#careers-openings li').length - 1;

	// Get the current item's index
	currentItem = $('#careers-openings .current').index();

	// Calculate the next item
	nextItem = ( (currentItem + 1) <= totalItems ) ? currentItem + 1 : 0;

	// Check if the next item is the first one
	if( nextItem == 0 )
	{

		// Slide the first item back down
		$('#careers-openings li:eq(' + nextItem + ')').animate({ height: 22, opacity: 1 }, cycle.transition, function() {

			// Reset all the other elements to have the same height
			$('#careers-openings li').css({ height: 22, opacity: 1});

			// Remove the current class from the previous item
			$('#careers-openings li:eq(' + currentItem + ')').removeAttr('class');

			// And add it to this item
			$(this).addClass('current');

		});

	}
	else
	{

		// Fade up the current item
		$('#careers-openings li:eq(' + currentItem + ')').animate({ height: 0, opacity: 0 }, cycle.transition, function() {

			// Remove the current class from this item
			$(this).removeAttr('class');

			// Add the current class to the next item
			$('#careers-openings li:eq(' + nextItem + ')').addClass('current');

		});

	}

	// Recall the cycle delay
	cycle.delay = setTimeout(doCycle, cycle.timeout);

}


/* - FIXES ------------------------------------------------------------------ */
function fixesInit()
{

	// Hide the URL bar on iPhone/iPad
	fixesNavBar();

}
function fixesNavBar()
{

	// Scroll the body to the first pixel
	$('body').scrollTop(1);

}


/* - IMAGE PRELOADER -------------------------------------------------------- */
function preloadImages()
{

	// Define a area to place the images
	$('body').append('<ul id="image-preloader"></ul>');

	// Loop through all the covers in the list
	$('#covers li[data-type="cover"]').each(function(i) {

		// Define the background image URL
		var backgroundUrl = $(this).css('background-image');

		// Remove these urls from the string
		backgroundUrl = backgroundUrl.replace('http://local.blitzgamesstudios.com', '');
		backgroundUrl = backgroundUrl.replace('http://dev.blitzgamesstudios.com', '');
		backgroundUrl = backgroundUrl.replace('http://www.blitzgamesstudios.com', '');
		backgroundUrl = backgroundUrl.replace('http://blitzgamesstudios.com', '');

		// Remove the double quotes
		backgroundUrl = backgroundUrl.replace(/"/g, '');

		// Insert the cover into the pre-load area
		$('#image-preloader').append('<li style="background-image: ' + backgroundUrl + '"></li>');

	});

	// Setup a trigger for the images having being loaded
	$(window).load(function(){

		// Remove the image pre-load are
		$('#image-preloader').remove();

	});

}


/* - DEBUG ------------------------------------------------------------------ */
function toggleDebug()
{

	// Pause the covers
	coversHandleAction('stop');

}


/* - DOM READY -------------------------------------------------------------- */
$(function() {

	// Pre-load all the cover images
	preloadImages();

	// Initiate the covers slide show
	coversInit();

	// Call the function to start the fixes
	fixesInit();

});
