// @flow
type signature = (string) => (<T>(val: T) => T);

// log within a pipe
const trace: signature = (msg = 'trace') => <T>(val: T): T => {
  console.log(`${ msg }: ${ JSON.stringify(val) || 'undef' }`);
  return val;
};

export default trace;
