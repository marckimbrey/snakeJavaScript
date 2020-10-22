const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


let sqr = 20;
let direction = {x:1, y:0}; //default to right
let snake;
let grid;

let interval;
let lost = false;


// initial gameState
function generateGrid() {
  const arr = [];
  for (let x = 0;x<30; x++) {
    arr.push([])
    for (let y = 0;y<20; y++) {
      arr[x].push(0);
    }
  }
  snake = [{x: 15,y: 10}];
  grid = arr;
  grid[snake[0].x][snake[0].y] = 'S';
  appleLocation(grid);
  drawGrid(grid)
}

function appleLocation(arr) {
  const randomX = Math.floor(Math.random() * Math.floor(arr.length -1));
  const randomY = Math.floor(Math.random() * Math.floor(arr[0].length -1));
  const spaceFree =  arr[randomX][randomY] === 0? true:false;
  if (spaceFree) {
    grid[randomX][randomY] = 'A';
      ctx.fillStyle = 'red';
      ctx.fillRect(randomX*sqr,randomY*sqr,sqr,sqr)
  } else {
    appleLocation(grid)
  }
}

// game turn
function gameTurn() {
  interval = setInterval(checkDestination,100)
}

function checkDestination() {
  const newHeadX = snake[0].x + direction.x;
  const newHeadY = snake[0].y + direction.y;
  if (newHeadX < 0 || newHeadX > grid.length -1 || newHeadY < 0 || newHeadY > grid[0].length -1  ) {// if out of bounds
    gameOver()
    return
  }
  switch (grid[newHeadX][newHeadY]) {
    case 0:
      // move snake
      snake.unshift({x:newHeadX, y:newHeadY});
      grid[newHeadX][newHeadY] = 'S';
      drawSquare(newHeadX,newHeadY);
      // update tail
      const oldTail = snake.pop();
      grid[oldTail.x][oldTail.y] = 0;
      drawSquare(oldTail.x, oldTail.y)
      break;
    case 'S':
      gameOver()
      break;
    case 'A':
      // eat apple
      snake.unshift({x:newHeadX, y:newHeadY});
      grid[newHeadX][newHeadY] = 'S';
      appleLocation(grid);
      drawSquare(newHeadX,newHeadY)
      break;
  }
}



function changeDirection(e) {
  switch(e.keyCode) {
    case 37: // left
      direction ={x:-1, y:0};
      break;
      case 38: // up
        direction ={x:0, y:-1};
        break;
      case 39: // right
        direction ={x:1, y:0};
        break;
      case 40: // down
        direction ={x:0, y: 1};
        break;

  }
}

// draw entire grid
function drawGrid(arr) {
  for (let x = 0;x<arr.length; x++) {
    for (let y = 0;y<arr[0].length; y++) {

      drawSquare(x,y);
    }
  }
}
// update specific square
function drawSquare(x,y) {
  if (grid[x][y] === 0) {
    ctx.fillStyle = 'black';
  } else if (grid[x][y] === 'S') {
    ctx.fillStyle = 'green';
  } else if (grid[x][y] === 'A') {
    ctx.fillStyle = 'red';
  }
  ctx.fillRect(x*sqr,y*sqr,sqr,sqr)
}

function gameOver() {
  clearInterval(interval);
  lost = true;
  ctx.font = '40px serif';
  ctx.fillStyle = 'green';
  ctx.fillText('Game Over!!!',9*sqr,14*sqr);
  ctx.font = '20px serif';
  ctx.fillText('press enter to play again',10*sqr,16*sqr);

}

function restart(e) {
  if (lost & e.keyCode === 13) { // restart game
    lost = !lost;
    generateGrid()
    gameTurn();
  }
}

generateGrid() // initial gameState
gameTurn();

document.addEventListener('keydown',changeDirection )
document.addEventListener('keydown',restart )
