// @flow
import curry from 'crocks/helpers/curry';


const isInBounds = (list: Array<mixed>, index: number): boolean =>
  index >= 0 && index < list.length;

// curry functions
const cIsInBounds: any = curry(isInBounds);

export default cIsInBounds;
