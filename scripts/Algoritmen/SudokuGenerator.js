import Backtracking from "./Backtracking.js";


export default class SudokuGenerator{
    s_board;

    constructor(s_board){
        this.bt = new Backtracking();
        this.s_board = s_board;
        this.bt.s_board = s_board;


    }

    //Generates a sudoku, initiates s_board.board, s_board.solution & s_board.startboard
    makeSudoku(){
        this.fillGrid();
        this.s_board.solution = this.deepCopyArray(this.s_board.board);
        console.log("Solution: " + this.s_board.solution);
        this.removeCells();
        this.s_board.startboard = this.deepCopyArray(this.s_board.board);
        console.log("Startboard: " + this.s_board.startboard);
    }

    //Fills s_board.board randomly but correctly
    fillGrid(){
        this.numberslist = [];
        for (let i = 1; i<=this.s_board.width*this.s_board.width; i++){
            this.numberslist.push(i);
        }
        this.fillCell(0);
    }

    //Recursive function that iterates over all cells & fills them with a random possible value
    fillCell(index){
        if (index === (this.s_board.width*this.s_board.width*this.s_board.width*this.s_board.width)){
            return true;
        }
        else{
            let local_numberslist = this.shuffle(this.numberslist);
            for (let i = 0; i<local_numberslist.length; i++){
                let number = local_numberslist[i];
                if(this.bt.isLegalMove(index, number, this.s_board.board)){
                    this.s_board.board[index] = number;
                    if (this.fillCell(index+1)){
                        return true;
                    }
                    else{
                        this.s_board.board[index] = 0;
                    }
                }
            }
            return false;
        }
    }

    //Shuffles an array with Fisher-Yates Shuffle
    shuffle(numberslist){
        let randomIndex;
        let local_list = [];
        numberslist.forEach(x => local_list.push(x));
        let currentIndex = local_list.length;

        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            [local_list[randomIndex], local_list[currentIndex]] = [local_list[currentIndex], local_list[randomIndex]];
        }
        return local_list;

    }

    //Removes a certain amount of values from the board but checks that only one solution is possible
    removeCells(){

        let attempts = 3;
        let aantalCellen = this.s_board.width*this.s_board.width*this.s_board.width*this.s_board.width;
        while(attempts > 0){

            let index = Math.floor(Math.random() * aantalCellen);
            while (this.s_board.board[index] === 0){
                index = Math.floor(Math.random() * aantalCellen);
            }
            let backup = this.s_board.board[index];
            this.s_board.board[index] = 0;
            let copied = this.deepCopyArray(this.s_board.board);
            this.countSolutions(copied);
            if (this.counter !== 1){
                this.s_board.board[index] = backup;
                attempts -= 1;
            }
        }
    }

    timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Counts how many solutions a given board has
    countSolutions(array){
        this.counter = 0;
        this.recursive(array);
        return this.counter;
    }

    //Recursive function to help countSolutions
    recursive(array){
        let index = this.bt.getNextEmptyCell(array);
         this.timeout(0);
        if(index !== -1){
            for(let i = 1; i <= this.s_board.width*this.s_board.width; i++){
                if (this.bt.isLegalMove(index, i, array)){
                    array[index] = i;
                    this.recursive(array);
                    array[index] = 0;
                }
            }
            return true;
        }
        else{
            this.counter++;
            return true;
        }
    }

    
    deepCopyArray(array){
        let answer = [];
        array.forEach(x => answer.push(x));
        return answer;
    }
}