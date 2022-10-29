function checkIfExist(arr: number[]): boolean {
    let dic: { [key: number]: number  } = {};

    for(let i=0; i<arr.length; i++) {
        // if double or half of current arr[i] exists in array, we've found it
        if(dic.hasOwnProperty(arr[i]*2) || dic.hasOwnProperty(arr[i]/2)) {
            return true;
        } 
        else {
            dic[arr[i]] = i;
        }
    }

    return false;
};

/*
Kinda like 2sum, store things along the way.
Places to improve: not happy about the arr[i]/2 part, feels like there should be a more elegant approach.

*/
