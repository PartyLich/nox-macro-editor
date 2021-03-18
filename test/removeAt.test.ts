import test from 'tape';

import { removeAt } from '../src/util/';


test('removeAt()', (t) => {
  {
    const msg = 'removes element at index';
    const expected = [1, 3];
    const actual = removeAt(1, [1, 2, 3]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'returns array copy if index is out of bounds';
    const expected = [1, 2, 3];
    {
      const actual = removeAt(42, [1, 2, 3]);
      t.deepEqual(actual, expected, msg);
    }
    {
      const actual = removeAt(-1, [1, 2, 3]);
      t.deepEqual(actual, expected, msg);
    }
    {
      // @ts-expect-error intentional bad arg for test
      const actual = removeAt(undefined, [1, 2, 3]);
      t.deepEqual(actual, expected, msg);
    }
    {
      // @ts-expect-error intentional bad arg for test
      const actual = removeAt(null, [1, 2, 3]);
      t.deepEqual(actual, expected, msg);
    }
    {
      const msg = 'original array copied';
      const actual = removeAt(42, [1, 2, 3]);
      actual[0] = 42;
      t.notDeepEqual(actual, expected, msg);
    }
  }

  t.end();
});
