export const diff = (n1, n2) => (n1 > n2 ? n1 - n2 : n2 - n1);
export const isAscending = (arr) => arr.slice(1).every((x, i) => x > arr[i]);
export const isDescending = (arr) => arr.slice(1).every((x, i) => x < arr[i]);
export const largeJump = (a, b) => diff(a, b) > 3;
export const indexOfSubstrings = function* (str, searchValue) {
  let i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) {
      yield r;
      i = r + 1;
    } else return;
  }
};
export const checkSafe = (r) => {
  let result = true;
  if (isAscending(r) || isDescending(r)) {
    for (let i = 0; i < r.length - 1; i++) {
      if (largeJump(r[i], r[i + 1])) {
        result = false;
        break;
      }
    }
  } else {
    result = false;
  }
  return result;
};
