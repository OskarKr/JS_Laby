const ballElement = document.querySelector('#ball');
const holeElement = document.querySelector('#hole');

//random hole spawn position
holeElement.style.left = `${Math.random() * window.innerWidth}px`;
holeElement.style.top = `${Math.random() * window.innerHeight}px`;

//ball velocity value at start
let velocityX = 0;
let velocityY = 0;

function animate() {
	//updating the position of the ball with speed
	if (
		parseInt(ballElement.style.left) + velocityX < 0 ||
		parseInt(ballElement.style.left) + velocityX > window.innerWidth - 50
	) {
		ballElement.style.left = `${parseInt(ballElement.style.left)}px`;
	} else {
		ballElement.style.left = `${parseInt(ballElement.style.left) + velocityX / 10}px`;
	}

	if (
		parseInt(ballElement.style.top) + velocityY < 0 ||
		parseInt(ballElement.style.top) + velocityY > window.innerHeight - 50
	) {
		ballElement.style.top = `${parseInt(ballElement.style.top)}px`;
	} else {
		ballElement.style.top = `${parseInt(ballElement.style.top) + velocityY / 10}px`;
	}

	// ball hit the border of screen
	if (parseInt(ballElement.style.left) < 0 || parseInt(ballElement.style.left) > window.innerWidth - 50) {
		velocityX = -velocityX;
	}
	if (parseInt(ballElement.style.top) < 0 || parseInt(ballElement.style.top) > window.innerHeight - 50) {
		velocityY = -velocityY;
	}

	// ball fell into the hole
	if (isOverlapping(ballElement, holeElement)) {
		alert('Kula trafiła do dziury!');
	} else {
		window.requestAnimationFrame(animate);
	}
}
window.requestAnimationFrame(animate);

// check if two elements overlap
function isOverlapping(element1, element2) {
	const rect1 = element1.getBoundingClientRect();
	const rect2 = element2.getBoundingClientRect();

	return (
		rect1.bottom - 25 - (rect2.bottom - 25) < 50 &&
		rect1.bottom - 25 - (rect2.bottom - 25) > -50 &&
		rect1.left + 25 - (rect2.left + 25) < 50 &&
		rect1.left + 25 - (rect2.left + 25) > -50
	);
}
window.addEventListener('deviceorientation', e => {
	velocityX = e.gamma || 0;
	velocityY = -1 * (90 - (e.beta || 90));
});
