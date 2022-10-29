/*
1346. Check If N and Its Double Exist
*/

function checkIfExist(arr: number[]): boolean {

    let doublesAndHalves = new Set();

    for(let i=0; i<arr.length; i++) {
        // if double or half of current arr[i] exists in array, we've found it
        //console.log(`i: ${i}, arr[i]: ${arr[i]}`)
        //console.log(doublesAndHalves)
        if(doublesAndHalves.has(arr[i])) {
            return true;
        }
        else {
            doublesAndHalves.add(arr[i]*2);
            doublesAndHalves.add(arr[i]/2)
        }
    }
    return false;
};
