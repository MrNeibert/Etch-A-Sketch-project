const grid = document.querySelector(".boardContainer");

let color = "black"
createBoard(16);
createPenButton("Pen Mode (Brush)");
// These are default values. Start on brush mode, color black and with a 16x16 grid
// The createPenButton creates the mode switching logic with JS. It inserts the togglePen function to the button.

function createBoard(size) {
  grid.style.gridTemplateColumns = `repeat( ${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat( ${size}, 1fr)`;
  //grid template. repeat n times, and each part will ocupy a fraction of area.
  //This ensures a perfect square.

  let squares = grid.querySelectorAll("div");
  squares.forEach((div) => div.remove());
  // this simply removes any squares already present on the board

  for (let i = 0; i < Math.pow(size, 2); i++) {
    let square = document.createElement('div');
    square.style.backgroundColor = "white";
    togglePen("Pen Mode (Dot)");
    grid.appendChild(square);
  }
  //This creates the squares, paint them white and add them to the board.
  //The togglePen function secretly adds the event listener in the squares. It passes the "Dot" mode to the funcion
  //which reverts back to the default "Brush" to all squares
}

function changeSize(input) {
  if (input >= 2 && input <= 36) {
    createBoard(input);
  } else {
    console.log("please type a number between 2 -- 36")
  }
}

function colorSquare() {
  if (color == 'random') {
    this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%`
  } else {
    this.style.backgroundColor = color;
  }

}

function changeColor(choice) {
  color = choice;
}

function resetBoard() {
  let squares = grid.querySelectorAll("div");
  squares.forEach((div) => div.style.backgroundColor = 'white');
}

function togglePen(mode) {
  let squares = grid.querySelectorAll("div");
  if (mode === "Pen Mode (Brush)") {
    squares.forEach((div) => {
      div.removeEventListener("mouseover", colorSquare);
      div.addEventListener("click", colorSquare);
    })
    createPenButton("Pen Mode (Dot)")
  } else {
    squares.forEach((div) => {
      div.removeEventListener("click", colorSquare);
      div.addEventListener("mouseover", colorSquare);
    })
    createPenButton("Pen Mode (Brush)")
  }
}

function createPenButton(text) {
  let buttonsBox = document.querySelector(".buttonsBox")
  let btn = buttonsBox.querySelector(".penMode");
  btn.setAttribute("onclick", "togglePen(this.innerHTML);");
  btn.innerHTML = text;
}

