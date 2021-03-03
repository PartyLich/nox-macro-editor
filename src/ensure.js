// @flow
import Result, { Ok, Err } from 'crocks/Result';

import ifElse from 'crocks/logic/ifElse';
import isFunction from 'crocks/predicates/isFunction';

// import type { PredicateFn, ResultType } from './types';
import type { PredicateFn } from './util/';


type ResultType = typeof Result;

// returns a function that evaluates predicate `pred` on the supplied value and
// returns an `Ok` if the predicate is true, `Err` otherwise
const ensure = <T>(pred: PredicateFn<T>): (T => ResultType) => {
  if (!isFunction(pred)) {
    throw new TypeError('ensure: Function required for first argument');
  }

  return ifElse(pred, Ok, Err);
};

export default ensure;
