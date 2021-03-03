// @flow
import test from 'tape';

import scale from '../src/core/scale';


test('scale()', (t) => {
  {
    const msg = 'scales up';
    const from = 1;
    const expected = 5;
    const actual = scale(from, expected, from);
    t.equal(actual, expected, msg);
  }

  {
    const msg = 'scales down';
    const from = 5;
    const expected = 1;
    const actual = scale(from, expected, from);
    t.equal(actual, expected, msg);
  }

  {
    const msg = 'does not scale 0';
    const from = 0;
    const to = 5;
    const num = 1;
    const expected = 0;
    const actual = scale(from, to, num);
    t.equal(actual, expected, msg);
  }

  t.end();
});
