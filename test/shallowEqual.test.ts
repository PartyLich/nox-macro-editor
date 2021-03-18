import test from 'tape';

import shallowEqual from '../src/core/shallowEqual';


test('shallowEqual()', (t) => {
  {
    const msg = 'returns true if objects are equal at one level';
    const objA = {
      foo: 'bar',
      baz: 1,
    };
    const objB = {
      foo: 'bar',
      baz: 1,
      wub: 'dub',
    };
    const actual = shallowEqual(objA, objB);
    t.ok(actual, msg);
  }

  {
    const msg = 'returns false if objects are inequal at one level';
    const objA = {
      foo: 'bar',
      baz: 1,
    };
    const objB = {
      foo: 'WRONG',
      baz: 1,
      wub: 'dub',
    };
    const actual = shallowEqual(objA, objB);
    t.notOk(actual, msg);
  }

  t.end();
});
