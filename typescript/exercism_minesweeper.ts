class Minefield {
    field: string[][]

    constructor(stringyField: string[]) {
        this.field = stringyField.map(stringRow => stringRow.split(''))
    }
    incrementCell(i: number,j: number) {
        // check if out of bounds. Could do cellChar === undefined alternately
        if(i<0 || i>=this.field.length || j<0 || j>=this.field[0].length) {
            return;
        }

        let cellChar = this.field[i][j];

        if(cellChar === '*') {
            this.field[i][j] = '*'
        }
        else if(cellChar === ' ') {
            this.field[i][j] = '1'
        }
        else {
            let cellVal = parseInt(cellChar,10);
            if(cellVal<1 || cellVal >8) {
                throw new Error(`Cell value invalid: ${cellVal}`);
            }
            this.field[i][j] = (cellVal+1).toString()
        }
    }
    incrementAdjacentCells(i:number, j:number) {
        // Increment the 8 cells ortho/diagonally adjacent to i,j
        // Out-of-bounds checking in incrementCells()
        this.incrementCell(i-1,j-1);
        this.incrementCell(i-1,j);
        this.incrementCell(i-1,j+1);
        this.incrementCell(i,j-1);
        this.incrementCell(i,j);
        this.incrementCell(i,j+1);
        this.incrementCell(i+1,j-1);
        this.incrementCell(i+1,j);
        this.incrementCell(i+1,j+1);
    }
    fieldToStringArray() {
        return this.field.map(row => row.join(''))
    }
    prettyPrint() {
        let prettyField = this.fieldToStringArray().reduce(
            (prev,curr) => prev+'\n'+curr, ''
        ).replaceAll(' ','·');
        
        console.log('\n'+prettyField);

    }
}

function annotate(stringyField: string[]): any {
    let minefield = new Minefield(stringyField);

    for(let i=0; i<minefield.field.length; i++ ) {
        for(let j=0; j<minefield.field[i].length; j++) {
            if(minefield.field[i][j] === '*') {
                minefield.incrementAdjacentCells(i,j)
            }
        }
    }

    minefield.prettyPrint()
    return minefield.fieldToStringArray();
}

// Testing
console.clear();

//const field = [' *  * ', '  *   ', '    * ', '   * *', ' *  * ', '      ']
const input: string[] = []
let minefield = new Minefield(input);
//console.log(minefield.field);
//console.log(minefield.fieldToStringArray());
minefield.prettyPrint();
annotate(input);


/*
Plan:
    * Loop over all elements
    * If it's a mine, increment the values of adjacent cells
*/
