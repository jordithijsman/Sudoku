//First you have to dowload and install Node: https://nodejs.org/en/#download
//in embedded terminal type: npm install --save-dev jest
//Tests uitvoeren door in CLI: node --experimental-vm-modules node_modules/.bin/jest
//more info:    https://www.jetbrains.com/help/idea/running-unit-tests-on-jest.html#ws_jest_running_tests
//              https://jestjs.io/docs/ecmascript-modules

//
//         constructor(board, [], Math.sqrt(Math.sqrt(board.length)), 0, false, null);
//
/*
    Om deze test uit te voeren moet je nog volgende lijnen in commentaar plaatsen in SudokuBoard:
        const { Observable, Subject } = rxjs;
        const { map } = rxjs.operators;
        this.updater = new Subject;

 */
import Bruteforce from "../scripts/Algoritmen/Bruteforce.js";
import SudokuBoard from "../scripts/SudokuBoard";

let startboard = [2,1,0,0,0,3,2,0,0,0,0,4,1,4,3,2];
let s_startboard = new SudokuBoard(startboard, [], 2, 0, false, null);
s_startboard.board = startboard;
s_startboard.width = 2;

let wrongboard = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let solvedboard = [2,1,4,3,4,3,2,1,3,2,1,4,1,4,3,2];

let startboard_9 =  [0,0,0,2,6,0,7,0,1,6,8,0,0,7,0,0,9,0,1,9,0,0,0,4,5,0,0,8,2,0,1,0,0,0,4,0,0,0,4,6,0,2,9,0,0,0,5,0,0,0,3,0,2,8,0,0,9,3,0,0,0,7,4,0,4,0,0,5,0,0,3,6,7,0,3,0,1,8,0,0,0];
let s_startboard_9 = new SudokuBoard(startboard_9, [], 3, 1, false, null);
s_startboard_9.board = startboard_9;
s_startboard_9.width = 3;

let solvedboard_9 = [4,3,5,2,6,9,7,8,1,6,8,2,5,7,1,4,9,3,1,9,7,8,3,4,5,6,2,8,2,6,1,9,5,3,4,7,3,7,4,6,8,2,9,1,5,9,5,1,7,4,3,6,2,8,5,1,9,3,2,6,8,7,4,2,4,8,9,5,7,1,3,6,7,6,3,4,1,8,2,5,9];
const brute = new Bruteforce(false);

//Testen voor 2X2 board

brute.s_board = s_startboard;

const row_true = brute.checkRow(solvedboard, 1);
test("checked correct row", ()=>{
    expect(row_true).toBe(true)
});

const row_false = brute.checkRow(wrongboard, 1);
test("checked wrong row", ()=>{
    expect(row_false).toBe(false)
});

const column_true = brute.checkColumn(solvedboard, 1);
test("checked correct column", ()=>{
    expect(column_true).toBe(true)
});

const column_false = brute.checkRow(wrongboard, 1);
test("checked wrong column", ()=>{
    expect(column_false).toBe(false)
});

const square_true = brute.checkSquare(solvedboard, 1);
test("checked correct square", ()=>{
    expect(square_true).toBe(true)
});

const square_false = brute.checkRow(wrongboard, 1);
test("checked wrong square", ()=>{
    expect(square_false).toBe(false)
});


const checkedBoard= brute.checkBoard(solvedboard);
test("checked True board", ()=>{
    expect(checkedBoard).toBe(true);
});

const checkedFalseBoard= brute.checkBoard(wrongboard);
test("checked False board", ()=>{
    expect(checkedFalseBoard).toBe(false);
});


const solvedBoard_4 = brute.solve(s_startboard);
test("solveBoard(4X4)", ()=>{
    expect(solvedBoard_4.board).toEqual([2,1,4,3,4,3,2,1,3,2,1,4,1,4,3,2]);
});


//voor 3X3
const row_true_9 = brute.checkRow(solvedboard_9, 1);
test("checked correct row (9X9)", ()=>{
    expect(row_true_9).toBe(true)
});

const column_true_9 = brute.checkColumn(solvedboard_9, 0);
test("checked correct column (9X9)", ()=>{
    expect(column_true_9).toBe(true)
});

const square_true_9 = brute.checkSquare(solvedboard_9, 5);
test("checked correct square (9X9)", ()=>{
    expect(square_true_9).toBe(true)
});

const checkedBoard_9 = brute.checkBoard(solvedboard_9);
test("checked True board (9X9)", ()=>{
    expect(checkedBoard_9).toBe(true);
});


/*
//duurt lang
const solvedBoard_9 = brute.solve(startboard_9, 3)
test("solveBoard(9X9)", ()=>{
    expect(solvedBoard_9).toEqual(solvedBoard_9);
});
*/