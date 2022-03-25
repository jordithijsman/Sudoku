import Memento from "./Memento.js";
export default class Caretaker{
    constructor(){
        this.stack = [];
    }

    //Deze functie geeft de vorige state/memento terug en verwijdert de huidige state uit de stack
    getPreviousState(){
        stack.pop();
        let mem = this.stack[this.stack.length - 1];
        return mem;
    }

    //Deze functie geeft een nieuwe state/memento terug die wordt aangemaakt en in de stack geplaatst
    getNewState(){
        let mem = new Memento();
        this.stack.push(mem);
        return mem;
    }
}



