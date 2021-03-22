type signature = <T>(index: number, list: Array<T>) => Array<T>

// returns a new array with the item at index removed from list
const removeAt: signature = (index, list) => {
  if (index == null || index < 0 || index >= list.length) return list.slice();

  const res = list.slice();
  res.splice(index, 1);
  return res;
};

export default removeAt;
