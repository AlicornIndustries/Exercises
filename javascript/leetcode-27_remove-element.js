/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
  let i=0;
  while(i<nums.length) {
    if(nums[i]===val) {
      //console.log(`i: ${i} nums[i]: ${nums[i]}`)
      nums.splice(i,1);
    }
    else {
      i++;
    }
  }
  //console.log(nums);
  return i;
};
/*
Can't use filter, since this is in place.
Naive: loop over array, splice out elements that match val.

*/
