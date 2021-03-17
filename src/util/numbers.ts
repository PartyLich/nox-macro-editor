// @flow
// add two numbers `a` and `b`
const sum: ((number) => ((number) => number)) = (a) => (b) => a + b;

// increment a number by 1
const inc: ((number) => number) = sum(1);

export {
  inc,
  sum,
};
