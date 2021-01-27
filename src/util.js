// @flow

// helper fn to compose functions
const pipe = (...fns: Array<Function>) =>
  (init: any) => fns.reduce((x, f) => f(x), init);

// map an array within a pipe
const map = (fn: Function) => <T, U>(arr: Array<T>): Array<U> => arr.map(fn);

type PredicateFn = (any) => boolean;

// filter an array within a pipe
const filter = (predicate: PredicateFn) =>
  <T>(arr: Array<T>): Array<T> => arr.filter(predicate);

// log within a pipe
const trace = (msg: string = 'trace') => <T>(val: T) => {
  console.log(`${ msg }: ${ JSON.stringify(val) || 'undef' }`);
  return val;
};

export {
  filter,
  map,
  pipe,
  trace,
};
