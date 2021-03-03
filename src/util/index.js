// @flow
export type PredicateFn<T> = (T) => boolean;

export { default as filter } from './filter';
export { default as insert } from './insert';
export { default as isEmpty } from './isEmpty';
export { default as isInBounds } from './isInBounds';
export { default as isInt } from './isInt';
export { default as reorder } from './reorder';
export { default as removeAt } from './removeAt';
export { default as trace } from './trace';
export * from './compare';
