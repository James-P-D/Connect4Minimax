const COLS = 7
const ROWS = 6

const CELL_MARGIN = 15
const CELL_WIDTH = 70
const CELL_HEIGHT = CELL_WIDTH

const TOP_LABEL_HEIGHT = 100

const TOP_DROP_CIRCLES_HEIGHT = 100

const BOARD_LEFT_MARGIN = 100
const BOARD_RIGHT_MARGIN = 100
const BOARD_TOP_MARGIN = TOP_LABEL_HEIGHT + TOP_DROP_CIRCLES_HEIGHT
const BOARD_BOTTOM_MARGIN = 100

const BOARD_WIDTH = (COLS * CELL_WIDTH)
const BOARD_HEIGHT = (ROWS * CELL_HEIGHT)

const CANVAS_WIDTH = BOARD_LEFT_MARGIN + BOARD_WIDTH + BOARD_RIGHT_MARGIN
const CANVAS_HEIGHT = BOARD_TOP_MARGIN + BOARD_HEIGHT + BOARD_BOTTOM_MARGIN


function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  //font = loadFont('https://github.com/opentypejs/opentype.js/raw/master/fonts/SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  frameRate(30)
  
  //textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);
  
  stroke(0) // Set line color to black
  fill(255) // Set fill color to white
  rect(0, 0, CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1)
}

function set_top_label(label_text) {
    stroke(0) // Black
    fill(0) // Black
    text(label_text, CANVAS_WIDTH / 2, TOP_DROP_CIRCLES_HEIGHT / 2);    
}

function draw_board() {
    background(255);
    
    stroke(0) // Black
    fill(0, 0, 255) // Blue
    rect(BOARD_LEFT_MARGIN, BOARD_TOP_MARGIN, BOARD_WIDTH, BOARD_HEIGHT)
    
    var today = new Date();
    var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    set_top_label(date);
    
    fill(255) // White
    
    for(let col = 0; col < COLS; col++) {
        for(let row = -1; row < ROWS; row++) {            
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