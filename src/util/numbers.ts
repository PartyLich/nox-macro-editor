// add two numbers `a` and `b`
const sum: (a: number) => (b: number) => number = (a) => (b) => a + b;

// increment a number by 1
const inc = sum(1);

export {
  inc,
  sum,
};
