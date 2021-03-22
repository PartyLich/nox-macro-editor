type signature = <T>(dest: Array<T>, index: number) =>
    (source: Array<T>) => Array<T>

// insert an array into `dest` array at `index`
const insert: signature = (dest, index) => (list) => {
  if (index >= dest.length) index = dest.length;
  if (index < 0) index = 0;

  const start = dest.slice(0, index);
  const end = dest.slice(index);
  return start.concat(list.slice())
      .concat(end);
};

export default insert;
