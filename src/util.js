// @flow

// helper fn to compose functions
const pipe = (...fns: Array<Function>) =>
  (init: any) => fns.reduce((x, f) => f(x), init);

// map an array within a pipe
const map = (fn: Function) => <T, U>(arr: Array<T>): Array<U> => arr.map(fn);

type PredicateFn<T> = (T) => boolean;

// filter an array within a pipe
const filter = <T>(predicate: PredicateFn<T>) =>
  (arr: Array<T>): Array<T> => arr.filter(predicate);

// log within a pipe
const trace = (msg: string = 'trace') => <T>(val: T) => {
  console.log(`${ msg }: ${ JSON.stringify(val) || 'undef' }`);
  return val;
};

// return a new array with element at `from` in initial array moved to `to`
const reorder = <T>(arr: Array<T>): ((number, number) => Array<T>) =>
  (from, to) => {
    const res = arr.slice();
    const item = res.splice(from, 1);
    res.splice(to, 0, ...item);
    return res;
  };

// return true if string contains an integer (base 10)
const isInt: PredicateFn<string> = (str) => /^[+-]?\d+$/.test(str.trim());

// initiate a file download with the specified `contentType` and `content`
// all over the net. versions on blogs, SO, etc. No idea who the originator was
const download = (contentType: string, content: any, filename: string) => {
  const file = new Blob([content], { type: contentType });
  const a = document.createElement('a');

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

export {
  download,
  filter,
  isInt,
  map,
  pipe,
  reorder,
  trace,
};
