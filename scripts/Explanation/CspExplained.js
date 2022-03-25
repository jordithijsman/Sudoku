import AExplained from "./AExplained.js";

export default class CspExplained extends AExplained {

    constructor(player_board, text) {
        super(player_board, text);
        player_board.board = [0, 0, 0, 0, 0, 1, 2, 4, 0, 2, 1, 3, 1, 0, 4, 2];
    }

    // hard coded methods to show the right values on the sudoku

    step2(amountStep2, nextButton, previousButton) {
        let arrayExample;
        let extraText;
        if (amountStep2 === 0) {
            arrayExample = "\n[[2,0],[2,1],[2,3],[2,6],[2,7],...]"
            extraText = "\n\nWritten below is an example of the constraints array from the first cell in this sudoku with one " +
                "number in its domain, the rest of the array is indicated by ...\n";
        }
        this.text.innerText = this.text.innerText + extraText + arrayExample;
        previousButton.disabled = true;
    }

    step3(amountStep3, nextButton, previousButton) {
        console.log("step 3: " + amountStep3);
        let arrayExample = "";
        if (amountStep3 === 0) {
            arrayExample = "\n\nFirst array of 2 elements: [2,0]\nDomain of cell 0: 2,3,4 -> 2,4\n\nNext array of 2 elements: [2,1]\nDomain of cell 1:3,4 -> 4";
        } else if (amountStep3 === 1) {
            this.clearColor(1);
            arrayExample = "\n\nPart of the current constraints array:\n[[2,3],[2,6],[2,7],...,[1,0],[1,2],[1,3],[1,4]]\n\nFirst array of 2 element: [2,3]\nDomain of cell 3: 1";
        } else if (amountStep3 === 2) {
            this.clearColor(3);
            arrayExample = "\n\nPart of the current constraints array:\n[[2,6],[2,7],...,[1,0],[1,2],[1,3],[1,4],[3,0],[3,1],[3,2],[3,6],[3,7]]\n\nFirst array of 2 element: [2,6]\nDomain of cell 6: 2";
        }
        this.text.innerText = this.text.innerText + arrayExample;
        previousButton.disabled = true;
        nextButton.disabled = false;
    }

    step4(amountStep4, nextButton, previousButton) {
        console.log("step 4: " + amountStep4);
        if (amountStep4 === 2) {
            let extraText = "\n\nThe algorithm keeps repeating these steps until the constraints array is empty and the goes to step 5, but this isn't shown on the sudoku anymore. You can still see the step by clicking the buttons.";
            this.colorChangedCell(6);
            this.text.innerText = this.text.innerText + extraText;
            nextButton.disabled = false
        } else {
            if (amountStep4 === 0) {
                this.player_board.board[1] = 4;
                this.colorChangedCell(1);
            } else if (amountStep4 === 1) {
                this.player_board.board[3] = 1;
                this.colorChangedCell(3);
            }
            nextButton.disabled = true;
            previousButton.disabled = false;
        }
    }

    step5(amountStep5, nextButton, previousButton) {
        this.clearColor(6);
    }
}