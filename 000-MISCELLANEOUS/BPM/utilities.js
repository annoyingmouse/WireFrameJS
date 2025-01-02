const getNumerals = (n) =>
  n.length === 1 ? [0, Number(n[0])] : [Number(n[0]), Number(n[1])];

export const getTimeArray = () => {
  const date = new Date();
  const hour = getNumerals(date.getHours().toString().split(""));
  const minutes = getNumerals(date.getMinutes().toString().split(""));
  const seconds = getNumerals(date.getSeconds().toString().split(""));
  return [...hour, ...minutes, ...seconds];
};