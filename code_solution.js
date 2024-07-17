// Problem Solving -

function twoSum(nums, target) {
    let numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return [];
}


/*
Approach:
- I have used a hash map to store the indices of the numbers.
- As we iterate through the array, for each element nums[i], we calculate its complement with respect to the target (complement = target - nums[i]).
- We then check if this complement exists in the hash map.
- If the complement exists in the hash map, it means we have found the two numbers that add up to the target and we return their indices.
- If the complement does not exist, we store the current number and its index in the hash map and move to the next element.


Reasoning:
- By using a hash map, we can efficiently check for the complement in constant time O(1) on average.
- This approach ensures that we only pass through the array once, making it a single pass solution.


Time Complexity:
- The time complexity of this solution is O(n), where n is the number of elements in the array. This is because we only traverse the array once.


Space Complexity:
- The space complexity is also O(n) because, in the worst case, we might end up storing all the elements in the hash map.

*/