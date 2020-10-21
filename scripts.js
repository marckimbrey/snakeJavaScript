const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let direction = {x:1, y:0}; //default to right
let snake;
let grid;

// initial gameState
function generateGrid() {
  const arr = [];
  for (let x = 0;x<75; x++) {
    arr.push([])
    for (let y = 0;y<50; y++) {
      arr[x].push(0);
    }
  }
  snake = [{x: 35,y: 25}];
  grid = arr;
  grid[snake[0].x][snake[0].y] = 'S';
  appleLocation(grid);
  draw(grid)
}

function appleLocation(arr) {
  const randomX = Math.floor(Math.random() * Math.floor(arr.length -1));
  const randomY = Math.floor(Math.random() * Math.floor(arr[0].length -1));
  const spaceFree =  arr[randomX][randomY] === 0? true:false;
  if (spaceFree) {
    grid[randomX][randomY] = 'A';
  } else {
    appleLocation(grid)
  }
}

// game turn
function gameTurn() {
  setInterval(() => {
    checkDestination()
  },500)

  //  check destination

  //  update board and snake
}

function checkDestination() {
  const newhHeadX = snake[0].x + direction.x;
  const newHeadY = snake[0].y + direction.y;
  switch (grid[newhHeadX][newHeadY]) {
    case 0:
      // move snake
      ctx.fillStyle = 'green';
      snake.unshift({x:newhHeadX, y:newHeadY});
      grid[newhHeadX][newHeadY] = 'S';
      ctx.fillRect(newhHeadX*8, newHeadY*8, 8,8);
      // update tail
      ctx.fillStyle = 'black';
      const oldTail = snake.pop();
      grid[oldTail.x][oldTail.y] = 0;
      ctx.fillRect(oldTail.x*8, oldTail.y*8, 8,8);
      break;
    case 'S':
      // gameOver
      break;
    case 'A':
      // eat apple
      // generate new apple
      break;
    default:
      // out of bounds
      // gameOver
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

// draw
function draw(arr) {
  for (let x = 0;x<arr.length; x++) {
    for (let y = 0;y<arr[0].length; y++) {

      if (arr[x][y] === 0) {
        ctx.fillStyle = 'black';
      } else if (arr[x][y] === 'S') {
        console.log(arr[x][y])
        ctx.fillStyle = 'green';
      } else if (arr[x][y] === 'A') {
        ctx.fillStyle = 'red';
      }
      ctx.fillRect(x*8,y*8,8,8)
    }
  }
}

generateGrid() // initial gameState
gameTurn();

document.addEventListener('keydown',changeDirection )
