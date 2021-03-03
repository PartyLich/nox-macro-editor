// @flow
import curry from 'crocks/helpers/curry';
import map from 'crocks/pointfree/map';
import pipe from 'crocks/helpers/pipe';

import wrappedErr from './wrappedErr';
import ensure from './ensure';


export type PredicateFn<T> = (T) => boolean;

// filter an array within a pipe
const filter = <T>(predicate: PredicateFn<T>): ((arr: Array<T>) => Array<T>) =>
  (arr: Array<T>): Array<T> => arr.filter(predicate);

type traceSig = (string) => (<T>(val: T) => T);

// log within a pipe
const trace: traceSig = (msg = 'trace') => <T>(val: T): T => {
  console.log(`${ msg }: ${ JSON.stringify(val) || 'undef' }`);
  return val;
};

type reorderSig = (number, number) => (<T>(Array<T>) => Array<T>);

// return a new array with element at `from` in initial array moved to `to`
const reorder: reorderSig = (from, to) => <T>(arr: Array<T>): Array<T> => {
  const res = arr.slice();
  const item = res.splice(from, 1);
  res.splice(to, 0, ...item);
  return res;
};

// return true if string contains an integer (base 10)
const isInt: PredicateFn<string> = (str) => /^[+-]?\d+$/.test(str.trim());

// initiate a file download with the specified `contentType` and `content`
// all over the net. versions on blogs, SO, etc. No idea who the originator was
const download = (contentType: string, content: any, filename: string) => {
  const file = new Blob([content], { type: contentType });
  const a = document.createElement('a');

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

// insert an array into `dest` array at `index`
const insert = <T>(dest: Array<T>, index: number): ((Array<T>) => Array<T>) =>
  (list) => {
    if (index >= dest.length) index = dest.length;
    if (index < 0) index = 0;

    const start = dest.slice(0, index);
    const end = dest.slice(index);
    return start.concat(list.slice())
        .concat(end);
  };

// returns a new array with the item at index removed from list
const removeAt = <T>(index: number, list: Array<T>): Array<T> => {
  if (index == null || index < 0 || index >= list.length) return list.slice();

  const res = list.slice();
  res.splice(index, 1);
  return res;
};

type numericCompare = (number) => ((number) => boolean);

// return true if b is >= a
const gte: numericCompare = (a) => (b) => b >= a;

// return true if b is > a
const gt: numericCompare = (a) => (b) => b > a;

// return true if b is < a
const lt: numericCompare = (a) => (b) => b < a;

// return true if b is < a
const lte: numericCompare = (a) => (b) => b <= a;

const isInBounds = (list: Array<any>, index: number): boolean =>
  index >= 0 && index < list.length;

// curry functions
const cDownload: any = curry(download);
const cIsInBounds: any = curry(isInBounds);

export {
  cDownload as download,
  ensure,
  filter,
  gt,
  gte,
  insert,
  cIsInBounds as isInBounds,
  isInt,
  lt,
  lte,
  map,
  pipe,
  reorder,
  removeAt,
  trace,
  wrappedErr,
};
