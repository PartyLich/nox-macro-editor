export type WrappedErr = Array<string>;

type signature = (message: string) => (val: unknown) => WrappedErr

// returns an Array<string> to take advantage of Array concatenation for
// multiple errors
const wrappedErr: signature = (message) => (val) => [
  `Error: ${ message } '${ JSON.stringify(val) }'`,
];

export default wrappedErr;
