let grid;
let side_len = 5;
let cols, rows;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas(600, 600);
  cols = width / side_len;
  rows = height / side_len;
  grid = make2DArray(cols, rows);
}

function draw() {
  background('rgb(71,154,255)');
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j]) {
        fill('rgb(255,241,131)');
        square(i * side_len, j * side_len, side_len);
      }
    }
  }
  
  if(mouseIsPressed){
    let xpos = floor(mouseX / side_len);
    let ypos = floor(mouseY / side_len);

    let matrix = 5;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = xpos + i;
          let row = ypos + j;
          if (withinCols(col) && withinRows(row)) {
            grid[col][row] = 1;
          }
        }
      }
    }
  }
  
  let nextGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows ; j++) {
      
      if (grid[i][j] == 1) {
        let below = grid[i][j + 1];
        
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }
        
        let belowA;
        let belowB;
        if (withinCols(i + dir)) {
          belowA = grid[i + dir][j + 1];
        }
        if (withinCols(i - dir)) {
          belowB = grid[i - dir][j + 1];
        }
        
        
        if (below== 0) {
          nextGrid[i][j + 1] = 1;
        } else if (belowA== 0) {
          nextGrid[i + dir][j + 1] = 1;
        } else if (belowB== 0) {
          nextGrid[i - dir][j + 1] = 1;
        } else {
          nextGrid[i][j] = 1;
        }
      }
    }
  }
  grid = nextGrid;
}
