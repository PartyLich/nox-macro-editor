// @flow
export type PredicateFn<T> = (T) => boolean;

export { default as download } from './download';

// Array
export { default as reorder } from './reorder';
export { default as removeAt } from './removeAt';

// Logic
export * from './compare';

// Pointfree
export { default as filter } from './filter';
export { default as insert } from './insert';
export { default as map } from 'crocks/pointfree/map';
export { default as pipe } from 'crocks/helpers/pipe';
export { default as trace } from './trace';

// Predicates
export { default as isEmpty } from './isEmpty';
export { default as isInBounds } from './isInBounds';
export { default as isInt } from './isInt';

// Result
export { default as ensure } from './ensure';
export { default as wrappedErr } from './wrappedErr';
