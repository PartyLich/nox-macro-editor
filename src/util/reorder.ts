type signature = (from: number, to: number) => <T>(arr: Array<T>) => Array<T>;

// return a new array with element at `from` in initial array moved to `to`
const reorder: signature = (from, to) => (arr) => {
  const res = arr.slice();
  const item = res.splice(from, 1);
  res.splice(to, 0, ...item);
  return res;
};

export default reorder;
