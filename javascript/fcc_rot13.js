/*
ROT13.

Allowed assumptions: input all uppercase. Do not transform any non-alphabetic chars.
ASCII values:
65 : A
90 : Z

So, subtract 65.
0 : A
25: Z

Add 13, mod 26.

Test cases:
S->F
E->R
R->E

*/


function rot13(str) {
  return str.split('').map(char => rotChar(char,13)).join('');
}

function rotChar(char, amount) {
  // Rotates char by amount: rotChar('F',13) is F ROT13. Skip non-alphabetic, non-uppercase
  const letterCode = char.charCodeAt(0)-65;
  if(letterCode<0 || letterCode>25) {
    return char;
  } else {
      return String.fromCharCode(  ((letterCode+13)%26) +65  )
  }
}

console.clear();
const out = rot13("SERR PBQR PNZC");
console.log(out);
