// @flow
import { type PredicateFn } from './';


// return true if string contains an integer (base 10)
const isInt: PredicateFn<string> = (str) => /^[+-]?\d+$/.test(str.trim());

export default isInt;
