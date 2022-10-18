// 1356. Sort Integers by The Number of 1 Bits
// Unoptimized for example.


/**
 * Returns number of 1s in binary representation of positive integer
 * Unoptimized, quick-n'-dirty example to showcase filter.
 * This could be optimized by just >> shifting num by 1 and checking if each bit is a 1
 */
function countOnes(num: number): number {
    return num.toString(2).split('').filter( (elem) => elem === '1' ).length
}

/**
 * Compare two positive integers by their Hamming weight. If weights equal, compare by decimal value.
 */
function compareOnes(a: number, b: number): number {
    const aOnes = countOnes(a);
    const bOnes = countOnes(b);

    if(aOnes>bOnes) {
        return 1;
    }
    else if(aOnes<bOnes) {
        return -1;
    } else {
        // May as well throw in a chained ternary operator for seasoning for the example.
        return a>b ? 1
            :  b>a ? -1
            : 0
    }
}

function sortByBits(arr: number[]): number[] {
    return arr.sort(compareOnes)
}

console.clear()
const num = 5;
const arr =  [1024,512,256,128,64,32,16,8,4,2,1]
console.log(sortByBits(arr))

/*
Sort integers in ascending order by number of 1s in binary representation.
    If two ints have same number of 1s, sort in ascending order (by integer value)
Return sort in place.

So, getting the numbers of 1s.
    Could to toString(2), then count number of ones. Seems inefficient.
    Some bitwise op?


Notes:
    countOnes does not validate if num is positive integer.
    countOnes is basically binary Hamming weight.

*/
