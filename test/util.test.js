// @flow
import test from 'tape';
import {
  reorder,
  isInt,
} from '../src/util';


test('reorder()', (t) => {
  {
    const msg = 'moves an element in an array';
    const expected = [2, 1, 3];
    const data = [1, 2, 3];
    const actual = reorder(data)(1, 0);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('isInt()', (t) => {
  {
    const msg = (data) => `returns false for non-integer: "${ data }"`;
    const expected = false;
    {
      const data = '1.2';
      const actual = isInt(data);
      t.equal(actual, expected, msg(data));
    }
    {
      const data = 'foo';
      const actual = isInt(data);
      t.equal(actual, expected, msg(data));
    }
    {
      const data = '';
      const actual = isInt(data);
      t.equal(actual, expected, msg(data));
    }
  }
  {
    const msg = (data) => `returns true for non-integer: "${ data }"`;
    const expected = true;
    {
      const data = '12';
      const actual = isInt(data);
      t.equal(actual, expected, msg(data));
    }
    {
      const data = '-12';
      const actual = isInt(data);
      t.equal(actual, expected, msg(data));
    }
  }

  t.end();
});
