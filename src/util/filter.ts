import { PredicateFn } from './';


type signature = <T>(predicate: PredicateFn<T>) => (arr: Array<T>) => Array<T>

// filter an array within a pipe
const filter: signature = (predicate) => (arr) => arr.filter(predicate);

export default filter;
