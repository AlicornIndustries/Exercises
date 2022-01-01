/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    const hash = {};
    
    for(let i=0; i<nums.length; i++) {
        let complement = target - nums[i];
        // If complement already in table
        if(hash[complement] !== undefined) {
            return [hash[complement], i];
        }
        else {
            hash[nums[i]] = i;
            // So, store the index of the val in nums that would add up to target when we add it to the complement
        }
    }
};

/*
Make a hash table, loop over nums. (note: object keys in JS are strings)
In hash table, store the complement (target-nums[i])
Then when you hit a number such that it equals the complement, you know it + the stored one will equal target.
E.g. if target is 3, nums is [0,4,1,2]:
We're storing
hash = {
    //key (here, index in nums): value (number you would need to add to nums[key] to get target)
    '0': 3
    '1': -1
    '2': 2
    // '3': 1 // We don't actually get here, because we check if the other val (1+2=3 target) is in the table first
}

When we get to nums[3] (2), we see that 2 is already in the table, so return:
    2: key to the complement (which by happenstance has the value 2, but there's no connection between value of key & value there, just luck), which is the index in nums
    3: index in nums[i] of the value that, when added to nums[key of the complement] = target

Another worked example:
nums=[2,7,11,15], target=9 (output=[0,1])
Loop over nums:
* i=1: complement=target-nums[i] -> 9-2 = 7
hash[7] undefined
hash[nums[i]] = i -> hash['2']=0
* i=1: complement=9-7 = 2
hash[7] is defined (from i=0 iteration)
So, return [i, hash[complement]] -> [1, hash[2]] -> [1, 0]
Since we know that nums[i]+nums[hash[complement]] add to target



Optimizations:
Use a map instead (for non-string keys)

*/
