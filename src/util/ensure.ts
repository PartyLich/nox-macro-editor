import Result, { Ok, Err } from 'crocks/Result';

import ifElse from 'crocks/logic/ifElse';
import isFunction from 'crocks/predicates/isFunction';

import type { PredicateFn } from './';


type ResultType = typeof Result;
type signature = <T>(pred: PredicateFn<T>) => (val: T) => ResultType

// returns a function that evaluates predicate `pred` on the supplied value and
// returns an `Ok` if the predicate is true, `Err` otherwise
const ensure: signature = (pred) => {
  if (!isFunction(pred)) {
    throw new TypeError('ensure: Function required for first argument');
  }

  return ifElse(pred, Ok, Err);
};

export default ensure;
