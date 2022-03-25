import AExplained from "./AExplained.js";

export default class BruteforceExplained extends AExplained {

    constructor(player_board, text) {
        super(player_board, text);
        this.endText = "\n\nThe algorithm keeps repeating these steps over and over until the sudoku is solved. " +
            "In this example we will not show all the steps because they ave to be repeated quite a lot. By clicking on the 'Show all steps' " +
            "button you will see all the steps, the solved sudoku and the activity diagram of the code to help you understand.";
    }

    // hard coded methods to show the right values on the sudoku

    step1(amountStep1, nextButton, previousButton) {
        for (let i = 0; i < this.player_board.startboard.length; i++) {
            if (this.player_board.startboard[i] === 0) {
                this.player_board.computerMove(i, 1);
                this.colorChangedCell(i);
            }
        }
    }

    step2(amountStep2, nextButton, previousButton) {
        nextButton.disabled = false;
        previousButton.disabled = true;
        this.clearColor();
    }

    step3(amountStep3, nextButton, previousButton) {
        this.clearColor();
    }

    step4(amountStep4, nextButton, previousButton) {
        console.log("step4 " + amountStep4);
        if (this.inRange(amountStep4, 0, 2) || this.inRange(amountStep4, 5, 7) || this.inRange(amountStep4, 10, 12)
            || this.inRange(amountStep4, 15, 17) || this.inRange(amountStep4, 20, 22)) {

            nextButton.disabled = true;
            previousButton.disabled = false;
            this.colorChangedCell(0);

            if (this.inRange(amountStep4, 0, 2)) {
                this.player_board.board[0] = amountStep4 + 2;
            } else if (this.inRange(amountStep4, 5, 7)) {
                this.player_board.board[0] = amountStep4 - 3;
            } else if (this.inRange(amountStep4, 10, 12)) {
                this.player_board.board[0] = amountStep4 - 8;
            } else if (this.inRange(amountStep4, 15, 17)) {
                this.player_board.board[0] = amountStep4 - 13;
            } else if (this.inRange(amountStep4, 20, 22)) {
                this.player_board.board[0] = amountStep4 - 18;
            }
        }
    }

    step5(amountStep5, nextButton, previousButton) {
        if (amountStep5 % 2 !== 0) {
            previousButton.disabled = false;
            this.clearColor();
        } else {
            if (amountStep5 === 6) {
                this.player_board.board[0] = 1;
                this.player_board.board[1] = 1;
                this.colorChangedCell(0);
                this.colorChangedCell(1);
            } else if (amountStep5 % 2 === 0) {
                this.player_board.board[0] = 1;
                this.colorChangedCell(0);
            }
            previousButton.disabled = true;
        }
    }

    step6(amountStep6, showAllButton, previousButton) {
        this.clearColor();
        if (amountStep6 === 3) {
            this.player_board.board[3] = 2;
            this.colorChangedCell(3);
        } else if (this.inRange(amountStep6, 0, 4)) {
            this.player_board.board[1] += 1;
            this.colorChangedCell(1);
            if (amountStep6 === 4) {
                this.text.innerText = this.text.innerText + this.endText;
            }
        }
        if (amountStep6 !== 4) {
            showAllButton.disabled = true;
            previousButton.disabled = false;
        } else {
            showAllButton.disabled = false;
            previousButton.disabled = true;
        }
    }
}
