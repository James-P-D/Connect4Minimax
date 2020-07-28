const COLS = 7
const ROWS = 6

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const BOARD_LEFT_MARGIN = 100
const BOARD_RIGHT_MARGIN = 100
const BOARD_TOP_MARGIN = 200
const BOARD_BOTTOM_MARGIN = 100
const BOARD_WIDTH = CANVAS_WIDTH - (BOARD_LEFT_MARGIN + BOARD_RIGHT_MARGIN)
const BOARD_HEIGHT = CANVAS_HEIGHT - (BOARD_TOP_MARGIN + BOARD_BOTTOM_MARGIN)

//const CELL_MARGIN = 5
//const CELL_WIDTH = (BOARD_WIDTH / COLS)


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  frameRate(30)
  
  stroke(0) // Set line color to black
  fill(255) // Set fill color to white
  rect(0, 0, CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1)
}

function draw_board() {
    stroke(0) // Black
    fill(0, 0, 255) // Blue
    rect(BOARD_LEFT_MARGIN, BOARD_TOP_MARGIN, BOARD_WIDTH, BOARD_HEIGHT)
    
    fill(0) // White
    
    for(var x = 0; x < 10; x++) {
    //for(int col = 0; col < COLS; col++) {
    //    for(int row = 0; row < row; row++) {
            
    //    }
    }
}

function draw() {
  if (mouseIsPressed) {
  }
  draw_board()
}