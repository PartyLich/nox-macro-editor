// returns true if `index` is within the bounds of `list`, false otherwise
const cIsInBounds = (list: Array<unknown>) => (index: number): boolean =>
  index >= 0 && index < list.length;

// uncurry functions
const isInBounds = (list: Array<unknown>, index: number): boolean =>
  cIsInBounds(list)(index);

export default cIsInBounds;

export {
  cIsInBounds,
  isInBounds,
};
