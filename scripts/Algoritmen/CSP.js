import Cell from "./Cell.js";
import SudokuBoard from "../SudokuBoard.js";
import Algoritme from "./Algoritme.js";


export default class CSP extends Algoritme{
    //solves a given board with CSP if possible, if not possible returns closest algorithm can come to the solution
    async solve(s_board, delay){
        console.log("CSP algorithm working");
        let answer = await this.solve_getCells(s_board, delay);
        this.s_board.solved = true;
        return this.cellsToArray(answer);
    }

    //solves a given board with CSP if possible, if not possible returns closest algorithm can come to the solution
    //return cells instead of a full board, used for CSPWithBacktracking
    async solve_getCells(s_board, delay){
        this.s_board = s_board;
        this.delay = delay;
        this.cells = this.initCells();
        this.initNeighbors();
        this.initDomains();

        let answer = await this.AC3(this.cells);
        return answer;
    }

    //Makes an array of cells. Initiates value, index, row, col, box & isStartingCell
    initCells(){
        let cells = [];
        for (let i=0; i<this.s_board.board.length; i++){
            let row = Math.floor(i/(this.s_board.width*this.s_board.width));
            let col = i%(this.s_board.width*this.s_board.width);
            let box = (Math.floor(row/this.s_board.width))*this.s_board.width + Math.floor(col/this.s_board.width);
            let cell = new Cell(this.s_board.board[i], i, row, col, box, [], [], this.s_board.board[i] !== 0);
            cells.push(cell);

        }
        return cells;
    }

    //Adds all cells in same row, column or box to neighbors, does this for all cells in this.cells
    initNeighbors(){
        for(let cell of this.cells){
            this.cells
                .filter(x => (x.row === cell.row || x.col === cell.col || x.box === cell.box) && x !== cell)
                .forEach(x => {
                    cell.neighbors.push(x);
                });
        }
    }

    //vul domein van lege cellen in met 1-breedte sudoku & het domein van niet lege cellen met hun value.
    //Hierna voor alle niet lege cellen het domein van hun neighbors aanpassen zodat de value er niet meer inzit.
    //Fills the domain of all cells in this.cells with all possible values for that cell
    initDomains(){
        for(let cell of this.cells){
            if(cell.value !== 0){
                cell.domain.push(cell.value);
                //this.s_board.computerMove(cell.index, cell.value);      //colouring starting cells
            }
            else{
                for(let i=1; i<=(this.s_board.width*this.s_board.width); i++){
                    cell.domain.push(i);
                }
            }
        }
        for(let cell of this.cells){
            if(cell.value !== 0){
                cell.neighbors.forEach(x => {
                    let index = x.domain.indexOf(cell.value);
                    if (index > -1) x.domain.splice(index, 1);
                });
            }
        }

    }



    //checks if the value (not actual value yet but from domain with length 1!) of b is in the domain of a and deletes it
    //returns true if anything was deleted
    checkDomains(a, b){      // PAS OP b moet lengte 1 hebben!
        let index;

        if(a.domain.indexOf(b.domain[0]) > -1) {
            index = a.domain.indexOf(b.domain[0]);
            a.domain.splice(index, 1);
            return true;
        }
        return false;
    }

    //The actual algorithm, tries to solve a board (made from cells) as good as possible
    async AC3(cells){
        let constraints = [];
        cells.forEach(cell => {
            if(cell.domain.length === 1){
                cell.neighbors.forEach( x => {
                    constraints.push([x, cell]);
                });
            }

        });

        let constraint;
        while(!this.stopBool && constraints.length > 0){
            await this.timeout(this.delay);
            constraint = constraints.shift();
            if(this.checkDomains(constraint[0], constraint[1]) && constraint[0].domain.length === 1){
                this.s_board.computerMove(constraint[0].index, constraint[0].domain[0]);
                constraint[0].neighbors.forEach(x => {
                    constraints.push([x, constraint[0]]);
                })
            }
        }
        if(!this.stopBool && this.isSolved(cells)){
            for (let i = 0; i<cells.length; i++){
                if(this.stopBool) return cells;
                await this.timeout(this.delay);
                let cell = cells[i];
                cell.value = cell.domain[0];
                if(!cell.isStartingCell) this.s_board.computerMove(cell.index, cell.value);
            }

        }
        else if(!this.stopBool){
            console.log("Not possible to solve this board with only CSP!!");
        }
        return cells;

    }

    //checks if a board is solved (= every cell has a domain with 1 value inside)
    isSolved(cells){
        for(let i=0; i<cells.length; i++){
            if(cells[i].domain.length !== 1){
                return false;
            }
        }
        return true;
    }

    //transforms cells to an array
    cellsToArray(cells){
        let array = [];
        cells.forEach(cell => {
            array.push(cell.value);
        });
        return array;
    }

    //prints all cells to the console, used for debugging
    printCells(cells){
        cells.forEach(cell => {
            console.log(cell.index + ": " + cell.value + ", domain: " + cell.domain);
        })
    }
}





