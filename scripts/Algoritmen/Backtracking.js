import Algoritme from "./Algoritme.js";
import Timer from "../Timer.js";
import {HighscoresController} from "../HighscoresController.js"

export default class Backtracking extends Algoritme{

    constructor(){
        super();
    }

    async solve(s_board, delay){
        //console.log("Backtracking algorithm working");

        this.delay = delay;
        this.s_board=s_board;
        await this.solve_recursive(s_board);
        this.s_board.solved = true;
    }

    async solve_recursive(s_board){
        await this.timeout(this.delay);
        if(this.stopBool) return true;      //stop the algorithm
        let emptyCell = this.getNextEmptyCell(this.s_board.board);
        //in case there are no more empty cells (sudoku has been solved)
        if(emptyCell === -1){
            return true;
        }

        //possible values
        for(let val = 1; val <= (this.s_board.width ** 2); val++){
            if(this.isLegalMove(emptyCell, val, this.s_board.board)){
                this.s_board.computerMove(emptyCell, val);
                if( await this.solve_recursive(s_board)){
                    return true;
                }
                else{
                    this.s_board.computerMove(emptyCell, 0); //visualizes a move
                    await this.timeout(this.delay);
                }
            }
        }
        return false;


    }

    //gets the next empty cell
    getNextEmptyCell(array){
        for(let i = 0; i <= array.length; i++){
            if(array[i] === 0){
                return i;
            }
        }
        return -1;
    }

}