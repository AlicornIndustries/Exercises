/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

let reverseString = function(s) {
  for(let i=0; i<=(s.length/2)-1; i++) {
    // console.log(`i=${i} : ${s[i]} ${s[s.length-i-1]}`);
    [s[i], s[s.length-i-1]] = [s[s.length-i-1], s[i]];
  }
}

/*
Fancy ES6 way with array destructuring (less efficient than temp var)
*/
