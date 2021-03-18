import { PredicateFn } from './';


type signature = PredicateFn<string | Array<unknown>>;

// Returns true if a string or array is empty, false otherwise
const isEmpty: signature = (str) => str.length === 0;

export default isEmpty;
