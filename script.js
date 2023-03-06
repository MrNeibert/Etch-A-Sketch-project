const grid = document.querySelector(".boardContainer");
let color = "black";

createBoard(16);



function createBoard(size){
  grid.style.gridTemplateColumns = `repeat( ${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat( ${size}, 1fr)`;

//grid template. repeat n times, and each part will ocupy a fraction of area

  let squares =grid.querySelectorAll("div");
  squares.forEach((div) => div.remove());
  // this simply removes any squares already present on the board
  
  for (let i = 0; i < Math.pow(size,2); i++) {
    let square = document.createElement ('div');
    square.style.backgroundColor = "white";
    square.addEventListener ("mouseover", colorSquare)
    grid.appendChild(square);
    //This creates the squares, paint them white and add them to the board
  }
}

function changeSize(input){
  if (input >= 2 && input <= 36){
    createBoard(input);
  }else{
    console.log("please type a number between 2 -- 36")
  }
}

function colorSquare(){
  if (color == 'random'){
    this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%`
  } else {
  this.style.backgroundColor = color;    
  }

}

function changeColor(choice){
color = choice;
}
 
function resetBoard(){
  const grid = document.querySelector(".boardContainer");
  let squares =grid.querySelectorAll("div");
  squares.forEach((div) => div.style.backgroundColor = 'white');
}