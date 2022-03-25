export default class Renderer {
    constructor(DOM) {
        this.DOM = DOM;
        this.squareId = 0;
        this.boards = []; //holds all the boards in renderer-object DOM
    }

    //render values for all squares
    renderFillBoard(boardArray, board) {
        let i = 0;
        for (let nrToRender of boardArray) {
            this.renderFillSquare(i, nrToRender, board);
            i++;
        }
    }

    //render sudoku-grid with dimensions WxH in DOM for SudokuBoard object
    renderGameBoard(w, h, tableDOMElementId, sudokuBoardObject) {
        this.boards[tableDOMElementId] = sudokuBoardObject
        let table = this.DOM.getElementById(tableDOMElementId);
        table.innerHTML = "";
        for (let i = 0; i < w; i++) {
            let colgroup = this.DOM.createElement("colgroup");
            for (let k = 0; k < w; k++) {
                colgroup.appendChild(this.DOM.createElement("col"));
            }
            table.appendChild(colgroup);
        }
        for (let i = 0; i < w; i++) {
            let body = this.renderTableBody(w, w, tableDOMElementId);
            table.appendChild(body);
        }
        this.squareId = 0;
    }

    //render highscores grid
    renderHighscores(data) {

    }

    //helper functions

    //build inner HTML-code for Sudoku-grid
    renderTableBody(w, h, id) {
        let body = this.DOM.createElement("tbody");
        for (let i = 0; i < w; i++) {
            let tr = this.DOM.createElement("tr");
            for (let i = 0; i < w * w; i++) {
                let td = this.DOM.createElement("td");
                let input = this.DOM.createElement("input");
                if(w === 4){
                    td.setAttribute("class", "big");
                    input.setAttribute("class", "big");
                }
                input.setAttribute("id", id + "_" + this.squareId.toString())
                input.disabled = true;

                //adds eventlistener to listen for user input
                input.addEventListener("keyup", (event) => {
                    let pathArray = event.target.id.split("_");
                    this.boards[id.toString()].move(pathArray[pathArray.length - 1], event.target.value);
                });

                this.squareId++;
                td.appendChild(input);
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
        return body;
    }

    //render the value of one square
    renderFillSquare(squareIdNr, nrToRender, board) {
        let input = document.getElementById(board.id.toString() + "_" + squareIdNr);
        if (nrToRender === 0 || isNaN(nrToRender)) {
            input.value = null;
        } else {
            input.value = nrToRender;
            if (board.id === "computerBoard" && board.startboard[squareIdNr] === 0) {
                this.renderFillSquareColor(squareIdNr, nrToRender, board);
            }
        }
        input.disabled = true;
    }

    renderFillSquareColor(squareIdNr, nrToRender, board) {
        let input = document.getElementById("computerBoard" + "_" + squareIdNr);
        if (board.solution[squareIdNr] === nrToRender) {
            input.style.backgroundColor = "green";
        } else {
            input.style.backgroundColor = "red"
        }

    }
}