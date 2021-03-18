import test from 'tape';

import isEmpty from '../src/util/isEmpty';


test('isEmpty()', (t) => {
  {
    const msg = `returns true for empty array`;
    const expected = true;
    const data = [];
    const actual = isEmpty(data);
    t.equal(actual, expected, msg);
  }
  {
    const msg = `returns false for non-empty array`;
    const expected = false;
    const data = [1, 2, 3];
    const actual = isEmpty(data);
    t.equal(actual, expected, msg);
  }
  {
    const msg = `returns true for empty string`;
    const expected = true;
    const data = '';
    const actual = isEmpty(data);
    t.equal(actual, expected, msg);
  }
  {
    const msg = `returns false for non-empty string`;
    const expected = false;
    const data = 'foo';
    const actual = isEmpty(data);
    t.equal(actual, expected, msg);
  }

  t.end();
});
