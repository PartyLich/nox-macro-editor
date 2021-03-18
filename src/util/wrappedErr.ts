import Result, { Err } from 'crocks/Result';


type ResultType = typeof Result;

// returns an Err<Array<T>> to take advantage of Array concatenation for
// multiple errors
// string -> mixed -> Err<Array<T>>
type signature = (message: string) => (val: unknown) => ResultType;

const wrappedErr: signature = (message) => (val) => Err([
  `Error: ${ message } '${ JSON.stringify(val) }'`,
]);

export default wrappedErr;
