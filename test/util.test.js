// @flow
import test from 'tape';
import {
  reorder,
  insert,
  isInBounds,
  isInt,
  removeAt,
} from '../src/util';


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

test('isInBounds()', (t) => {
  {
    const msg = (ind, arr) =>
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
    const msg = (ind, arr) =>
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

test('insert()', (t) => {
  {
    const msg = 'inserts an array at index';
    const expected = [2, 1, 3];
    const data = [1];
    const actual = insert([2, 3], 1)( data);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'inserts an array at end if ind > len';
    const expected = [2, 3, 1];
    const data = [1];
    const actual = insert([2, 3], 42)( data);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'inserts an array at start if ind < 0';
    const expected = [1, 2, 3];
    const data = [1];
    const actual = insert([2, 3], -1)( data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

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
      // $FlowFixMe flow failed to catch a call like this
      const actual = removeAt(undefined, [1, 2, 3]);
      t.deepEqual(actual, expected, msg);
    }
    {
      // $FlowFixMe flow failed to catch a call like this
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
