import Algoritme from "../scripts/Algoritmen/Algoritme.js";
import SudokuGenerator from "../scripts/Algoritmen/SudokuGenerator.js";
import SudokuBoard from "../scripts/SudokuBoard.js";

let board = new SudokuBoard([0], [0], 4, "test", false, null);

let generator = new SudokuGenerator(board);
generator.makeSudoku();
console.log("board: " + board.board);
console.log("Solution: " + board.solution);

let test = [0,15,0,9,2,1,10,0,0,0,4,12,14,0,0,5,5,8,6,0,9,14,0,12,0,2,3,0,13,10,4,11,0,11,0,0,0,7,0,4,9,6,14,10,1,12,8,15,4,10,12,0,0,0,15,0,1,0,0,0,0,9,16,0,3,0,9,0,0,0,0,0,0,0,0,14,0,0,12,0,15,14,8,5,0,11,13,0,16,7,12,0,0,0,0,9,1,0,0,0,14,0,12,0,0,15,0,0,0,0,0,0,0,0,11,0,0,16,0,0,5,1,2,3,0,14,13,7,9,0,0,10,0,4,0,1,0,0,6,8,0,5,2,0,0,2,1,0,10,0,0,0,0,13,0,0,9,0,14,0,8,5,0,0,6,13,9,16,2,14,0,7,0,0,0,3,13,0,14,0,12,0,11,0,3,9,10,0,4,0,6,8,0,1,0,0,8,0,4,0,14,10,15,0,0,13,7,6,14,0,15,8,0,10,0,0,11,12,0,2,0,3,1,4,0,6,10,4,7,0,0,0,0,0,5,0,8,0,0,0,0,13,3,7,11,5,1,0,6,0,0,0,0,16,15,0];