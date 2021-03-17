// @flow
type signature = (number, number) => (<T>(Array<T>) => Array<T>);

// return a new array with element at `from` in initial array moved to `to`
const reorder: signature = (from, to) => <T>(arr: Array<T>): Array<T> => {
  const res = arr.slice();
  const item = res.splice(from, 1);
  res.splice(to, 0, ...item);
  return res;
};

export default reorder;
