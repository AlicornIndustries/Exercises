/*
Matrices have no "holes". They can be non-square, but always mxn with
no "empty"/undefined spaces
*/

class Matrix {

    #mat: number[][] = [];

    constructor(str: string) {

        // First split into rows, then split rows on spaces, then convert strings to numbers
        /* TODO: optimize. We can save loops by just going over the string once, checking
        as we go for a ' ' or a '\n' (instead of doing them separately).
        That may require some assumptions e.g. square matrix
        */
        this.#mat = str.split('\n').map(elem => elem.split(' ')).map(row => row.map(Number))
    }

    get rows(): number[][] {
        return this.#mat
    }

    get columns(): number[][] {
        const out: number[][] = [];

        for(let x=0; x<this.#mat[0].length; x++) {
            // Equivalent:
            // out.push(
            //     this.#mat.map(function(value,index) {
            //         return value[x]
            //     })
            // )
            out.push(this.#mat.map(row => row[x]))
        }
        return out;
    }
}

console.clear()
let m = new Matrix('1 2 3\n4 5 6')
//console.log(m.rows)
console.log(m.columns)
