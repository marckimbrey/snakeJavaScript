const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let direction;
let snake = [{x: 35,y: 25}];
const grid = generateGrid();
appleLocation(grid);
grid[snake[0].x][snake[0].y] = 'S';

// generate 2d array
function generateGrid() {
  const arr = [];
  for (let x = 0;x<75; x++) {
    arr.push([])
    for (let y = 0;y<50; y++) {
      arr[x].push(0);
    }
  }
  return arr
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
draw(grid)
