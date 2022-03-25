export default class Memento{
    constructor(){
        this.board = [];
    }



    saveBoard(board){
        this.board = board;
    }

    loadBoard(){
        return this.board;
    }
}


