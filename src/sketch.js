const COLS = 7
const ROWS = 6

const CELL_MARGIN = 5
const CELL_WIDTH = 50
const CELL_HEIGHT = CELL_WIDTH

const BOARD_LEFT_MARGIN = 100
const BOARD_RIGHT_MARGIN = 100
const BOARD_TOP_MARGIN = 200
const BOARD_BOTTOM_MARGIN = 100

const BOARD_WIDTH = (COLS * CELL_WIDTH)
const BOARD_HEIGHT = (ROWS * CELL_HEIGHT)

const CANVAS_WIDTH = BOARD_LEFT_MARGIN + BOARD_WIDTH + BOARD_RIGHT_MARGIN
const CANVAS_HEIGHT = BOARD_TOP_MARGIN + BOARD_HEIGHT + BOARD_BOTTOM_MARGIN

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
    
    fill(255) // White
    
    for(var col = 0; col < COLS; col++) {
        for(var row = 0; row < ROWS; row++) {            
            ellipse(BOARD_LEFT_MARGIN + (col * CELL_WIDTH) + (CELL_WIDTH / 2),
                    BOARD_TOP_MARGIN + (row * CELL_HEIGHT) + (CELL_HEIGHT / 2),
                    CELL_WIDTH - (1 * CELL_MARGIN),
                    CELL_HEIGHT - (1 * CELL_MARGIN))
            
        }
    }
}

function draw() {
  if (mouseIsPressed) {
  }
  draw_board()
}