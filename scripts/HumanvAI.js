//imports
import SudokuBoard from "./SudokuBoard.js"
import Renderer from "./Renderer.js"
import Timer from "./Timer.js"
import Backtracking from "./Algoritmen/Backtracking.js";
import Bruteforce from "./Algoritmen/Bruteforce.js";
import CSP from "./Algoritmen/CSP.js";
import CSPWithBacktracking from "./Algoritmen/CSPWithBacktracking.js";
import {HighscoresController} from "./HighscoresController.js";

//variables
let data; //holds information on available boards
let renderer = new Renderer(document); //renderer object
let algo;   //holds the algorithm object
let algoName;
let cspGotStuck;
let playerTimer = new Timer(); //playerTimer object
let computerTimer = new Timer();//computerTimer object
let updateTimerIntervalComputer; //handles updating the visual values !!!(should probably be in renderer)!!!
let updateTimerIntervalPlayer;


let difAlgos = {
    "brute force": new Bruteforce(),
    "backtracking": new Backtracking(),
    "CSP": new CSP(),
    "CSP with backtracking": new CSPWithBacktracking()
};

//game board objects, lazy init
let playerBoard;
export let computerBoard;

init();

//init functions
function init() {
    document.getElementsByTagName("option")[0].selected = true;
    document.getElementById("gameField").style.visibility = "hidden";
    //fetch boards
    fetch("./Data/boards.JSON").then(data => data.json()).then(result => {
        data = result;
    });
    initPickDifficulty(); //init first dropdown menu
    initButtons(); //init start, stop, reset buttons
}

function initPickDifficulty() {
    let selDif = document.getElementById("selDifficulty");
    let options = ["easy", "normal", "hard"];
    options.forEach(option => {
        let optionElement = document.createElement("option");
        optionElement.innerText = option;
        selDif.appendChild(optionElement);
    });
    selDif.addEventListener("click", initPickAlgorithm); //e-listener for next dropdown
    selDif.addEventListener("change", initBoard);

}

function initBoard() {
    generateSudoku();
    document.getElementById("regenerateButton").disabled = false;
    //subscribe to updated values
    computerBoard.updater.subscribe((v1) => {
        if (computerBoard.cheat) {
            renderer.renderFillSquare(v1[0], v1[1], computerBoard);
        } else renderer.renderFillSquareColor(v1[0], v1[1], computerBoard);
    });

    let regenerateButton = document.getElementById("regenerateButton");
    regenerateButton.addEventListener("click", generateSudoku);

    //enable visibility for the game_field
    document.getElementById("gameField").style.visibility = "visible";


}


function generateSudoku() {

    let selDif = document.getElementById("selDifficulty");
    let selDifValue = selDif.value.toString();

    if (selDifValue === "easy") {
        playerBoard = new SudokuBoard([], [], 2, "playerBoard",  renderer);
        playerBoard.generateBoard();
    } else if (selDifValue === "normal") {
        playerBoard = new SudokuBoard([], [], 3, "playerBoard",  renderer);
        playerBoard.generateBoard();
    }
    else {      //selDifValue === "hard"
        let boardName = "No. " + (Math.floor(Math.random()*5) + 1);
        playerBoard = new SudokuBoard(data["hard"].boards[boardName], data["hard"].solutions[boardName], 4, "playerBoard", renderer);
    }


    renderer.renderGameBoard(playerBoard.width, playerBoard.width, "playerBoard", playerBoard);
    renderer.renderFillBoard(playerBoard.startboard, playerBoard);

    //create computerBoard, render it and fill out the given values
    computerBoard = new SudokuBoard(playerBoard.board, playerBoard.solution, playerBoard.width, "computerBoard",  renderer);
    renderer.renderGameBoard(computerBoard.width, computerBoard.width, "computerBoard", computerBoard);
    renderer.renderFillBoard(computerBoard.startboard, computerBoard);

    //subscribe to updated values
    computerBoard.updater.subscribe((v1) => {
        renderer.renderFillSquareColor(v1[0], v1[1], computerBoard);
    });

}




function initPickAlgorithm() {
    //First render a random board to the screen
    document.getElementById("playButton").disabled = true;

    //select and remove click e-listener
    let selDif = document.getElementById("selDifficulty");
    selDif.removeEventListener("click", initPickAlgorithm);

    let selAlgoDropdown = createDropdown("selAlgo", "Pick algorithm", difAlgos);
    document.getElementById("dropdowns").appendChild(selAlgoDropdown);

    //enable play button once game-parameters have been selected

    document.getElementById("selAlgo")
        .addEventListener("change", () => {
            document.getElementById("playButton").disabled = false
        });


    let checkboxes = ["CheatCheck", "TurboBox"];
    let descriptions = ["Enable cheat-mode! (visualizes the numbers the AI inputs, disables highscores and increases the speed of the algorithm)",
                        "Turbo mode, see how fast the algorithm really is (no delay)"];

    //create cheat-mode button
    let dropdown = document.getElementById("form");
    for (let i = 0; i<checkboxes.length; i++){
        let formCheck = document.createElement("div");
        formCheck.setAttribute("class", "form-check");
        let inputCheck = document.createElement("input");
        inputCheck.setAttribute("type", "checkbox");
        inputCheck.setAttribute("class", "form-check-input");
        inputCheck.setAttribute("id", checkboxes[i]);
        formCheck.appendChild(inputCheck);
        let labelCheck = document.createElement("label");
        labelCheck.setAttribute("class", "form-check-label");
        labelCheck.setAttribute("for", checkboxes[i]);
        labelCheck.innerText = descriptions[i];
        formCheck.appendChild(labelCheck);
        dropdown.appendChild(formCheck);
    }



}

function initButtons() {
    //e-listeners for buttons
    document.getElementById("playButton").addEventListener("click", play);
    document.getElementById("stopButton").addEventListener("click", stop);
    document.getElementById("resetButton").addEventListener("click", reset);
    document.getElementById("regenerateButton").addEventListener("click", generateSudoku);
}

//Handle button events
function reset(event) {
    event.preventDefault();
    location.reload();
}

function play() {
    console.log("play");
    if(algo != null){
        algo.stop();
    }
    playerTimer.startTimer();
    computerTimer.startTimer();
    updateTimerIntervalComputer = setInterval(() => {
        if(computerBoard.solved){
            clearInterval(updateTimerIntervalComputer);
        }
        updateTime(computerTimer, computerBoard);
    }, 1);
    updateTimerIntervalPlayer = setInterval(() => {
        updateTime(playerTimer, playerBoard);
    }, 1);
    algoName = document.getElementById("selAlgo").value.toString();
    algo = difAlgos[algoName];

    //check if cheatmode is enabled
    //set delay
    computerBoard.cheat = document.getElementById("CheatCheck").checked;
    let turbo = document.getElementById("TurboBox").checked;
    let delay;
    let dif = document.getElementById("selDifficulty").value.toString();
    if(algoName === "bruteforce"){
        delay = 0;
    }
    else{
        if(dif === "easy"){
            if (algoName === "backtracking"){delay = 1500;}
            else {delay = 150; }

        }
        else if(dif === "normal"){
            if(algoName ==="backtracking"){delay = 700;}
            else{delay = 300;}
        }
        else{   //dif === "hard"
            if(algoName === "backtracking"){delay = 0; }
            else{ delay = 30; }
        }
    }


    if(turbo){delay = 0;}
    else if(computerBoard.cheat){ delay = delay/2; }
    console.log("Delay: " + delay);

    algo.solve(computerBoard, delay).then(() => {
        let time = computerTimer.getCurrentTime();
        HighscoresController.postHighscores(algo.constructor.name, time, computerBoard.moves, computerBoard.width);
        computerTimer.clearTimer();
        clearInterval(updateTimerIntervalComputer);

        playerTimer.stopTimer();
        if(computerBoard.checkBoard()){
            //hardgecodeerde alert berichten voor interactie
            switch (algoName) {
                case "brute force":
                    alert("You lose!\nBruteforce is the slowest of them all... How did you lose? Do better next time!\nContinue or press reset to start over");
                    break;
                case "CSP":
                    if (computerBoard.isSolved()) {
                        alert("You lose!\nDon't be too hard on yourself, CSP is fast. But he can't solve every board, maybe next time you're more lucky\nContinue or press reset to start over");
                    } else {
                        alert("CSP got stuck... It's fast but can't solve everything\nTake your time, you will win this");
                        cspGotStuck = true;
                    }
                    break;
                case "CSP with backtracking":
                    alert("You loose!\nDon't be too hard on yourself, CSP with backtracking is the fastest algorithm here that can solve any board. Try again later\nContinue or press reset to start over");
                    break;
                case "backtracking":
                    alert("You lose!\nGo look in 'The AI way', maybe you can make your own algorithm to beat me ;)\nContinue or press reset to start over");
                    break;
            }
        }

        playerTimer.startTimer();
    });
    computerBoard.cheat = document.getElementById("CheatCheck").checked;

    //set properties of buttons during game
    document.getElementById("stopButton").disabled = false;
    document.getElementById("playButton").disabled = true;
    document.getElementById("resetButton").disabled = false;
    document.getElementById("regenerateButton").disabled = true;

    //disable game settings during gameplay
    let elements = document.getElementById("form").elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
    //enable editing of sudoku-grid
    toggleSquares(false);


}

function unPause(){
    console.log("unpause");
    playerTimer.startTimer();
    updateTimerIntervalPlayer = setInterval(() => {
        updateTime(playerTimer, playerBoard);
    }, 1);

    //set properties of buttons during game
    document.getElementById("stopButton").disabled = false;
    document.getElementById("playButton").disabled = true;
    document.getElementById("resetButton").disabled = false;
    document.getElementById("regenerateButton").disabled = true;

    //disable game settings during gameplay
    let elements = document.getElementById("form").elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
    //enable editing of sudoku-grid
    toggleSquares(false);
}

function stop() {
    //disable editing of Sudoku-grid
    toggleSquares(true);
    document.getElementById("stopButton").disabled = true;
    document.getElementById("resetButton").disabled = false;
    //check if player's solution is correct
    if (playerBoard.checkBoard()) {
        if (!computerBoard.cheat) {
            HighscoresController.postHighscores(document.getElementById("Name").value
                , playerTimer.getCurrentTime(), playerBoard.moves, playerBoard.width);
        }
        //stop playerTimer for player
        playerTimer.stopTimer();
        computerTimer.stopTimer();
        clearInterval(updateTimerIntervalPlayer);
        clearInterval(updateTimerIntervalComputer);
        algo.stop();
        if(!computerBoard.checkBoard()){
            switch(algoName){
                case "brute force":
                    alert("Congratulations you won!\nAn easy win is still a win!\nMaybe try a harder one next time...");
                    break;
                case "backtracking":
                    alert("Congratulations you won!\nYou're pretty fast\nSee how you did in the highscores");
                    break;
                case "CSP":
                    if(cspGotStuck){
                        alert("Congratulations you won!\nOne of these times I won't get stuck, you know");
                    }
                    else{
                        alert("Congratulations you won!\nFor a challenge try my big brother: CSP with backtracking");
                    }
                    cspGotStuck = false;
                    break;
                case "CSP with backtracking":
                    alert("Congratulations you won!\nImpressive! this is the fastest algorithm here & can solve any board\nSee how it works in The AI way");
                    break;
            }
        }else{
            alert("Your solution is correct, be a little faster next time");
        }
    } else {
        alert("your solution is not correct! try again!");
        //allow player to press play to continue trying
        document.getElementById("playButton").disabled = false;
    }

    document.getElementById("playButton").removeEventListener("click",play);
    document.getElementById("playButton").addEventListener("click", unPause);
    computerTimer.startTimer();
    updateTimerIntervalComputer = setInterval(() => {
        if(computerBoard.solved){
            clearInterval(updateTimerIntervalComputer);
        }
        updateTime(computerTimer, computerBoard);
    }, 1);
}

//update functions
function updateTime(timer, board) {
    let time = timer.getCurrentTime();
    let min = Math.floor(time / 60000);
    let sec = Math.floor((time - min * 60000) / 1000);
    let msec = time - min * 60000 - sec * 1000;
    if(board === playerBoard){
        document.getElementById("time1ms").innerText = ("000" + msec.toString()).slice(-3);
        document.getElementById("time1s").innerText = ("00" + sec.toString()).slice(-2) + ":";
        document.getElementById("time1m").innerText = (min.toString() + ":");
    }else{
        document.getElementById("time2ms").innerText = ("000" + msec.toString()).slice(-3);
        document.getElementById("time2s").innerText = ("00" + sec.toString()).slice(-2) + ":";
        document.getElementById("time2m").innerText = (min.toString() + ":");
    }

}

//helper functions
function toggleSquares(bool) {
    document.activeElement.blur();
    let w = parseInt(playerBoard.width);
    let h = parseInt(playerBoard.width);
    for (let k = 0; k < w * w * h * h; k++) {
        let square = document.getElementById("playerBoard_" + k);
        if (playerBoard.startboard[k] === 0) {
            square.disabled = bool;
        }
    }
}

function createDropdown(id, text, items) {
    let select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("id", id);
    let option = document.createElement("option");
    option.disabled = true;
    option.selected = true;
    option.innerText = text;
    select.appendChild(option);
    let i = 0;
    for (let difBoard in items) {
        option = document.createElement("option");
        option.innerText = difBoard;
        select.appendChild(option);
    }
    return select;
}


//Use this code when working with hard coded boards

/*
function initPickBoard() {
    //select and remove click e-listener
    let sel_dif = document.getElementById("sel_difficulty");
    sel_dif.removeEventListener("change", initPickBoard);

    //create next dropdown menu
    let dropdowns = document.getElementById("dropdowns");
    let select = createDropdown("sel_board", "Pick board", data[sel_dif.value].boards);
    dropdowns.appendChild(select);
    document.getElementById("sel_board") //e-listener to build next dropdown
        .addEventListener("click", initPickAlgorithm);

    document.getElementById("sel_board") //e-listener to render and init boards
        .addEventListener("change", () => {

            let sel_dif_value = sel_dif.value.toString();
            let sel_board_value = document.getElementById("sel_board").value.toString();

            //create playerBoard, render it and fill out the given values
            playerBoard = new SudokuBoard(data[sel_dif_value]
                    .boards[sel_board_value], data[sel_dif_value].solutions[sel_board_value]
                , data[sel_dif_value].size, "playerBoard", false, renderer);
            renderer.renderGameBoard(playerBoard.width, playerBoard.width
                , "playerBoard", playerBoard);
            renderer.renderFillBoard(playerBoard.startboard, "playerBoard");

            //create computerBoard, render it and fill out the given values
            computerBoard = new SudokuBoard(data[sel_dif_value]
                    .boards[sel_board_value],  ""          //2de parameter was: data[sel_dif_value].solutions[sel_board_value]
                , data[sel_dif_value].size, "computerBoard", true, renderer);
            renderer.renderGameBoard(computerBoard.width, computerBoard.width
                , "computerBoard", computerBoard);
            renderer.renderFillBoard(computerBoard.startboard, "computerBoard");

            //subscribe to updated values
            computerBoard.updater.subscribe((v1) => {
                if(v1[0] !== 0){
                    renderer.renderFillSquareColor(v1[0], v1[1], computerBoard);
                }

            });

            //enable visibility for the game_field
            document.getElementById("game_field").style.visibility = "visible";
        });
}
*/