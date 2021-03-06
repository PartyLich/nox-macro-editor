import test from 'tape';

import { isInBounds } from '../src/util/isInBounds';


test('isInBounds()', (t) => {
  {
    const msg = (ind: number, arr: Array<unknown>) =>
      `returns true if index (${ ind }) is in array bounds (${ 0 }, ${ arr.length - 1 })`;
    const expected = true;
    const data = [1, 2, 3];
    const ind = 1;
    const actual = isInBounds(data, ind);
    t.equal(actual, expected, msg(ind, data));
    {
      const ind = 0;
      const actual = isInBounds(data, ind);
      t.equal(actual, expected, msg(ind, data));
    }
  }
  {
    const msg = (ind: number, arr: Array<unknown>) =>
      `returns false if index (${ ind }) is out of bounds (${ 0 }, ${ arr.length - 1 })`;
    const expected = false;
    const data = [1, 2, 3];
    const ind = 1;
    {
      const actual = isInBounds(data, -1);
      t.equal(actual, expected, msg(ind, data));
    }
    {
      const actual = isInBounds(data, 41);
      t.equal(actual, expected, msg(ind, data));
    }
    {
      const actual = isInBounds(data, NaN);
      t.equal(actual, expected, msg(ind, data));
    }
  }

  t.end();
});
