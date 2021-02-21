// @flow
import Result, { Err } from 'crocks/Result';


type ResultType = typeof Result;

// returns an Err<Array<T>> to take advantage of Array concatenation for
// multiple errors
// string -> mixed -> Err<Array<T>>
type signature = (string) => ((mixed) => ResultType);
const wrappedErr: signature = (message) => (val) => Err([
  /* $FlowIssue[incompatible-type] flow doesnt want undefined stringified, but
   * the call does precisely what I want
   */
  `Error: ${ message } '${ JSON.stringify(val) }'`,
]);

export default wrappedErr;
