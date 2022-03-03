/*
TODO: implement columns


*/


/*
Matrix('1 2\n10 20') -> Matrix.rows[1] is [1 2 20] (1-indexed)

Add in one-indexing later.

Matrix('1 2 3\n4 5 6\n7 8 9\n8 7 6') -> (before 1-indexing)
rows -> [[1,2,3],[4,5,6],[7,8,9]]


*/

class Matrix {
    //#str: string;
    //#mat: number[] = [];
    #mat: string[][] = [];

    constructor(str: string) {
        //this.#str = str;

        // First split into rows, then split rows on spaces.
        this.#mat = str.split('\n').map(elem => elem.split(' '))

        console.log(this.#mat);

        //const r = str.split('\n').map(elem => elem.split(' '))
        //console.log(r);

        // for(let y=0; y<r.length; y++) {
        //     for(let x=0; x<r[y].length; x++) {
        //         console.log(`r[${y}][${x}]: ${r[y][x]}`)
        //     }
        // }

        
    }

    get rows(): string[][] {
        const out: string[][] = [];
        out.push([]); // kludge to make it 1-indexed

        for(let y=0; y<this.#mat.length; y++) {
            out.push(this.#mat[y])
        }
        
        return out;
    }

    get columns(): string[][] {
        const out: string[][] = [];
        out.push([]); // kludge to make it 1-indexed


        return out;    }
}

console.clear()
let m = new Matrix('1 2\n3 4\n5 6')
console.log(m.rows)
