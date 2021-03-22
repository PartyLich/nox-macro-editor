import test from 'tape';

import wrappedErr from '../src/util/wrappedErr';


test('wrappedErr', (t) => {
  {
    const expected = 'foobar';
    const actual = wrappedErr(expected)(null);

    t.ok(Array.isArray(actual), 'returns an array');
    t.ok(actual[0].match(expected), 'contains expected message');
  }

  t.end();
});
