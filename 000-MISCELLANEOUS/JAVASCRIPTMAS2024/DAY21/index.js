import { toysRequested } from "./data.js";

/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year.

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/

const { key, value } = toysRequested
  .flatMap((currentValue) => currentValue.toys)
  .reduce((total, currentValue) => {
    const key = Object.keys(currentValue)[0];
    const value = currentValue[key];
    total.some((el) => el.key === key)
      ? (total.find((el) => el.key === key).value += value)
      : total.push({ key, value });
    return total;
  }, [])
  .sort(function (a, b) {
    return a.value < b.value;
  })[0];

console.log(`The most popular toy is ${key} with ${value} requests.`);
