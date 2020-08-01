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
var humanGoesFirst = true;
var isCurrentTurnHuman = humanGoesFirst;
var isGameComplete = false;
var animatingCol = -1;
var animatingRow = -1;

/**************************************************
 * MinimaxTree Class
 **************************************************/

class MinimaxTree {
    constructor(board) {      
        //this._board = board;
    }
  
    get bestMove() {
        return Math.floor(Math.random() * COLS);
    }
}

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
  initialiseBoard()
}

/**************************************************
 * setTopLabel()
 **************************************************/

function setTopLabel(label_text) {
    stroke(255); // White
    fill(255);   // White
    rect(0, 0, CANVAS_WIDTH, TOP_LABEL_HEIGHT);
    stroke(0);   // Black
    fill(0);     // Black
    text(label_text, CANVAS_WIDTH / 2, TOP_LABEL_HEIGHT / 2);    
}

/**************************************************
 * setBottomLabel()
 **************************************************/

function setBottomLabel(label_text) {
    stroke(0); // Black
    fill(0);   // Black
    text(label_text, CANVAS_WIDTH / 2, BOARD_TOP_MARGIN + BOARD_HEIGHT + (BOTTOM_LABEL_HEIGHT / 2)); 
}

/**************************************************
 * mousePressed()
 **************************************************/
 
function mousePressed() {
    const col = getOverCellColumn();
    if (col != -1) {
        animatingCol = col;
        animatingRow = -1;
    } else if ((mouseY > BOARD_TOP_MARGIN + BOARD_HEIGHT) && (mouseY < BOARD_TOP_MARGIN + BOARD_HEIGHT + BOTTOM_LABEL_HEIGHT)) {
        humanGoesFirst = !humanGoesFirst;
        isCurrentTurnHuman = humanGoesFirst;
        initialiseBoard();
        isGameComplete = false;
        loop();
    }
}

/**************************************************
 * getOverCellColumn()
 **************************************************/

function getOverCellColumn() {
    if (isCurrentTurnHuman) {
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
 * drawBoard()
 **************************************************/

function drawBoard() {
    console.log("drawBoard()");
    background(255);
    
    stroke(0);       // Black
    fill(0, 0, 255); // Blue
    rect(BOARD_LEFT_MARGIN, BOARD_TOP_MARGIN, BOARD_WIDTH, BOARD_HEIGHT);
    
    setBottomLabel("RESET GAME");
    
    fill(255); // White

    if (isCurrentTurnHuman) {
        setTopLabel("HUMAN TURN");
    } else {
        setTopLabel("COMPUTER TURN");
    }
    
    let overCol = getOverCellColumn();
    // Only bother checking for mouse-over the top row of cells if it's a human turn
        
    for (let col = 0; col < COLS; col++) {
        for (let row = -1; row < ROWS; row++) {            
            if ((row == -1) && (col == overCol)) {
                drawCell(col, row, HUMAN_CELL);
            } else {
                drawCell(col, row, board[col][row]);
            }            
        }
    }
    
    if (animatingCol != -1) {        
        drawCell(animatingCol, animatingRow, isCurrentTurnHuman ? HUMAN_CELL : COMPUTER_CELL);
        
        if ((animatingRow == ROWS -1) || (board[animatingCol][animatingRow + 1] != EMPTY_CELL)) {
            board[animatingCol][animatingRow] = isCurrentTurnHuman ? HUMAN_CELL : COMPUTER_CELL;
            
            // Clear the mouse-over cells, just incase we are stopping because someone has won
            for (let col = 0; col < COLS; col++) {            
                drawCell(animatingCol, -1, EMPTY_CELL);
            }
            
            switch(checkBoardState(animatingCol)) {
                case HUMAN_WINS : {
                    isGameComplete = true;
                    setTopLabel("HUMAN WINS!");
                    break;
                }
                case COMPUTER_WINS : {
                    setTopLabel("COMPUTER WINS!");
                    isGameComplete = true;
                    break;
                }
                case DRAW : {
                    setTopLabel("DRAW!");
                    isGameComplete = true;
                    break;
                }
                case INCOMPLETE : {
                    isCurrentTurnHuman = !isCurrentTurnHuman;
                    //isCurrentTurnHuman = isCurrentTurnHuman;
                }
                
            }
            animatingCol = -1;
        }        
        animatingRow++;
        
    }
    
    //console.log("------")
}

function drawCell(col, row, cellType) {
    if (cellType == HUMAN_CELL) {
        console.log("DrawCell(", col, ", ", row, ", ", cellType, ")");
        fill(255, 0, 0);
    } else if (cellType == COMPUTER_CELL) {
        fill(255, 255, 0);
    } else {
        fill(255);
    }    
    
    ellipse(BOARD_LEFT_MARGIN + (col * CELL_WIDTH) + (CELL_WIDTH / 2),
            BOARD_TOP_MARGIN + (row * CELL_HEIGHT) + (CELL_HEIGHT / 2),
            CELL_WIDTH - CELL_MARGIN,
            CELL_HEIGHT - CELL_MARGIN);    
}

/**************************************************
 * checkBoardState()
 **************************************************/

function checkBoardState(latestCol) {
    var latestRow = 0;
    while (board[latestCol][latestRow] == EMPTY_CELL) {
        latestRow++; 
    }
    const latestPiece = board[latestCol][latestRow];
    
    // Horizontal check
    var horizontalCount = 1;
    for(let col = latestCol - 1; col >= 0; col--) {
        if(board[col][latestRow] == latestPiece) {
            horizontalCount++;
        } else {
            break;
        }
    }
    for(let col = latestCol + 1; col < COLS; col++) {
        if(board[col][latestRow] == latestPiece) {
            horizontalCount++;
        } else {
            break;
        }
    }
    
    if (horizontalCount >= 4) {
        return latestPiece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }
    
    // Vertical check    
    var verticalCount = 1;
    for(let row = latestRow - 1; row >= 0; row--) {
        if(board[latestCol][row] == latestPiece) {
            verticalCount++;
        } else {
            break;
        }
    }
    for(let row = latestRow + 1; row < ROWS; row++) {
        if(board[latestCol][row] == latestPiece) {
            verticalCount++;
        } else {
            break;
        }
    }

    if (verticalCount >= 4) {
        return latestPiece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }

    // Top-left to bottom-right diagonal check
    var diagonalCount = 1;
    for (let row = latestRow - 1, col = latestCol - 1; (row >= 0) && (col >= 0); row--, col--) {
        if(board[col][row] == latestPiece) {
            diagonalCount++;
        } else {
            break;
        }
    }
    for (let row = latestRow + 1, col = latestCol + 1; (row < ROWS) && (col < COLS); row++, col++) {
        if(board[col][row] == latestPiece) {
            diagonalCount++;
        } else {
            break;
        }
    }

    if (diagonalCount >= 4) {
        return latestPiece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
    }
    
    // Bottom-left to top-right diagonal check
    diagonalCount = 1;
    for (let row = latestRow + 1, col = latestCol - 1; (row < ROWS) && (col >= 0); row++, col--) {
        if(board[col][row] == latestPiece) {
            diagonalCount++;
        } else {
            break;
        }
    }
    for (let row = latestRow - 1, col = latestCol + 1; (row >= 0) && (col < COLS); row--, col++) {
        if(board[col][row] == latestPiece) {
            diagonalCount++;
        } else {
            break;
        }
    }

    if (diagonalCount >= 4) {
        return latestPiece == HUMAN_CELL ? HUMAN_WINS : COMPUTER_WINS;
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
    if (isGameComplete) {
        noLoop();
    } else {
        drawBoard()
        if ((!isCurrentTurnHuman) && (animatingCol == -1)) {
            animatingCol = getComputerMove(board);
            animatingRow = -1;
        }
    }
}

/**************************************************
 * getComputerMove()
 **************************************************/

function getComputerMove(){
    //var tree = new MinimaxTree(board);
    //var col = MinimaxTree.bestMove;
    //return col;
    return 1;
}

/**************************************************
 * initialise_board()
 **************************************************/

function initialiseBoard() {
   board = [...Array(COLS)].map(() => [...Array(ROWS)].map(() => EMPTY_CELL))
}