export default class Cell{

    constructor(value, index, row, col, box, domain, neighbors, isStartingCell) {
        this.value = value;
        this.index = index;
        this.row = row;
        this.col = col;
        this.box = box;
        this.domain = domain;
        this.neighbors = neighbors;
        this.isStartingCell = isStartingCell;
    }

    //adds a value to a domain only if that value could be valid in the cell & if the cell is not a starting cell
    addToDomain(value){
        if (this.isStartingCell === false && this.domain.indexOf(value) === -1) {
            let b = this.neighbors.every(n => {
                return n.value !== value;
            });
            if(b){
                this.domain.push(value);
                let i = this.domain.length - 2;
                while(this.domain[i] > value){
                    this.domain[i+1] = this.domain[i];
                    i--;
                }
                this.domain[i+1] = value;
                return true;
            }
        }
        return false;
    }

    //deletes a value from a domain
    deleteFromDomain(value){
        let index;
        index = this.domain.indexOf(value);
        if (index > -1){
            this.domain.splice(index, 1);
            return true;
        }
        return false;
    }
}