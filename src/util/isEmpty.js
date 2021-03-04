// @flow
import type{ PredicateFn } from './';


type signature = PredicateFn<string | Array<mixed>>;

// Returns true if a string is empty, false otherwise
const isEmpty: signature = (str) => str.length === 0;

export default isEmpty;
