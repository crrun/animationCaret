// The animation of caret
function animationCaret(elems, parent) {
	var position;
	var leftOffsetInput;
	var topOffsetInput;
	const width_caret = 15;
	const caret = document.createElement('div');
	const shadowFont = document.createElement('font');
	const keyframe = [
		{ opacity: [0, 1] }, 
		{
		    duration: 500,
		    iterations: Infinity,
	  	}
  	];	
  	const getPosition = (elem) => {
  		Object.assign(shadowFont, {
  			style: `
  				display: block;
  				position: absolute;
  				font: ${getComputedStyle(elem).font}; 
  				white-space: pre;
				text-transform: capitalize;
  					visibility: hidden;
  			`
  		});
  		shadowFont.textContent = elem.value;
  		position = elem.getBoundingClientRect();
		leftOffsetInput = position.left - parent.getBoundingClientRect().left + shadowFont.offsetWidth + Number.parseFloat(getComputedStyle(elem).fontSize);
		topOffsetInput = position.top - parent.getBoundingClientRect().top + Number.parseFloat(getComputedStyle(elem).height) * .7;
  		Object.assign(document.documentElement, {
  			style: `
  				--posX: ${leftOffsetInput}px;
  				--posY: ${topOffsetInput}px;
  			`
  		});
  		(shadowFont.offsetWidth + width_caret > elem.offsetWidth * .9) ? caret.style.display = 'none' : caret.style.display = 'block';
  	}

	document.documentElement.appendChild(shadowFont);
	Object.assign(caret, { style: `
		display: block;
		width: ${width_caret}px;
		height: 4px;
		position: fixed;
		left: var(--posX);
		top: var(--posY);
			background-color: gold;
		`
	});
	caret.classList.add('caret');
	caret.animate(...keyframe);
	parent.appendChild(caret);
	elems.forEach((elem) => {
		elem.style.caretColor = 'transparent';
	  	elem.onselect = () => elem.setSelectionRange(elem.value.length, elem.value.length);
		elem.onfocus = () => getPosition(elem);
		elem.onblur = () => caret.style.display = 'none';
		elem.oninput = () => getPosition(elem);
		window.onresize = () => getPosition(elem);
	});
}