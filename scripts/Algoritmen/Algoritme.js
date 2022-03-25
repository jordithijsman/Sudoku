import SudokuBoard from "../SudokuBoard.js";

export default class Algoritme{
    s_board;
    length;
    width;
    delay;
    stopBool;


    constructor(){
        if(this.constructor === Algoritme){
            throw new Error("Van abstracte klassen kunnen geen objecten gemaakt worden");
        }
        this.stopBool = false;
    }

    solve(s_board, delay){
        throw new Error("Deze methode is abstract en moet dus oveschreven worden");
    }

    //index to x coordinate
    indexToX(index){
        return ((index % (this.s_board.width ** 2)) + 1);
    }

    //index to y coordinate
    indexToY(index){
        return Math.floor(index / (this.s_board.width ** 2)) + 1;

    }

    //index to x block coordinate
    indexToXBlok(index){
        let x = this.indexToX(index);
        return Math.floor((x - 1) / this.s_board.width)+1;
    }

    //index to y block coordinate
    indexToYBlok(index){
        let y = this.indexToY(index);
        return Math.floor((y - 1) / this.s_board.width) + 1 ;
    }

    //Checks

    //Checks if the given number is found in the row
    UsedInRow(index, number, array){
        let y = this.indexToY(index);
        let start = ((y-1) * (this.s_board.width ** 2));
        let piece = array.slice(start, start + (this.s_board.width ** 2)); //the row
        return piece.includes(number);
    }

    //Checks if a number is found in the column
    UsedInColumn(index, number, array){
        let x = this.indexToX(index);
        let jumper = (x % (this.s_board.width ** 2)) - 1;
        let piece = [];
        while(jumper <= array.length){
            piece.push(array[jumper]);
            jumper += (this.s_board.width ** 2);
        }
        return piece.includes(number);
    }

    //checks if the given number is used in the block
    UsedInBlock(index, number, array){
        let sizeBlock = this.s_board.width;
        let piece = [];
        let xblok = this.indexToXBlok(index);
        let yblok = this.indexToYBlok(index);

        let start = ((yblok - 1) * (sizeBlock * (this.s_board.width ** 2)) + ((xblok - 1) * sizeBlock));

        for(let l = 0; l < sizeBlock; l++){
            piece.push(array.slice(start + ((this.s_board.width ** 2) * l) , start + sizeBlock + ((this.s_board.width ** 2) * l)));
        }
        let ret = [];
        for(let l = 0; l < sizeBlock; l++){
            for(let i = 0; i < sizeBlock; i++){
                ret.push(piece[l][i]);
            }
        }
        return ret.includes(number);
    }

    //Checks if a move is legal
    isLegalMove(index, number, array){
        return !(this.UsedInRow(index, number, array))
            && !(this.UsedInColumn(index, number, array))
            && !(this.UsedInBlock(index, number, array));
    }

    timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    stop(){
        this.stopBool = true;
    }
}

