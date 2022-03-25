import Renderer from "../Renderer.js";
import SudokuBoard from "../SudokuBoard.js";
import BruteforceExplained from "./BruteforceExplained.js";
import BacktrackingExplained from "./BacktrackingExplained.js";
import CspExplained from "./CspExplained.js";
import CspWithBacktrackingExplained from "./CspWithBacktrackingExplained.js";


// map with json files of steps
let textMap = new Map();
textMap.set("Backtracking algorithm", "./Data/stepsBacktracking.json");
textMap.set("Bruteforce algorithm", "./Data/stepsBruteforce.json");
textMap.set("CSP algorithm", "./Data/stepsCSP.json");
textMap.set("CSP with backtracking algorithm", "./Data/stepsCSPWithBacktracking.json");
//variables
let currentAlgorithm = document.getElementsByTagName("title")[0].textContent;
let stepAmount = 0;
let steps = document.getElementById("steps");
let text = document.getElementById("text");
let step = document.getElementById("nrStep");
let sudoku = document.getElementById("sudoku");
let texts = [];
let previous = false;
let clicked = false;
let renderer = new Renderer(document);
//sudoku board
let player_board = new SudokuBoard([0, 0, 3, 0, 0, 1, 2, 4, 4, 2, 1, 3, 1, 3, 4, 2], [2, 4, 3, 1, 3, 1, 2, 4, 4, 2, 1, 3, 1, 3, 4, 2], 2, "board", true, renderer);
renderer.renderGameBoard(player_board.width, player_board.height, "board", player_board);
renderer.renderFillBoard(player_board.startboard, player_board);

//set start page
document.getElementsByTagName("h3")[0].textContent = currentAlgorithm;

let showStepsButton = document.createElement("button");
showStepsButton.textContent = "Show steps";
showStepsButton.setAttribute("id", "steps_button");
showStepsButton.setAttribute("class", "btn btn-secondary btn-lg");
showStepsButton.style.marginTop = "40px";
showStepsButton.style.marginLeft = "60px";
showStepsButton.addEventListener('click', showSteps);
sudoku.appendChild(showStepsButton);
console.log(currentAlgorithm);
document.getElementById("all-steps-button").addEventListener("click", showAllSteps);
loadTexts();

//functions
function loadTexts() {
    fetch(textMap.get(currentAlgorithm)).then(data => data.json()).then(data => {
        texts = data.texts;
    }).catch(() => "failed loading json file");
}

//function shows step by step
function showSteps() {
    console.log("show step");
    if (stepAmount === 1) {
        clicked = true;
        //if used previous button this makes the buttons go to the right place
        if (previous) {
            sudoku.removeChild(document.getElementById("next"));
            addPreviousButton();
            addNextButton();
        }
        //if it's the first time stepAmount is 1, this makes the next and previous button
        else if (!previous) {
            sudoku.removeChild(showStepsButton);
            addPreviousButton();
            addNextButton();
        }
    }

    if (stepAmount < texts.length) {
        let currentText = texts[stepAmount]
        stepAmount++;
        showStepsButton.innerText = "Next step";
        step.innerText = "Step " + currentText.step;
        text.innerText = currentText.text;
        showOnSudoku(step.innerText);
        if (stepAmount !== 1) {
            document.getElementById("next").removeEventListener("click", showAllSteps);
            document.getElementById("next").addEventListener("click", showSteps);
        }
    }

    if (stepAmount === texts.length) {
        let showAllButton = document.getElementById("next");
        showAllButton.innerText = "Show all steps";
        showAllButton.addEventListener('click', showAllSteps);
    }
    console.log(stepAmount);
}

function showPreviousStep() {
    previous = true;
    document.getElementById("next").innerText = "Next step";
    stepAmount--;
    let currentText = texts[stepAmount - 1];
    step.innerText = "Step " + currentText.step;
    text.innerText = currentText.text;
    showOnSudoku(step.innerText);
    console.log(stepAmount);
}

function showAllSteps() {
    console.log("show al steps");
    for (let t of texts) {
        //console.log("test"); testing
        let step = document.createElement("h5");
        step.innerText = "Step " + t.step;
        let text = document.createElement("p");
        text.innerText = t.text;
        steps.appendChild(step);
        steps.appendChild(text);

        //show solution on sudoku
        for (let i = 0; i < 16; i++) {
            if (player_board.board[i] !== player_board.solution[i]) {
                explainedAl.colorChangedCell(i);
            }
        }
        player_board.board = player_board.solution;
        renderer.renderFillBoard(player_board.board, player_board);
    }
    //show activity diagram to help understand
    let srcName;
    let currentAlg = currentAlgorithm.split(" ")[0].toLocaleLowerCase();
    if (currentAlgorithm === "CSP with backtracking algorithm") {
        srcName = "./images/Activity_CSPWithBT.png";
    } else {
        srcName = "./images/Activity_" + currentAlg + ".png";
    }
    let diagram = document.createElement("img");
    diagram.setAttribute("src", srcName);
    steps.appendChild(diagram);
    console.log(currentAlg);
    //remove buttons and previous text en step space
    steps.removeChild(step);
    steps.removeChild(text);
    document.getElementById("page").removeChild(document.getElementById("all-steps-button"));
    if (clicked) {
        sudoku.removeChild(document.getElementById("next"));
        sudoku.removeChild(document.getElementById("previous"));
    } else {
        sudoku.removeChild(document.getElementById("steps_button"));
    }
}

// counters and variables for showing the steps on the board
let amountStep1 = 0;
let amountStep2 = 0;
let amountStep3 = 0;
let amountStep4 = 0;
let amountStep5 = 0;
let amountStep6 = 0;
let amountStep7 = 0;
let explainedAl;

// function to show steps on the board
putExplanation();

function showOnSudoku(step) {
    let nextButton = document.getElementById("next");
    let previousButton = document.getElementById("previous");

    if (step === "Step 1") {
        explainedAl.step1(amountStep4, nextButton, previousButton);
        amountStep1++;
    }
    if (step === "Step 2") {
        explainedAl.step2(amountStep2, nextButton, previousButton);
        amountStep2++;
    }
    if (step === "Step 3") {
        explainedAl.step3(amountStep3, nextButton, previousButton);
        amountStep3++;
    }
    if (step === "Step 4") {
        explainedAl.step4(amountStep4, nextButton, previousButton);
        amountStep4++;
    }
    if (step === "Step 5") {
        explainedAl.step5(amountStep5, nextButton, previousButton);
        amountStep5++;
    }
    if (step === "Step 6") {
        explainedAl.step6(amountStep6, nextButton, previousButton);
        amountStep6++;
    } else if (step === "Step 7") {
        explainedAl.step7(amountStep7, nextButton, previousButton);
        amountStep7++;
    }
    renderer.renderFillBoard(player_board.board, player_board);
}

// helper function to choose the right class to solve the sudoku step by step
function putExplanation() {
    switch (currentAlgorithm) {
        case "Bruteforce algorithm":
            explainedAl = new BruteforceExplained(player_board, text);
            break;
        case "Backtracking algorithm":
            explainedAl = new BacktrackingExplained(player_board, text);
            break;
        case "CSP algorithm":
            explainedAl = new CspExplained(player_board, text);
            break;
        case "CSP with backtracking algorithm":
            explainedAl = new CspWithBacktrackingExplained(player_board, text);
    }
}

// helper functions to add next and previous button
function addPreviousButton() {
    let previousButton = document.createElement("button");
    previousButton.setAttribute("id", "previous");
    previousButton.setAttribute("class", "btn btn-secondary btn-lg");
    previousButton.textContent = "Previous step";
    previousButton.style.marginTop = "40px";
    previousButton.style.marginLeft = "60px";
    previousButton.addEventListener("click", showPreviousStep);
    sudoku.appendChild(previousButton);
}

function addNextButton() {
    let nextButton = document.createElement("button");
    nextButton.setAttribute("id", "next");
    nextButton.setAttribute("class", "btn btn-secondary btn-lg");
    nextButton.textContent = "Next step";
    nextButton.style.marginTop = "40px";
    nextButton.style.marginLeft = "5px";
    nextButton.addEventListener('click', showSteps);
    sudoku.appendChild(nextButton);
}