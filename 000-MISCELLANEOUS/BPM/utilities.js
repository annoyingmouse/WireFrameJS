const getNumerals = (n) =>
  n.length === 1 ? [0, Number(n[0])] : [Number(n[0]), Number(n[1])];

export const getTimeArray = () => {
  const date = new Date();
  const hour = getNumerals(date.getHours().toString().split(""));
  const minutes = getNumerals(date.getMinutes().toString().split(""));
  const seconds = getNumerals(date.getSeconds().toString().split(""));
  return [...hour, ...minutes, ...seconds];
};

export const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  " ",
  "?",
  '"',
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  "/",
  "<",
  "=",
  ">",
  "@",
  "\\",
  "^",
  "_",
  "`",
  "|",
  "~",
  "¥",
  "¦",
  "°",
  "±",
];

export const filterString = (inputString, acceptableChars) => {
  // Convert the string to an array of characters
  const inputArray = inputString.split("");
  // Filter the array to keep only acceptable characters
  const filteredArray = inputArray.filter((char) =>
    acceptableChars.includes(char),
  );
  // Join the filtered array back into a string
  const filteredString = filteredArray.join("");
  return filteredString;
};
