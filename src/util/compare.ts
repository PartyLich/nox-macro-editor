type numericCompare = (a: number) => (b: number) => boolean;

// return true if b is >= a
const gte: numericCompare = (a) => (b) => b >= a;

// return true if b is > a
const gt: numericCompare = (a) => (b) => b > a;

// return true if b is < a
const lt: numericCompare = (a) => (b) => b < a;

// return true if b is < a
const lte: numericCompare = (a) => (b) => b <= a;

export {
  gt,
  gte,
  lt,
  lte,
};
