// @flow
import { type PredicateFn } from './';

// filter an array within a pipe
const filter = <T>(predicate: PredicateFn<T>): ((arr: Array<T>) => Array<T>) =>
  (arr) => arr.filter(predicate);

export default filter;
