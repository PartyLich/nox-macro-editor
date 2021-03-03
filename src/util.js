// @flow
import pipe from 'crocks/helpers/pipe';


// add two number `a` and `b`
const sum: ((number) => ((number) => number)) = (a) => (b) => a + b;

// increment a number by 1
const inc: ((number) => number) = sum(1);

export {
  inc,
  pipe,
  sum,
};
