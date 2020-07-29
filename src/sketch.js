const COLS = 7
const ROWS = 6

/**************************************************
 * UI CONSTANTS
 **************************************************/

const CELL_MARGIN = 15
const CELL_WIDTH = 100
const CELL_HEIGHT = CELL_WIDTH

const TOP_LABEL_HEIGHT = 100
const TOP_DROP_CIRCLES_HEIGHT = 100
const BOTTOM_LABEL_HEIGHT = 100

const BOARD_LEFT_MARGIN = 100
const BOARD_RIGHT_MARGIN = 100
const BOARD_TOP_MARGIN = TOP_LABEL_HEIGHT + TOP_DROP_CIRCLES_HEIGHT
const BOARD_BOTTOM_MARGIN = BOTTOM_LABEL_HEIGHT

const BOARD_WIDTH = (COLS * CELL_WIDTH)
const BOARD_HEIGHT = (ROWS * CELL_HEIGHT)

const CANVAS_WIDTH = BOARD_LEFT_MARGIN + BOARD_WIDTH + BOARD_RIGHT_MARGIN
const CANVAS_HEIGHT = BOARD_TOP_MARGIN + BOARD_HEIGHT + BOARD_BOTTOM_MARGIN

const EMPTY_CELL = 0
const HUMAN_CELL = 1
const COMPUTER_CELL = 2

/**************************************************
 * GLOBALS
 **************************************************/

var board;
var human_goes_first = true;
var current_turn_human = human_goes_first;
var animating_col = -1;
var animating_row = -1;

function preload() {
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(30);
  
  textSize(40);
  textAlign(CENTER, CENTER);
  initialise_board()
}

function set_top_label(label_text) {
    stroke(0); // Black
    fill(0);   // Black
    text(label_text, CANVAS_WIDTH / 2, TOP_LABEL_HEIGHT / 2);    
}

function set_bottom_label(label_text) {
    stroke(0); // Black
    fill(0);   // Black
    text(label_text, CANVAS_WIDTH / 2, BOARD_TOP_MARGIN + BOARD_HEIGHT + (BOTTOM_LABEL_HEIGHT / 2)); 
}

function mousePressed() {
    let col = get_over_cell_column();
    if (col != -1) {
        animating_col = col;
        animating_row = -1;
    }
}

function get_over_cell_column() {
    console.log(board);
    if (current_turn_human) {
        if ((mouseY > TOP_LABEL_HEIGHT) && (mouseY < BOARD_TOP_MARGIN)) {
            let col = Math.floor((mouseX - BOARD_LEFT_MARGIN) / CELL_WIDTH);
            if (board[col][0] == EMPTY_CELL) {
                return col;
            }
        }
    }
    
    return -1;
}

function draw_board() {
    //console.log("draw_board()");
    background(255);
    
    stroke(0);       // Black
    fill(0, 0, 255); // Blue
    rect(BOARD_LEFT_MARGIN, BOARD_TOP_MARGIN, BOARD_WIDTH, BOARD_HEIGHT);
    
    if (current_turn_human) {
        set_top_label("HUMAN TURN");
    } else {
        set_top_label("COMPUTER TURN");
    }
    //set_top_label(date);
    //set_bottom_label(date);
    
    fill(255); // White
    
    let over_col = get_over_cell_column();
    // Only bother checking for mouse-over the top row of cells if it's a human turn
        
    for (let col = 0; col < COLS; col++) {
        for (let row = -1; row < ROWS; row++) {            
            if ((row == -1) && (col == over_col)) {
                fill(255, 0, 0);
            } else {
                if (board[col][row] == HUMAN_CELL) {
                    //console.log("Setting to red")
                    fill(255, 0, 0);
                } else if (board[col][row] == COMPUTER_CELL) {
                    //console.log("Setting to yellow")
                    fill(255, 255, 0);
                } else {
                    fill(255);
                }
            }
            ellipse(BOARD_LEFT_MARGIN + (col * CELL_WIDTH) + (CELL_WIDTH / 2),
                    BOARD_TOP_MARGIN + (row * CELL_HEIGHT) + (CELL_HEIGHT / 2),
                    CELL_WIDTH - (1 * CELL_MARGIN),
                    CELL_HEIGHT - (1 * CELL_MARGIN));
        }
    }
    
    if (animating_col != -1) {        
        if (current_turn_human) {
            //console.log("Setting to red")
            fill(255, 0, 0);
        } else if (board[col][row] == COMPUTER_CELL) {
            //console.log("Setting to yellow")
            fill(255, 255, 0);
        }

        ellipse(BOARD_LEFT_MARGIN + (animating_col * CELL_WIDTH) + (CELL_WIDTH / 2),
                BOARD_TOP_MARGIN + (animating_row * CELL_HEIGHT) + (CELL_HEIGHT / 2),
                CELL_WIDTH - (1 * CELL_MARGIN),
                CELL_HEIGHT - (1 * CELL_MARGIN));
        animating_row++;
        
        if((animating_row > ROWS) || (board[animating_col][animating_row+1] != EMPTY_CELL)) {
            board[animating_col][animating_row] = current_turn_human ? HUMAN_CELL : COMPUTER_CELL;
            animating_col = -1;
        }        
    }
    
    //console.log("------")
}

function draw() {
  if (mouseIsPressed) {
  }
  draw_board()
}

function initialise_board() {
   board = [...Array(COLS)].map(() => [...Array(ROWS)].map(() => EMPTY_CELL))
   console.log(board);
}