//First you have to dowload and install Node: https://nodejs.org/en/#download
//in embedded terminal type: npm install --save-dev jest
//Tests uitvoeren door in CLI: node --experimental-vm-modules node_modules/.bin/jest
//more info:    https://www.jetbrains.com/help/idea/running-unit-tests-on-jest.html#ws_jest_running_tests
//              https://jestjs.io/docs/ecmascript-modules

//
//         constructor(board, [], Math.sqrt(Math.sqrt(board.length)), 0, false, null);
//

import CSP from "../scripts/Algoritmen/CSP";
import SudokuBoard from "../scripts/SudokuBoard";

const csp = new CSP(false);

//Testen voor 2X2 board
let startboard = [2,1,0,0,0,3,2,0,0,0,0,4,1,4,3,2];
let s_startboard = new SudokuBoard(startboard, [], 2, 0, false, null);
s_startboard.board = startboard;
s_startboard.width = 2;

let wrongboard = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let solvedboard = [2,1,4,3,4,3,2,1,3,2,1,4,1,4,3,2];

const x = csp.solve(s_startboard);
test("solved 2X2", ()=>{
    expect(x).toEqual(solvedboard);
});

//voor 3X3
/* Werkt momenteel niet

let startboard_9 =  [0,0,0,2,6,0,7,0,1,6,8,0,0,7,0,0,9,0,1,9,0,0,0,4,5,0,0,8,2,0,1,0,0,0,4,0,0,0,4,6,0,2,9,0,0,0,5,0,0,0,3,0,2,8,0,0,9,3,0,0,0,7,4,0,4,0,0,5,0,0,3,6,7,0,3,0,1,8,0,0,0];
let s_startboard_9 = new SudokuBoard(startboard_9, [], 3, 1, false, null);
s_startboard_9.board = startboard_9;
s_startboard_9.width = 3;

let solvedboard_9 = [4,3,5,2,6,9,7,8,1,6,8,2,5,7,1,4,9,3,1,9,7,8,3,4,5,6,2,8,2,6,1,9,5,3,4,7,3,7,4,6,8,2,9,1,5,9,5,1,7,4,3,6,2,8,5,1,9,3,2,6,8,7,4,2,4,8,9,5,7,1,3,6,7,6,3,4,1,8,2,5,9];

const y = csp.solve(s_startboard_9);
test("solved 3X3", ()=>{
    expect(y).toEqual(solvedboard_9);
});
*/
