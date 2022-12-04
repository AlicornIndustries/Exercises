/*
Code written with GPT-3, chat.openai.com, with minimal tweaks.
Comments prefaced with ### are user input.
*/

// ### Write a TypeScript function that takes as input a linked list of integers and returns the total sum of the elements of the list that have odd values.
function sumOddElements(head: ListNode): number {
  let sum = 0;
  let curr = head;

  while (curr !== null) {
    if (curr.val % 2 === 1) {
      sum += curr.val;
    }
    curr = curr.next;
  }

  return sum;
}


// ### Change it to "even values."
function sumEvenElements(head: ListNode): number {
  let sum = 0;
  let curr = head;

  while (curr !== null) {
    if (curr.val % 2 === 0) {
      sum += curr.val;
    }
    curr = curr.next;
  }

  return sum;
}

// ### Change it to "prime values."
function sumPrimeElements(head: ListNode): number {
  let sum = 0;
  let curr = head;

  while (curr !== null) {
    if (isPrime(curr.val)) {
      sum += curr.val;
    }
    curr = curr.next;
  }

  return sum;
}

function isPrime(n: number): boolean {
  // Check if n is less than 2, which is not a prime number
  if (n < 2) {
    return false;
  }

  // Check if n is divisible by any number from 2 to the square root of n
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  // If none of the above conditions are met, then n is a prime number
  return true;
}

// ### Can you optimize the isPrime function?
// One possible optimization for the isPrime function is to check only for odd values. Since all even numbers except 2 are not prime, we can save some computational effort by skipping them. Here is an updated version of the isPrime function that implements this optimization:
function isPrime(n: number): boolean {
  // Check if n is less than 2, which is not a prime number
  if (n < 2) {
    return false;
  }

  // If n is equal to 2, then it is a prime number
  if (n === 2) {
    return true;
  }

  // Check if n is even (except for 2, which has been checked above)
  if (n % 2 === 0) {
    return false;
  }

  // Check if n is divisible by any odd number from 3 to the square root of n
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  // If none of the above conditions are met, then n is a prime number
  return true;
}

