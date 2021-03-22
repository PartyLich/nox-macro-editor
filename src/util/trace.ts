type signature = (msg?: string) => <T>(val: T) => T;

// log within a pipe
const trace: signature = (msg = 'trace') => (val) => {
  console.log(`${ msg }: ${ JSON.stringify(val) || 'undef' }`);
  return val;
};

export default trace;
