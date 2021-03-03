// @flow
export type PredicateFn<T> = (T) => boolean;

export { default as filter } from './filter';
export { default as trace } from './trace';
