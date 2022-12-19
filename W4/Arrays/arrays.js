function getSecondLargest(nums) {
  let firstLargest = nums[0];
  let secondLargest = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = nums[i];
      continue;
    }

    if (nums[i] > secondLargest && nums[i] < firstLargest) {
      secondLargest = nums[i];
    }
  }

  return secondLargest;
}
