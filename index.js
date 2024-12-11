cell = document.createElement("div");
number_of_squares = 16;

grid = document.querySelector(".grid-container")

for (let i = 0; i < 16; i++) {
	row = document.createElement("div");
	row.setAttribute("class", "grid-row");

	for (let j = 0; j < 16; j++) {
		cell = document.createElement("div");
		cell.setAttribute("class", "grid-cell");
		row.appendChild(cell);
	}

	grid.appendChild(row);
}

document.body.appendChild(grid);

grid.addEventListener("mouseover", event => {
	event.target.style.backgroundColor = "blue";1
})