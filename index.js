/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

var initializeGame = function(){
    //Closure helps in reducing data transfer by using the min file size for production
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    document.getElementById('results').innerHTML = '';
}
function getBoxContent(rowIdx, colIdx) {
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
        return '<span class="cross">X</span>';
    }
    else if (gridValue === 2) {
        return '<span class="cross">O</span>';
    } else {
        return '';
    }
}
function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        //let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + getBoxContent(rowIdx, colIdx) + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function getBoxByIds(rowIdx, colIdx) {
    return document.querySelector('.box[rowidx="' + rowIdx + '"][colidx="' + colIdx + '"]');
}

function IsAnyCellEmpty(rowIdx, colIdx) {
    var isEmpty = false;
    for (let colIdx = 0; colIdx < GRID_LENGTH && !isEmpty; colIdx++) {

        for (let rowIdx = 0; rowIdx < GRID_LENGTH && !isEmpty; rowIdx++) {
            if (grid[colIdx][rowIdx] == 0) {
                isEmpty = true;
            }
        }
    }
    return isEmpty;
}

function DisableCellEmpty(rowIdx, colIdx) {
    
    for (let colIdx = 0; colIdx < GRID_LENGTH && !isEmpty; colIdx++) {

        for (let rowIdx = 0; rowIdx < GRID_LENGTH && !isEmpty; rowIdx++) {
            if (grid[colIdx][rowIdx] == 0) {
                getBoxByIds(rowIdx, colIdx).removeEventListener('click', onBoxClick);
            }
        }
    }
    
}

function onValueChanged(rowIdx, colIdx) {
    getBoxByIds(rowIdx, colIdx).removeEventListener('click', onBoxClick);
    getBoxByIds(rowIdx, colIdx).innerHTML = getBoxContent(rowIdx, colIdx);
}
function DisplayResult(index){
    var content = '';
    switch(index){
        case 1:
        content = 'Player Won!!';
        break;
        case 2:
        content = 'Computer Won!!';
        break;
        case 0:
        content = "It's a Tie.";
        break;
    }
    document.getElementById('results').innerHTML = content;
    DisableCellEmpty();
}
function IsMoveResults(){
    //Row wise winning
    for (let colIdx = 0; colIdx < GRID_LENGTH ; colIdx++) {
        var first = grid[colIdx][0];
        var isWin = true;
        for (let rowIdx = 1;rowIdx < GRID_LENGTH && isWin; rowIdx++) {
            if(first !== grid[colIdx][rowIdx]){
                isWin = false;
            }
        }
        if(first !== 0 && isWin ){
            DisplayResult(first);   
            return true;
        }
    }
    //Column wise winning
    for (let rowIdx = 1; rowIdx < GRID_LENGTH; rowIdx++) {
        var first = grid[0][rowIdx];
        var isWin = true;
        for (let colIdx = 0;   colIdx < GRID_LENGTH && isWin ; colIdx++) {
            if(first !== grid[colIdx][rowIdx]){
                isWin = false;
            }
        }
        if(first !== 0 && isWin){
            DisplayResult(first);  
            return true; 
        }
    }

    //Top left to bottom right
    var first = grid[0][0];
    var isWin = true;
    for (let colIdx = 1, rowIdx = 1;  colIdx < GRID_LENGTH && rowIdx < GRID_LENGTH ; colIdx++,  rowIdx++) { 
            if(first !== grid[colIdx][rowIdx]){
                isWin = false;
            }
        if(first !== 0 && isWin){
            DisplayResult(first);  
            return true; 
        }
    }

    //Top Right to bottom left
    var first = grid[GRID_LENGTH-1][0];
    var isWin = true;
    for (let colIdx = GRID_LENGTH-2, rowIdx = 1; colIdx >=0 && rowIdx < GRID_LENGTH ; colIdx--,  rowIdx++) { 
            if(first !== grid[colIdx][rowIdx]){
                isWin = false;
            }
    }
        if(first !== 0 && isWin){
            DisplayResult(first);  
            return true; 
        }

    if(!IsAnyCellEmpty()){
        DisplayResult(0);
    }
    return false;
}

function onBoxClick() {
    //console.log("Clicked");
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    onValueChanged(rowIdx, colIdx);

    if (IsAnyCellEmpty()  && !IsMoveResults()) {
        computersMove();
    } else {
        //Show result
        IsMoveResults();
    }
    //renderMainGrid();
    //addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function computersMove() {
    //We will check for all empty Values and place the 2:'O' there
    for (let colIdx = 0; colIdx < GRID_LENGTH ; colIdx++) {

        for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
            if (grid[colIdx][rowIdx] == 0) {
                grid[colIdx][rowIdx] = 2;
                onValueChanged(rowIdx, colIdx);
                IsMoveResults();
                return;
            }
        }
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
};

initializeGame();