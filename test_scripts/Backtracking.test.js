//First you have to dowload and install Node: https://nodejs.org/en/#download
//in embedded terminal type: npm install --save-dev jest
//Tests uitvoeren door in CLI: node --experimental-vm-modules node_modules/.bin/jest
//more info:    https://www.jetbrains.com/help/idea/running-unit-tests-on-jest.html#ws_jest_running_tests
//              https://jestjs.io/docs/ecmascript-modules
/*
    Om deze test uit te voeren moet je nog volgende lijnen in commentaar plaatsen in SudokuBoard:
        const { Observable, Subject } = rxjs;
        const { map } = rxjs.operators;
        this.updater = new Subject;

 */
import Backtracking from "../scripts/Algoritmen/Backtracking";
import SudokuBoard from "../scripts/SudokuBoard";

    let startboard_9 =  [0,0,0,2,6,0,7,0,1,6,8,0,0,7,0,0,9,0,1,9,0,0,0,4,5,0,0,8,2,0,1,0,0,0,4,0,0,0,4,6,0,2,9,0,0,0,5,0,0,0,3,0,2,8,0,0,9,3,0,0,0,7,4,0,4,0,0,5,0,0,3,6,7,0,3,0,1,8,0,0,0];
    let s_startboard_9 = new SudokuBoard(startboard_9, [], 3, 1, false, null);
    s_startboard_9.board = startboard_9;
    s_startboard_9.width = 3;

    let solvedboard_9 = [4,3,5,2,6,9,7,8,1,6,8,2,5,7,1,4,9,3,1,9,7,8,3,4,5,6,2,8,2,6,1,9,5,3,4,7,3,7,4,6,8,2,9,1,5,9,5,1,7,4,3,6,2,8,5,1,9,3,2,6,8,7,4,2,4,8,9,5,7,1,3,6,7,6,3,4,1,8,2,5,9];




    //let sud = [3, 0, 0, 0, 0, 8, 0, 0, 0, 7, 0, 8, 3, 2, 0, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 1, 0, 9, 0, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 0, 8, 0, 0, 0, 0, 9, 0, 5, 0, 0, 0, 3, 0, 0, 0, 8, 0, 0, 0, 4, 7, 5, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 6];
    //let s = new SudokuBoard();
    //s.board = sud;
    const back = new Backtracking(false);
    back.s_board = s_startboard_9;

    const indexToXfirst = back.indexToX(3);
    test("indexTox", ()=>{
        expect(indexToXfirst).toBe(4);
    });

    const indexToYFirst = back.indexToY(3);
    test("indexToY", () => {
        expect(indexToYFirst).toBe(1);
    });

    const indexToXBlok = back.indexToXBlok(45);
    test("indexToXBlok", () => {
        expect(indexToXBlok).toBe(1);
    });

    const indexToYBlok = back.indexToYBlok(53);
    test("indexToYBlok", () => {
        expect(indexToYBlok).toBe(2);
    });

    const gebruiktInRij = back.GebruiktInRij(22, 4);
    test("gebruiktInRij", () => {
        expect(gebruiktInRij).toBe(true);
    });

    const gebruiktInKolom = back.GebruiktInKolom(43, 4);
    test("gebruikInKolom", () => {
        expect(gebruiktInKolom).toBe(true);
    });

    const gebruiktInBlok = back.GebruiktInBlok(67, 8);
    test("gebruiktInBlok", () => {
        expect(gebruiktInBlok).toBe(true);
    });

    //Deze test test de validiteit van alle vorige testen
    const isJuisteZet = back.isJuisteZet(79, 4);
    test("isJuisteZet", () => {
        expect(isJuisteZet).toBe(false);
    });

    const solve = back.solve(s_startboard_9);
    test("assigned", () => {
        expect(solve).toStrictEqual(solvedboard_9);
    })