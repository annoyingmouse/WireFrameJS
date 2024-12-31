/*
Santa has been hacked! In the list of kids to deliver to, the Grinch has replaced some kids' names with his own name.

The original array looked like this:
['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']

**Task**
Remove 'Grinch' from santasArr and put the missing kids back in their original places!

**Stretch goal**
- Do this without creating a new array and using no array methods other than .forEach().
*/

const santasArr = [
  "James",
  "Yi",
  "Grinch",
  "Fatima",
  "Tariq",
  "Grinch",
  "Clare",
  "Grinch",
];

const missingNamesArr = ["Florinda", "Jose", "Gibbs"];

missingNamesArr.forEach((name) => {
  santasArr[santasArr.indexOf("Grinch")] = name;
});

console.log(santasArr);
// Expected Output: ['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']
