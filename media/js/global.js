/* - FONT RESZER ------------------------------------------------------------ */
function fontResizerUp()
{

	// Pull in the current element
	var element = document.getElementById('resizeable');
	var breadcrumbs = document.getElementById('breadcrumbs');
	var currentFontSize = element.style.fontSize;

	// Determine if there is a currentFontSize set
	if( !currentFontSize ) { currentFontSize = '12px'; };

	// Convert the current fontsize to an integer
	currentFontSize = currentFontSize.replace(/px|\s/i, '');
	currentFontSize = Number(currentFontSize);

	// Check if the font size is within 24px
	if( currentFontSize < 24 )
	{

		// Add two pixels to the current size
		currentFontSize = currentFontSize + 2;

		// Set the new font size of all elements
		element.style.fontSize = currentFontSize + 'px'
		breadcrumbs.style.fontSize = currentFontSize + 'px'

	}

}
function fontResizerDefault()
{

	// Pull in the current element
	var element = document.getElementById('resizeable');
	var breadcrumbs = document.getElementById('breadcrumbs');

	// Update the elements with the default font-size
	element.style.fontSize = '12px'
	breadcrumbs.style.fontSize = '12px'

}
function fontResizerDown()
{

	// Pull in the current element
	var element = document.getElementById('resizeable');
	var breadcrumbs = document.getElementById('breadcrumbs');
	var currentFontSize = element.style.fontSize;

	// Determine if there is a currentFontSize set
	if( !currentFontSize ) { currentFontSize = '12px'; };

	// Convert the current fontsize to an integer
	currentFontSize = currentFontSize.replace(/px|\s/i, '');
	currentFontSize = Number(currentFontSize);

	// Check if the font size is within 24px
	if( currentFontSize > 8 )
	{

		// Add two pixels to the current size
		currentFontSize = currentFontSize - 2;

		// Set the new font size of all elements
		element.style.fontSize = currentFontSize + 'px'
		breadcrumbs.style.fontSize = currentFontSize + 'px'

	}

}


/* - PREVIOUS BUILD FUNCTS -------------------------------------------------- */
function validate_email(address)
{
	var regExFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

	if (regExFilter.test(address))
		return true;
	else
		return false;
}

