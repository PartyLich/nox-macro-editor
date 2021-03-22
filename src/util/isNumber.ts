const isNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val);

export default isNumber;
