// Abstract class for explanations

export default class AExplained {
    constructor(player_board, text) {
        if (this.constructor === AExplained) {
            throw new Error("You can't make een object of an abstract class.");
        }
        this.player_board = player_board;
        this.text = text;
    }

    // helper method to check whether number is in range
    inRange(number, min, max) {
        return number >= min && number <= max;
    }

    // give the changed cell a background color
    colorChangedCell(cellNumber) {
        document.getElementById("board_" + cellNumber).style.backgroundColor = "green";
    }

    // clear the background color
    clearColor() {
        for (let i = 0; i < 16; i++) {
            if (document.getElementById("board_" + i).style.backgroundColor === "green") {
                document.getElementById("board_" + i).style.backgroundColor = "lightgrey";
            }
        }
    }

    // abstract empty methods
    step1(amountStep1, nextButton, previousButton) {
    }

    step2(amountStep2, nextButton, previousButton) {
    }

    step3(amountStep3, nextButton, previousButton) {
    }

    step4(amountStep4, nextButton, previousButton) {
    }

    step5(amountStep5, nextButton, previousButton) {
    }

    step6(amountStep6, nextButton, previousButton) {
    }

    step7(amountStep7, nextButton, previousButton) {
    }
}