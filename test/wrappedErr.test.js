// @flow
import test from 'tape';

import wrappedErr from '../src/wrappedErr';


const identity = (x) => x;

test('wrappedErr', (t) => {
  {
    const msg = 'returns Err';
    const expected = /Err /;
    const actual = wrappedErr('foo')(null);

    t.match(actual.toString(), expected, msg);
  }

  {
    const msg = 'Err value is an array';
    const expected = true;
    const actual = wrappedErr('foo')(null).either(identity, () => null);

    t.equal(Array.isArray(actual), expected, msg);
  }

  {
    const msg = 'Err value contains message';
    const expected = 'foobar';
    const actual = wrappedErr(expected)(null).either(identity, () => null);

    t.ok(actual[0].match(expected), msg);
  }

  t.end();
});
