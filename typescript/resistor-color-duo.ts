/* Index signature: could also create a separate object, like
    interface NumberByString {
        [key: string]: number
    }
    Here, we just do it inline.
*/

const colors: {[key: string]: number} = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
}


export function decodedValue(values: string[] ) {
  // Naive: just loop over values, write to an array, convert to a string
  // Fool that I am, I wrote this before I realized that these are limited to two digits
  // I'll leave code as is for the "general" case and add in maxValuesLength
  // This could obviously be improved if we wanted to make this more specific/noncustomizable
  let sum: number = 0;
  const maxValuesLength = 2;
  const valuesButShortenedBecauseIForgot = values.slice(0,2)
  for(let i=0; i<valuesButShortenedBecauseIForgot.length; i++) {
    if(colors[valuesButShortenedBecauseIForgot[valuesButShortenedBecauseIForgot.length-i-1]] === undefined ) {
        throw new RangeError(`Value ${[valuesButShortenedBecauseIForgot[valuesButShortenedBecauseIForgot.length-i-1]]} at index ${i} not in colors`)
    }

    //console.log(`Digit: ${colors[values[values.length-i-1]]} Place: ${Math.pow(10,i)}`);
    sum+= colors[valuesButShortenedBecauseIForgot[valuesButShortenedBecauseIForgot.length-i-1]] * Math.pow(10,i);
  }
  return sum;
}

/*
Naive: just loop over values, write to an array, convert to a string'
Or: loop over values in reverse order, using i*10 (power) as place value, to avoid having to make an array
Or: avoid using an explicit for loop and do something with reduce


Each color has a 1:1 relationship with a base 10 digit, with place value. Most significant digit first.

At first glance, I wanted to use an enum, but we're actually getting this passed in as a string.

Concepts:
  Index signatures
*/
