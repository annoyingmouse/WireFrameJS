// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

/**
 * https://www.geeksforgeeks.org/combination-sum-problem-in-javascript/
 */
const combinationSum = (nums, target) => {
  // Helper function
  const findCombinations = (start, currentSum, currentCombination) => {
    // Base case
    if (currentSum === target) {
      result.push([...currentCombination]);
      return;
    }

    //  one more edge case
    if (currentSum > target || start === nums.length) {
      return;
    }

    // include current element
    findCombinations(
      start,
      currentSum + nums[start],
      currentCombination.concat(nums[start]),
    );

    // exclude current element
    findCombinations(start + 1, currentSum, currentCombination);
  };

  const result = [];

  findCombinations(0, 0, []);

  // Return
  return result;
};

// Good luck and happy coding!!
function correctChangeFromSanta(bills) {
  let ableToGiveChange = true;
  const float = [];
  let change = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 5) {
      float.push(5);
    } else {
      const change = bills[i] - 5;
      const combinations = combinationSum(float, change);
      if (combinations.length === 0) {
        ableToGiveChange = false;
      } else {
        const smallestChange = combinations.reduce(
          function (p, c) {
            return p.length > c.length ? c : p;
          },
          { length: Infinity },
        );
        for (let j = 0; j < smallestChange.length; j++) {
          float.splice(float.indexOf(smallestChange[j]), 1);
        }
        float.push(bills[i]);
      }
    }
  }
  return ableToGiveChange;
}

// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5, 5, 5, 10, 20])) {
  console.log("Nice job Santa, everyone got their correct change!");
} else {
  console.log(
    "Looks like you have some work to do Santa, and bring some money next time!",
  );
}

// Should return false
if (correctChangeFromSanta([5, 5, 10, 10, 20])) {
  console.log("Nice job Santa, everyone got their correct change!");
} else {
  console.log(
    "Looks like you have some work to do Santa, and bring some money next time!",
  );
}
