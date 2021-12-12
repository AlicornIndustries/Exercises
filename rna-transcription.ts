export function toRna(dna: string) {
  // Naive: convert string to character array, loop, transcribe each character in place, convert back to string
  let rnaArray: string[] = [...dna];
  for (let i=0; i<rnaArray.length; i++) {
    switch(rnaArray[i]) {
      case 'C': {
        rnaArray[i] = 'G';
        break;
      }
      case 'G': {
        rnaArray[i] = 'C';
        break;
      }
      case 'T': {
        rnaArray[i] = 'A';
        break;
      }
      case 'A': {
        rnaArray[i] = 'U';
        break;
      }
      default: {
        throw new Error('Invalid input DNA.')
      }
    }
  }
  return rnaArray.join('');


  
}

/*
Input: string, may have invalid characters
Errors to throw:
  'Invalid input DNA'

Naive: loop over string. Strings are immutable. Convert to character array first?
Optimizations: can we do something with the ASCII numerical representation to speed up validation?


*/
