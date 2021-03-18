import curry from 'crocks/helpers/curry';


const isInBounds = (list: Array<unknown>, index: number): boolean =>
  index >= 0 && index < list.length;

// curry functions
const cIsInBounds = curry(isInBounds);

export default cIsInBounds;
