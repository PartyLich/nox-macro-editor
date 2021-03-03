// @flow
export type PredicateFn<T> = (T) => boolean;

export { default as filter } from './filter';
export { default as reorder } from './reorder';
export { default as trace } from './trace';
