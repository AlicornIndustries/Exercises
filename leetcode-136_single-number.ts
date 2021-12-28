function singleNumber(nums: number[]): number {
    let bits = nums[0];
    
    for(let i=1; i<nums.length; i++) {
        bits = bits ^ nums[i];
    }
    
    return bits;
};

/*
Naive: sort array, loop over (moving index by 2 each time). If there's ever a nums[i] that does not match nums[i-1], then that's the single number.

Example:
[1,2,2]
nums[1] != nums[0] --> return nums[0]

[1,1,2]
Special handling: if we haven't hit the single by nums.length-2 (the penult), then the last element nums[length-1] must be the single.

~~~~~~~~~~~~~~~~~~~~~

Naive won't work: sorting array is O(nlogn), then we loop over it again, so definitely more than linear time.

Bit magic: use an operation that cancels out (so we run it across the array once, only the single number won't be canceled)
XOR across.
[2,2,1] -> binary [10,10,1]
* 10 ^ 10 -> 0
* 0 ^ 1   -> 1 --> return 1

[4,1,2,1,2] -> binary [100,001,010,001,010]
100 ^ 001 -> 101
101 ^ 010 -> 111
111 ^ 001 -> 110
110 ^ 010 -> 100

So, running var bits
start with bits=nums[0]
Then bits = bits ^ nums[i] for i=1:nums.length-1
*/
      
/*
      Problem source:
      https://leetcode.com/problems/single-number/
*/
