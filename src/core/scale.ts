import {
  fromPredicate as safe,
  getOrElse,
  map,
} from 'fp-ts/Option';
import { constant } from 'fp-ts/function';

import {
  and,
  flow,
  isNumber,
  PredicateFn,
} from '../util/';


const notZero: PredicateFn<number> = (x) => x !== 0;

const scale = (from: number, to: number, num: number): number => flow(
    safe(and(isNumber, notZero)),
    map((from: number) => to / from),
    map((factor: number) => factor * num),
    getOrElse(constant(0)),
)(from);

export default scale;
