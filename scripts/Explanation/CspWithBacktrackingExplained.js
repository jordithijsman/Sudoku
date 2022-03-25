import AExplained from "./AExplained.js";

export default class CspWithBacktrackingExplained extends AExplained {

    constructor(player_board, text) {
        super(player_board, text);
        this.player_board.board =  [0, 0, 0, 0, 0, 1, 2, 4, 4, 2, 0, 0, 1, 3, 4, 2];
    }

    // hard coded methods to show the right values on the sudoku

    step2(amountStep2, nextButton, previousButton) {
        let extraText = "";
        previousButton.disabled = true;
        nextButton.disabled = false;
        this.clearColor();
        if (amountStep2 === 0) {
            this.player_board.board[0] = 2;
            this.player_board.board[1] = 4;
            this.player_board.board[4] = 3;
            this.colorChangedCell(0);
            this.colorChangedCell(4);
            this.colorChangedCell(1);
            extraText = "\n\nFirst cell with smallest domain is cell 2 => domain = [1,3]";
        }if (amountStep2 === 1) {
            this.player_board.board[3] = 3;
            this.player_board.board[11] = 1;
            this.player_board.board[10] = 3;
            this.colorChangedCell(3);
            this.colorChangedCell(11);
            this.colorChangedCell(10);
        }
        /*if (amountStep2 === 0) {
            extraText = "\n\nFirst cell with smallest domain is cell 0 => domain = [1,2]";
        }
        if (amountStep2 === 1) {
            extraText = "\n\nFirst cell with smallest domain is cell 1 => domain = [2,4]";
        }
        if (amountStep2 === 2) {
            this.player_board.board[3] = 4;
            this.player_board.board[4] = 3;
            this.colorChangedCell(3);
            this.colorChangedCell(4);
            extraText = "\n\nFirst cell with smallest domain is cell 6 => domain = [2,4]"
        }

        if (amountStep2 === 0) {
            let cellToChange = [1,11,13];
            for (let i = 0; i<cellToChange.length; i++){
                this.colorChangedCell(cellToChange[i]);
            }
            this.player_board.board[1] = 4;
            this.player_board.board[11] = 3;
            this.player_board.board[13] = 3;
            extraText = "\n\nFirst cell with smallest domain is cell 0 => domain = [1,2]";
        }if (amountStep2 === 1) {
            this.player_board.board[3] = 2;
            this.colorChangedCell(3);
            extraText = "\n\nFirst cell with smallest domain is cell 6 => domain = [2,4]";
        }
        if (amountStep2 === 2) {
            this.player_board.board[7] = 4;
            this.player_board.board[14] = 4;
            this.colorChangedCell(7);
            this.colorChangedCell(14);
        }*/
        this.text.innerText = this.text.innerText + extraText;

    }

    step3(amountStep3, nextButton, previousButton) {
        this.clearColor();
        nextButton.disabled = true;
        previousButton.disabled = false;
        if (amountStep3 === 0) {
            this.player_board.board[2] = 1;
            this.colorChangedCell(2);
        }if (amountStep3 === 1) {
            nextButton.disabled = false;
            previousButton.disabled = true;
        }
        /*if (amountStep3 === 0) {
            this.player_board.board[0] = 1;
            this.colorChangedCell(0);
        }
        if (amountStep3 === 1) {
            this.clearColor();
            this.player_board.board[6] = 2;
            this.colorChangedCell(6);
        }

        if (amountStep3 === 0) {
            this.player_board.board[0] = 1;
            this.colorChangedCell(0);
        }
        if (amountStep3 === 1) {
            this.player_board.board[1] = 2;
            this.colorChangedCell(1);
        }
        if (amountStep3 === 2) {
            this.clearColor();
            this.player_board.board[6] = 2;
            this.colorChangedCell(6);
        }*/
    }

    step4(amountStep4, nextButton, previousButton) {

    }
}
