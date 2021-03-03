// @flow
import test from 'tape';

import { insert } from '../src/util/';


test('insert()', (t) => {
  {
    const msg = 'inserts an array at index';
    const expected = [2, 1, 3];
    const data = [1];
    const actual = insert([2, 3], 1)(data);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'inserts an array at end if ind > len';
    const expected = [2, 3, 1];
    const data = [1];
    const actual = insert([2, 3], 42)(data);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'inserts an array at start if ind < 0';
    const expected = [1, 2, 3];
    const data = [1];
    const actual = insert([2, 3], -1)(data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
