// returns true if `val` is a string, false otherwise
const isString = (val: unknown): val is string => typeof val === 'string';

export default isString;
