import CSP from "./CSP.js";
import Algoritme from "./Algoritme.js"
import SudokuBoard from "../SudokuBoard.js";
import Cell from "./Cell.js";

export default class CSPWithBacktracking extends Algoritme{
    constructor(){
        super();
        this.CSP = new CSP();
    }

    //Solves a given board with CSP with backtracking
    async solve(s_board, delay){
        console.log("CSP with backtracking algorithm working");
        this.delay = delay;
        this.s_board = s_board;

        let cells = await this.CSP.solve_getCells(s_board, delay);
        let answer = cells;
        if(!this.stopBool && !this.CSP.isSolved(answer)){
            answer = await this.backtrack_standard(cells);
        }
        this.s_board.solved = true;
        return this.cellsToArray(answer);
    }

    //Backtracking algorithm where instead of looking for a random empty cell we use the empty cell with the smallest domain
    async backtrack_standard(cells){

        await this.sortCells(cells);
        for(let x=0; x<cells.length; x++){
            let cell = cells[x];
        }

        let i = 0;
        while(cells[i].domain.length === 1){
            cells[i].value = cells[i].domain[0];
            this.s_board.computerMove(cells[i].index, cells[i].value);
            //console.log("Cell " + cells[i].index + ": " + cells[i].value);
            i++;
        }

        while(i < cells.length){
            await this.timeout(this.delay*2);
            if (this.stopBool) return cells;
            if(cells[i].value === 0 && cells[i].domain.length !== 0){
                cells[i].value = cells[i].domain[0];
                this.s_board.computerMove(cells[i].index, cells[i].value);

                console.log("Cell " + cells[i].index + ": " + cells[i].value );
                this.deleteFromAllNeighbors(cells, cells[i].value, i);
                i++;
            }
            else if(cells[i].domain.indexOf(cells[i].value) !== -1 && cells[i].domain.indexOf(cells[i].value) + 1 < cells[i].domain.length){
                let temp = cells[i].value;
                cells[i].value = cells[i].domain[cells[i].domain.indexOf(cells[i].value) + 1];
                this.s_board.computerMove(cells[i].index, cells[i].value);
                this.addToAllNeighbors(cells, temp, i);
                this.deleteFromAllNeighbors(cells, cells[i].value, i);
                i++;

            }
            else{
                let h = cells[i].value;
                cells[i].value = 0;
                this.s_board.computerMove(cells[i].index, cells[i].value);
                this.addToAllNeighbors(cells, h, i);
                console.log("Cell " + cells[i].index + ": " + cells[i].value );
                i--;
            }
        }
        return cells;
    }

    //Sort cells on size of their domain (small -> big) with insertion sort
    async sortCells(cells){
        let i = 0;
        while(cells[i].domain.length !== 1) i++;
        [ cells[0], cells[i] ] = [ cells[i], cells[0]];

        for(let j=1; j<cells.length; j++){
            let h = cells[j];
            i = j - 1;

            while(cells[i].domain.length > h.domain.length){
                cells[i+1] = cells[i];
                i--;
            }
            cells[i+1] = h;
        }
    }

    //Deletes a value from domain of all neighbors of cell in cells with given index
    deleteFromAllNeighbors(cells, value, index){
        cells[index].neighbors.forEach(n => {
            if (n.deleteFromDomain(value))  this.reorderCellToLeft(n, cells, index);
        });
    }

    //Adds a value to domain of all neighbors of cell in cells with given index
    addToAllNeighbors(cells, value, index){
        cells[index].neighbors.forEach(n => {
            if ( n.addToDomain(value) ) this.reorderCellToRight(n, cells, index);
        });
    }

    //Reorder one cell with insertion sort to the left
    reorderCellToLeft(cell, cells, currentPos){
        let index = cells.findIndex( x => x.index === cell.index);
        let i = index - 1;
        while( i > currentPos && cells[i].domain.length > cell.domain.length){
            cells[i+1] = cells[i];
            i--;
        }
        cells[i+1] = cell;
    }

    //Rorder one cell with insertion to the right
    reorderCellToRight(cell, cells, currentPos){
        let index = cells.findIndex( x => x.index === cell.index);
        if (index > currentPos){
            let i = index + 1;
            while( i < cells.length && cells[i].domain.length < cell.domain.length){
                cells[i-1] = cells[i];
                i++;
            }
            cells[i-1] = cell;
        }

    }

    //Transforms cells to an array of their values
    cellsToArray(cells){
        let array = new Array(cells.length);
        cells.forEach( c => {
            array[c.index] = c.value;
        });
        return array;
    }

    stop(){
        this.stopBool = true;
        this.CSP.stopBool = true;
    }
}