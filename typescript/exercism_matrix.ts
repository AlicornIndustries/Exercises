/*
TODO: Implement columns
*/

class Matrix {

    #mat: number[][] = [];

    constructor(str: string) {

        // First split into rows, then split rows on spaces, then convert strings to numbers
        this.#mat = str.split('\n').map(elem => elem.split(' ')).map(row => row.map(Number))

        console.log(this.#mat);

        //const r = str.split('\n').map(elem => elem.split(' '))
        //console.log(r);

        // for(let y=0; y<r.length; y++) {
        //     for(let x=0; x<r[y].length; x++) {
        //         console.log(`r[${y}][${x}]: ${r[y][x]}`)
        //     }
        // }

        
    }

    get rows(): number[][] {
        const out: number[][] = [];

        for(let y=0; y<this.#mat.length; y++) {
            out.push(this.#mat[y])
        }
        
        return out;
    }

    get columns(): number[][] {
        const out: number[][] = [];


        return out;
    }
}

console.clear()
let m = new Matrix('1 2\n3 4')
console.log(m.rows[1])
