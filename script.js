const grid = document.querySelector(".boardContainer");


let color = "black"
createPenButton("Pen Mode (Dot)");
createBoard(16);
activateButtons();
// These are default values. Start on brush mode, color black and with a 16x16 grid
// The createPenButton creates the mode switching logic with JS. It inserts the togglePen function to the button.


function activateButtons () {
  let togglableButtons = document.querySelectorAll("#pressable");
  togglableButtons.forEach((btn) => {
    btn.addEventListener("click",() => {
      document.querySelector(".pressed")?.classList.remove('pressed');
      btn.classList.add('pressed');
    });
  })
}



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
    square.addEventListener("click", colorSquare);
    grid.appendChild(square);
  }
  togglePen("Pen Mode (Dot)");
}
  //This creates the squares, paint them white, adds a listenerEvent and add them to the board.
  //The togglePen function makes sure to update the text on the button, every time a new board is generated.
  //This also updates the logic to switch the modes. By default, it will be on Brush mode.
  

function changeSize(input) {
  if (input >= 2 && input <= 36) {
    createBoard(input);
  } else {
    console.log("please type a number between 2 -- 36")
  }
}
// This checks if the user presented valid input to change the grid ratio.

function changeColor(choice) {
  color = choice;
}
//This function is activated with the buttons. It will set the color of the pen.
// By default its black.

function colorSquare() {
  if (color == 'random') {
    this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%`
  } else {
    this.style.backgroundColor = color;
  }
}
//This function is activated once the eventListener on the squares fire up.
//It will take the color selected (declared Global) or picked on the changeColor and use it to color the square.

function resetBoard() {
  let squares = grid.querySelectorAll("div");
  squares.forEach((div) => div.style.backgroundColor = 'white');
}
//This will simply clear the hole board. It selects all squares and paint them white.

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
//This is the toggle function. Depending on the text, it will select an event listener for the squares.
//After determining the current mode, it switches it, and calls createPenButton to re-create the button with the right text.

function createPenButton(text) {
  let buttonsBox = document.querySelector(".buttonsBox")
  let btn = buttonsBox.querySelector(".penMode");
  btn.setAttribute("onclick", "togglePen(this.innerHTML);");
  btn.innerHTML = text;
}
//This simply creates the Pen Mode Button with the text recieved. It prepares the toggle, passing the inner text to it, so it can
//decide which mode to activate.

