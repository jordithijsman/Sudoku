import Algoritme from "./Algoritme.js";
import SudokuBoard from "../SudokuBoard.js";

export default class Bruteforce extends Algoritme{
    constructor(){
        super();
        this.indexes = [];
    }

    //checks if a given row is valid or not
    checkRow(board, row){
        let check = [];

        check.push(true);
        for(let i=1; i<=this.s_board.width*this.s_board.width+1; i++){
            check.push(false);
        }

        for(let i=row*this.s_board.width*this.s_board.width; i<(row*this.s_board.width*this.s_board.width + this.s_board.width*this.s_board.width); i++){
            if(check[board[i]] === true){
                return false;
            }
            check[board[i]] = true;
        }
        return true;
    }

    //checks if a given column is valid or not
    checkColumn(board, column){
        let check = [];
        check.push(true);
        for(let i=1; i<this.s_board.width*this.s_board.width+1; i++){
            check.push(false);
        }

        for(let i=column; i<(this.s_board.width*this.s_board.width); i=i+this.s_board.width*this.s_board.width){
            if(check[board[i]] === true){
                return false;
            }
            check[board[i]] = true;
        }
        return true;
    }

    //checks if a given square is valid or not
    checkSquare(board, square){
        let check = [];
        check.push(true);
        for(let i=1; i<=this.s_board.width*this.s_board.width; i++){
            check.push(false);
        }
        let teller = parseInt(square/this.s_board.width)*this.s_board.width*this.s_board.width*this.s_board.width + (square%this.s_board.width)*this.s_board.width;       //index of first cell in a given square
        for(let i=0; i<this.s_board.width ; i++) {
            for(let j=0; j<this.s_board.width; j++){
                if(check[board[teller+j]] === true) return false;
                else check[board[teller+j]] = true;
            }
            teller += this.s_board.width*this.s_board.width;
        }
        return true;
    }

    //checks if a given board is valid or not
    checkBoard(board){
        for(let i=0; i<(this.s_board.width*this.s_board.width) ; i++){
            if (!this.checkRow(board, i) ) return false;
            if(!this.checkColumn(board, i)) return false;
            if(!this.checkSquare(board, i)) return false;
        }
        return true;
    }

    //solves a board with bruteforce
    async solve(s_board, delay){
        console.log("Brute force algorithm working");
        this.s_board = s_board;
        this.delay = delay;

        //Fill all empty cells with 1 & push all empty cells to indexes
        for(let i = 0; i<this.s_board.board.length; i++){
            if(this.s_board.board[i] === 0){
                this.s_board.board[i]= 1;
                this.s_board.computerMove(i,1);
                this.indexes.push(i);
            }
        }
        let solved = false;
        let i = 0;
        let index = this.indexes[i];
        while(!this.stopBool && !solved){
            await this.timeout(0);      //to give the person a chance to play, if this is left out the browser freezes
            if(this.s_board.board[index] === 9){
                while(this.s_board.board[index] === 9){
                    //this.s_board.board[index] = 1;
                    this.s_board.computerMove(index, 1);
                    index = this.indexes[++i];
                }

                //this.s_board.board[index]++;
                this.s_board.computerMove(index, this.s_board.board[index] + 1);
                i = 0;
                index = this.indexes[i];
            }else{

                //this.s_board.board[index]++;
                this.s_board.computerMove(index, this.s_board.board[index] + 1);
            }

            solved = this.checkBoard(this.s_board.board, this.s_board.width);
        }
        this.s_board.solved = true;
        return this.s_board;
    }






}


