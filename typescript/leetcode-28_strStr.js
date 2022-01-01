function strStr(haystack: string, needle: string): number {
    // Default to 0 if needle is empty
    if(needle.length === 0) {
        return 0;
    }

    /* -needle.length in case e.g. if we find the first char of a 10-char long needle with only 5 chars left in haystack */
    for(let i=0; i<=haystack.length-needle.length; i++) {
        // If we hit the first char in needle, start looking for the rest of needle
        if(haystack[i] === needle[0]) {
            //console.log(haystack.slice(i,i+needle.length));
            if(haystack.slice(i,i+needle.length) === needle) {
                return i;
            }
        }
    }

    // haystack does not contain needle
    return -1;
}


/*
Naive:
Loop over string
"Pause" when we hit a char that matches the first char of substring needle (save i here to startOfNeedle)
Continue loop:
    If next haystack[i] matches each char of needle, keep going
    If we get to end of needle, return startOfNeedle
    If we hit a char that doesn't match needle, this can't be it. Keep going with normal loop, proceeding from startOfNeedle
First obvious cleanup: instead of a subloop, just slice() the part of haystack we want. That makes it more readable, but does mean we have a whole nother array, so less space efficient.

Optimizations:
We probably don't need to go all the way back to startOfNeedle and could just proceed from the next instance of needle[0] (if we found another one in the subloop)
Do it without creating an extra array with slice (use a subloop or something)

*/
