function randomizeRGB(alpha) {
	red = Math.floor(Math.random() * 257);
	blue = Math.floor(Math.random() * 257);
	green = Math.floor(Math.random() * 257);

	return `rgba(${red}, ${blue}, ${green}, ${alpha})`
}

function progressiveDarkening(alpha) {
	if (alpha === null) {
		return 1;
	}
	if (alpha < 1) {
		return alpha + 0.1;
	}
	return alpha;
}


function createGridLines() {
	const grid = document.querySelector(".grid-container");
	const gridLinesButton = document.querySelector(".grid-lines-button");

	grid.childNodes.forEach(row => {
		row.childNodes.forEach(cell => {
			if (gridLinesButton.textContent === "Hide grid lines") {
				cell.style.border = "";
			} else {
				cell.style.border = "1px solid black";
				cell.style.borderWidth = "1px 0.5px";
			}
		})
	});
}

function changeGridLinesButtonState() {
	const gridLinesButton = document.querySelector(".grid-lines-button");

	if (gridLinesButton.textContent === "Show grid lines") {
		gridLinesButton.textContent = "Hide grid lines";
	} else {
		gridLinesButton.textContent = "Show grid lines";
	}
}

function createGrid(numberOfSquares) {
	const grid = document.querySelector(".grid-container");
	grid.innerHTML = "";

	const cellWidth = grid.clientWidth / numberOfSquares;
	const cellHeight = grid.clientHeight / numberOfSquares;

	for (let i = 0; i < numberOfSquares; i++) {
		row = document.createElement("div");
		row.setAttribute("class", "grid-row");
		row.style.height = `${cellHeight}px`;

		for (let j = 0; j < numberOfSquares; j++) {
			cell = document.createElement("div");
			cell.setAttribute("class", "grid-cell");
			cell.style.width = `${cellWidth}px`;
			cell.style.height = `${cellHeight}px`;
			row.appendChild(cell);
		}

		grid.appendChild(row);
	}

	createGridLines()
}


function getAlphaFromRGBA(rgba) {
	const regex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(\d*\.?\d+)\s*\)$/;
	const match = rgba.match(regex);
	return match ? parseFloat(match[1]) : null;
}


function hexToRGB(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

	return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}


const grid = document.querySelector(".grid-container");

let useProgressiveDarkening = false;
let useRainbowColors = false;
let useGridLines = false;
let selectedColor = "#ff0000";

grid.addEventListener("mouseover", event => {
	if (event.target.classList.contains("grid-cell")) {

		const elementBackgroundColor = window.getComputedStyle(event.target).getPropertyValue("background-color");
		let elementAlpha = 1;
		if (useProgressiveDarkening) {
			const elementBackgroundColorAlpha = getAlphaFromRGBA(elementBackgroundColor);
			elementAlpha = progressiveDarkening(elementBackgroundColorAlpha);
		}
		if (useRainbowColors) {
			event.target.style.backgroundColor = randomizeRGB(elementAlpha);
		} else {
			event.target.style.backgroundColor = hexToRGB(selectedColor, elementAlpha);
		}
	}
})

const gridLinesButton = document.querySelector(".grid-lines-button");

gridLinesButton.addEventListener("click", event => {
	useGridLines = useGridLines ? false: true

	changeGridLinesButtonState()
	createGridLines()
	if (useGridLines) {
		gridLinesButton.classList.remove("button-off")
		gridLinesButton.classList.add("button-on")
	} else {
		gridLinesButton.classList.add("button-off")
		gridLinesButton.classList.remove("button-on")
	}
});

createGrid(16);

const slider = document.querySelector(".slider");
const gridSizeParagraph = document.querySelector(".grid-size");
slider.addEventListener("input", event => {
	createGrid(event.target.value);
	gridSizeParagraph.textContent = `Grid Size: ${event.target.value}x${event.target.value}`
});

const clearGridButton = document.querySelector(".clear-grid-button");
clearGridButton.addEventListener("click", event => {
	createGrid(slider.value)
});

const toggleDarkeningButton = document.querySelector(".toggle-progressive-darkening-button");
toggleDarkeningButton.addEventListener("click", event => {
	useProgressiveDarkening = useProgressiveDarkening ? false : true
	if (useProgressiveDarkening) {
		toggleDarkeningButton.classList.remove("button-off")
		toggleDarkeningButton.classList.add("button-on")
	} else {
		toggleDarkeningButton.classList.add("button-off")
		toggleDarkeningButton.classList.remove("button-on")
	}
});

const toggleRainbowButton = document.querySelector(".toggle-rainbow-colors-button");
toggleRainbowButton.addEventListener("click", event => {
	useRainbowColors = useRainbowColors ? false : true
	if (useRainbowColors) {
		toggleRainbowButton.classList.remove("button-off")
		toggleRainbowButton.classList.add("button-on")
	} else {
		toggleRainbowButton.classList.add("button-off")
		toggleRainbowButton.classList.remove("button-on")
	}
});

const colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener("input", event => {
	selectedColor = event.target.value;
});