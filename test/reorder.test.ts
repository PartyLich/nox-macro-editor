// @flow
import test from 'tape';

import {
  reorder,
} from '../src/util/';


test('reorder()', (t) => {
  {
    const msg = 'moves an element in an array';
    const expected = [2, 1, 3];
    const data = [1, 2, 3];
    const actual = reorder(1, 0)(data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
