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

const INCOMPLETE = 0
const HUMAN_WINS = 1
const COMPUTER_WINS = 2
const DRAW = 3

/**************************************************
 * GLOBALS
 **************************************************/

var board;
var human_goes_first = true;
var current_turn_human = human_goes_first;
var animating_col = -1;
var animating_row = -1;

/**************************************************
 * preload()
 **************************************************/

function preload() {
}

/**************************************************
 * setup()
 **************************************************/

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(30);
  
  textSize(40);
  textAlign(CENTER, CENTER);
  initialise_board()
}

/**************************************************
 * set_top_label()
 **************************************************/

function set_top_label(label_text) {
    stroke(0); // Black
    fill(0);   // Black
    text(label_text, CANVAS_WIDTH / 2, TOP_LABEL_HEIGHT / 2);    
}

/**************************************************
 * set_bottom_label()
 **************************************************/

function set_bottom_label(label_text) {
    stroke(0); // Black
    fill(0);   // Black
    text(label_text, CANVAS_WIDTH / 2, BOARD_TOP_MARGIN + BOARD_HEIGHT + (BOTTOM_LABEL_HEIGHT / 2)); 
}

/**************************************************
 * mousePressed()
 **************************************************/
 
function mousePressed() {
    const col = get_over_cell_column();
    if (col != -1) {
        animating_col = col;
        animating_row = -1;
    }
}

/**************************************************
 * get_over_cell_column()
 **************************************************/

function get_over_cell_column() {
    if (current_turn_human) {
        if ((mouseY > TOP_LABEL_HEIGHT) && (mouseY < BOARD_TOP_MARGIN)) {
            const col = Math.floor((mouseX - BOARD_LEFT_MARGIN) / CELL_WIDTH);
            if ((col >= 0) && (col < COLS)) {
                if (board[col][0] == EMPTY_CELL) {
                    return col;
                }
            }
        }
    }
    
    return -1;
}

/**************************************************
 * draw_board()
 **************************************************/

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
                    CELL_WIDTH - CELL_MARGIN,
                    CELL_HEIGHT - CELL_MARGIN);
        }
    }
    
    if (animating_col != -1) {        
        if (current_turn_human) {
            fill(255, 0, 0); // Red
        } else {
            fill(255, 255, 0); // Yellow
        }
        ellipse(BOARD_LEFT_MARGIN + (animating_col * CELL_WIDTH) + (CELL_WIDTH / 2),
                BOARD_TOP_MARGIN + (animating_row * CELL_HEIGHT) + (CELL_HEIGHT / 2),   
                CELL_WIDTH - CELL_MARGIN,
                CELL_HEIGHT - CELL_MARGIN);
        animating_row++;
        
        if((animating_row > ROWS) || (board[animating_col][animating_row + 1] != EMPTY_CELL)) {
            board[animating_col][animating_row] = current_turn_human ? HUMAN_CELL : COMPUTER_CELL;
            current_turn_human = !current_turn_human;
            check_board_state(animating_col);
            animating_col = -1;
        }        
    }
    
    //console.log("------")
}

/**************************************************
 * check_board_state()
 **************************************************/

function check_board_state(latest_col) {
    var latest_row = 0;
    while (board[latest_col][latest_row] == EMPTY_CELL) {
        latest_row++; 
    }
    const latest_piece = board[latest_col][latest_row];
    
    // Horizontal check
    var horizontal_count = 1;
    for(let col = latest_col - 1; col >= 0; col--) {
        if(board[col][latest_row] == latest_piece) {
            horizontal_count++;
        } else {
            break;
        }
    }
    for(let col = latest_col + 1; col < COLS; col++) {
        if(board[col][latest_row] == latest_piece) {
            horizontal_count++;
        } else {
            break;
        }
    }
    
    if (horizontal_count >= 4) {
        return latest_piece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }
    
    // Vertical check    
    var vertical_count = 1;
    for(let row = latest_row - 1; row >= 0; row--) {
        if(board[latest_col][row] == latest_piece) {
            vertical_count++;
        } else {
            break;
        }
    }
    for(let row = latest_row + 1; row < ROWS; row++) {
        if(board[latest_col][row] == latest_piece) {
            vertical_count++;
        } else {
            break;
        }
    }

    if (vertical_count >= 4) {
        return latest_piece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }

    // Top-left to bottom-right diagonal check
    var diagonal_nw_to_se_count = 1;
    for (let row = latest_row - 1, col = latest_col - 1; (row >= 0) && (col >= 0); row--, col--) {
        if(board[col][row] == latest_piece) {
            diagonal_nw_to_se_count++;
        } else {
            break;
        }
    }
    for (let row = latest_row + 1, col = latest_col + 1; (row < ROWS) && (col < COLS); row++, col++) {
        if(board[col][row] == latest_piece) {
            diagonal_nw_to_se_count++;
        } else {
            break;
        }
    }

    if (diagonal_nw_to_se_count >= 4) {
        return latest_piece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }
    
    // Bottom-left to top-right diagonal check
    var diagonal_sw_to_ne_count = 1;
    for (let row = latest_row + 1, col = latest_col - 1; (row < ROWS) && (col >= 0); row++, col--) {
        if(board[col][row] == latest_piece) {
            diagonal_sw_to_ne_count++;
        } else {
            break;
        }
    }
    for (let row = latest_row - 1, col = latest_col + 1; (row >= 0) && (col < COLS); row--, col++) {
        if(board[col][row] == latest_piece) {
            diagonal_sw_to_ne_count++;
        } else {
            break;
        }
    }

    if (diagonal_sw_to_ne_count >= 4) {
        return latest_piece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }
    
    // Draw check
    for(let col = 0; col < COLS; col++) {
        if (board[col][0] == EMPTY_CELL) {
            return INCOMPLETE;
        }
    }
    
    return DRAW;
}

/**************************************************
 * draw()
 **************************************************/

function draw() {
  draw_board()
  if ((!current_turn_human) && (animating_col == -1)) {
      animating_col = get_computer_move(board);
      animating_row = -1;
  }
}

/**************************************************
 * get_computer_move()
 **************************************************/

function get_computer_move()
{   
    return Math.floor(Math.random() * COLS);
}

/**************************************************
 * initialise_board()
 **************************************************/

function initialise_board() {
   board = [...Array(COLS)].map(() => [...Array(ROWS)].map(() => EMPTY_CELL))
   console.log(board);
}