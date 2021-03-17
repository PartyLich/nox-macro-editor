import and from 'crocks/logic/and';
import isNumber from 'crocks/predicates/isNumber';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';

import { map, pipe } from '../util/';
import type { PredicateFn } from '../util/';


const notZero: PredicateFn<number> = (x) => x !== 0;

const scale = (from: number, to: number, num: number): number => pipe(
    safe(and(isNumber, notZero)),
    map((from: number) => to / from),
    map((factor: number) => factor * num),
    option(0),
)(from);

export default scale;
