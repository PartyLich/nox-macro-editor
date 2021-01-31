// @flow
import test from 'tape';
import {
  isInt,
} from '../src/util';


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
