import Caretaker from "./Caretaker.js";
import CSPWithBacktracking from "./Algoritmen/CSPWithBacktracking.js";
import SudokuGenerator from "./Algoritmen/SudokuGenerator.js";
//import * as rxjs from "rxjs";       //In commentaar plaatsen om te runnen in webbrowser! nodig om te runnen binnen IntelliJ
const {Subject } = rxjs;

export default class SudokuBoard {
    constructor(board, solution, width, id, renderer) {
        this.cheat = false;
        this.visual = true;
        this.id = id;
        this.width = width;
        this.board = [];
        if(board.length !== 0) {
            this.board = this.deepCopyArray(board);
            this.solution = this.deepCopyArray(solution);
            this.startboard = this.deepCopyArray(board);
        }

        this.moves = 0;
        this.solved = false;
        this.caretaker = new Caretaker();
        this.updater = new Subject;
        this.renderer = renderer;

    }


    checkBoard() {
        for(let i = 0; i < this.board.length; i++) {
            if (this.board[i] !== this.solution[i]) {
                return false
            }
        }
        return true;
    }

    //this function undo's the last move
    undo() {
        let tempBoard = this.caretaker.getPreviousState().loadBoard();
        let i = 0;
        while (i < tempBoard.length && tempBoard[i] === this.board[i]) {
            i++;
        }
        if (tempBoard[i] !== this.board[i]) {
            this.renderer.renderFillSquare(i, tempBoard[i], this.id);
        }
    }

    move(nrSquare, nrToFillOut) {
        if (nrToFillOut === 0 || isNaN(nrToFillOut) || nrToFillOut > this.width*this.width) {
            console.log(this.id + "_" + nrSquare);
            document.getElementById(this.id + "_" + nrSquare).value = "";
            this.board[nrSquare] = 0;
        } else {
            this.moves++;
            this.board[nrSquare] = +nrToFillOut;
            if (this.visual && this.cheat) this.updater.next([nrSquare, this.board[nrSquare]]);
        }
        this.caretaker.getNewState().saveBoard(this.board);

    }

    computerMove(nrSquare, nrToFillOut){
        this.moves++;
        this.board[nrSquare] = nrToFillOut;
        if (this.visual) this.updater.next([nrSquare, this.board[nrSquare]]);

    }

    //Waarschijnlijk niet meer nodig
    getSolution(){
        this.visual = false;
        let alg = new CSPWithBacktracking();
        alg.solve(this, 0, false).then((x) => {
            this.solution = x;
            console.log("Antwoord: " + this.solution);
            this.visual = true;
            this.board = this.deepCopyBoard(this.startboard);
        });



    }
    deepCopyBoard(board){
        let answer = [];
        board.forEach(x => answer.push(x));
        return answer;
    }

    generateBoard(){
        this.visual = false;
        let generator = new SudokuGenerator(this);
        generator.makeSudoku();
    }

    deepCopyArray(array){
        let answer = [];
        array.forEach(x => answer.push(x));
        return answer;
    }

    //checks if a board is solved
    isSolved(){
        for(let i = 0; i<this.board.length; i++){
            if(this.board[i] === 0) return false;
        }
        return true;
    }




}
