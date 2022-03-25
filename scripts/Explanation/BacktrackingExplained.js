import AExplained from "./AExplained.js";

export default class BacktrackingExplained extends AExplained {

    constructor(player_board, text) {
        super(player_board, text);
        player_board.board = [0, 0, 0, 0, 0, 1, 2, 4, 0, 2, 1, 3, 1, 0, 4, 2];
    }

    // hard coded methods to show the right values on the sudoku

    step2(amountStep2, nextButton, previousButton) {
        if (amountStep2 === 0 || amountStep2 === 1) {
            this.player_board.board[0] = amountStep2 + 1;
            this.colorChangedCell(0);
        }
        else if (this.inRange(amountStep2, 2, 4)) {
            this.player_board.board[1] = amountStep2 - 1;
            this.colorChangedCell(1);
        }
        else if (this.inRange(amountStep2, 5, 8)) {
            this.player_board.board[2] = amountStep2 - 4;
            this.colorChangedCell(2);
        }
        else if (this.inRange(amountStep2, 9, 11)) {
            this.player_board.board[2] = amountStep2 - 8;
            this.colorChangedCell(2);
        }
        else if (amountStep2 === 12) {
            this.player_board.board[3] = 1;
            this.colorChangedCell(3);
        }
        else if (this.inRange(amountStep2, 13, 15)) {
            this.player_board.board[4] = amountStep2 - 12;
            this.colorChangedCell(4);
        }
        else if (this.inRange(amountStep2, 16, 19)) {
            this.player_board.board[8] = amountStep2 - 15;
            this.colorChangedCell(8);
        }
        else if (this.inRange(amountStep2, 20, 22)) {
            this.player_board.board[13] = amountStep2 - 19;
            this.colorChangedCell(13);
        }
        previousButton.disabled = true;
        nextButton.disabled = false;
    }

    step3(amountStep3, nextButton, previousButton) {
        this.clearColor();
        if (amountStep3 === 17) {
            previousButton.disabled = true;
            nextButton.disabled = false;
        }
    }

    step4(amountStep4, nextButton, previousButton) {
        let numbers = [2, 7, 16, 21, 22, 27, 34];
        if (numbers.includes(amountStep4)) {
            previousButton.disabled = false;
            nextButton.disabled = true;
        }
    }

    step5(amountStep5, nextButton, previousButton) {
        if (amountStep5 % 2 === 0) {
            if (amountStep5 === 0) {
                this.player_board.board[0] = 0;
                this.colorChangedCell(0);
            }
            else if (this.inRange(amountStep5, 2, 4)) {
                this.player_board.board[1] = 0;
                this.colorChangedCell(1);
            }
            else if (this.inRange(amountStep5, 6, 16)) {
                this.player_board.board[2] = 0;
                this.colorChangedCell(2);
            }
            else if (this.inRange(amountStep5, 18, 20)) {
                this.player_board.board[4] = 0;
                this.colorChangedCell(4);
            }
            else if (this.inRange(amountStep5, 22, 26)) {
                this.player_board.board[8] = 0;
                this.colorChangedCell(8);
            }
            else if (this.inRange(amountStep5, 28, 30)) {
                this.player_board.board[13] = 0;
                this.colorChangedCell(13);
            }
        }
    }

    step6(amountStep6, nextButton, previousButton) {
        this.clearColor();
        if (amountStep6 === 6 || amountStep6 === 17) {
            previousButton.disabled = true;
            nextButton.disabled = false;
        } else if (this.inRange(amountStep6, 0, 16)) {
            previousButton.disabled = false;
            nextButton.disabled = true;
        }
    }

    step7(amountStep7, nextButton, previousButton) {
        if (amountStep7 === 0) {
            this.player_board.board[1] = 4;
            this.colorChangedCell(1);
            previousButton.disabled = false;
            nextButton.disabled = true;
        }
    }
}