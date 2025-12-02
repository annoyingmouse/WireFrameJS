(() =>{
  // const input =`446443-446449`
  // const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
  const input = `92916254-92945956,5454498003-5454580069,28-45,4615-7998,4747396917-4747534264,272993-389376,36290651-36423050,177-310,3246326-3418616,48-93,894714-949755,952007-1003147,3-16,632-1029,420-581,585519115-585673174,1041-1698,27443-39304,71589003-71823870,97-142,2790995-2837912,579556301-579617006,653443-674678,1515120817-1515176202,13504-20701,1896-3566,8359-13220,51924-98061,505196-638209,67070129-67263432,694648-751703,8892865662-8892912125`
  const ranges = input.split(',')
  let runningTotal1 = 0;
  let runningTotal2 = 0;
  const findFactorsOptimized = (num) => {
    let factors = [];
    for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  }
  const chunkString = (str, length) => str.match(new RegExp(`.{${length}}`, 'g'));
  const identicalStrings = (array) => array && array.length > 0 ? new Set(array).size === 1 : false;
  const checkForDuplicates = (num) => {
    // Convert the number to a string and store its length
    const subject = String(num);
    const length = subject.length;
    // 1. Check for even length
    if (length % 2 !== 0) {
      return 0; // Length must be even to have two identical halves
    }
    const halfLength = length / 2;
    // 2. Extract and compare the two halves
    const firstHalf = subject.slice(0, halfLength);
    // Using only one argument in slice extracts all characters from that index to the end
    const secondHalf = subject.slice(halfLength);
    if (firstHalf === secondHalf) {
      return num;
    }
    return 0;
  }

  const checkForDuplicatesAltered = (num) => {
    const subject = String(num);
    const factors = findFactorsOptimized(subject.length)
    let valid = false
    for(const factor of factors) {
      if(identicalStrings(chunkString(subject, factor))){
        valid = true;
        return num;
      }
    }
    return valid ? num : 0;
  }


  for(const range of ranges) {
    const chunks = range.split('-')
    const start = Number(chunks[0])
    const end = Number(chunks[1])
    for(let i = start; i <= end; i++){
      runningTotal2 += checkForDuplicatesAltered(i)
      runningTotal1 += checkForDuplicates(i)
    }
  }
  console.log("Part 1:", runningTotal1)
  console.log("Part 2:", runningTotal2)
})()