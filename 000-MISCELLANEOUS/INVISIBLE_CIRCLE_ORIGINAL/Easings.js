const easeInSine = (x) => 1 - Math.cos((x * Math.PI) / 2);
const easeOutSine = (x) => Math.sin((x * Math.PI) / 2);
const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
const easeInQuad = (x) => x * x;
const easeOutQuad = (x) => 1 - (1 - x) * (1 - x);
const easeInOutQuad = (x) =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
const easeInCubic = (x) => x * x * x;
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeInQuart = (x) => x * x * x * x;
const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
const easeInOutQuart = (x) =>
  x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
const easeInQuint = (x) => x * x * x * x * x;
const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5);
const easeInOutQuint = (x) =>
  x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
const easeInExpo = (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10));
const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
const easeInOutExpo = (x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  return x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
};
const easeInCirc = (x) => 1 - Math.sqrt(1 - Math.pow(x, 2));
const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));
const easeInOutCirc = (x) => {
  if (x < 0.5) return (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2;
  return (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};
const easeInBack = (x) => {
  const c1 = 1.70158;
  return x * x * ((c1 + 1) * x - c1);
};
const easeOutBack = (x) => {
  const c1 = 1.70158;
  return 1 + (x - 1) * (x - 1) * ((c1 + 1) * (x - 1) + c1);
};
const easeInOutBack = (x) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  if (x < 0.5) {
    return (2 * x * x * ((c2 + 1) * 2 * x - c2)) / 2;
  }
  return (1 + (2 * x - 2) * (2 * x - 2) * ((c2 + 1) * (2 * x - 2) + c2)) / 2;
};
export {
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
};
