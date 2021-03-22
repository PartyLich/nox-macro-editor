import { PredicateFn } from '../util/';


const and = <T>(p1: PredicateFn<T>, p2: PredicateFn<T>): PredicateFn<T> =>
  (t) => p1(t) && p2(t);

export default and;
