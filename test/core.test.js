// @flow
import test from 'tape';
import { types } from '../src/actions';
import {
  addClick,
  addDrag,
  addWait,
  test as toTest,
} from '../src/core';

const { shallowEqual } = toTest || {};


test('addClick()', (t) => {
  {
    const msg = 'adds a click, wait, and release to empty array';
    const coord = { x: 0, y: 0 };
    const data = [];
    const expected = [
      { type: types.CLICK, ...coord },
      { type: types.WAIT, duration: 1 },
      { type: types.MRELEASE },
    ];
    const actual = addClick(coord, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addClick(coord)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a click action set with default coord';
    const coord = undefined;
    const data = [];
    const expected = [
      { type: types.CLICK, ...{ x: 0, y: 0 } },
      { type: types.WAIT, duration: 1 },
      { type: types.MRELEASE },
    ];
    const actual = addClick(coord, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addClick(coord)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  t.end();
});

test('addDrag()', (t) => {
  {
    const msg = 'adds a drag, wait, and release to empty array';
    const coord = { x: 0, y: 0 };
    const data = [];
    const expected = [
      { type: types.MDRAG, ...coord },
      { type: types.WAIT, duration: 16 },
      { type: types.MRELEASE },
    ];
    const actual = addDrag(coord, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addDrag(coord)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a drag action set with default coord';
    const coord = undefined;
    const data = [];
    const expected = [
      { type: types.MDRAG, ...{ x: 0, y: 0 } },
      { type: types.WAIT, duration: 16 },
      { type: types.MRELEASE },
    ];
    const actual = addDrag(coord, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addDrag(coord)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  t.end();
});

test('addWait()', (t) => {
  {
    const msg = 'adds a wait to empty array';
    const duration = 1;
    const data = [];
    const expected = [
      { type: types.WAIT, duration },
    ];
    const actual = addWait(duration, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addWait(duration)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a wait action set with default duration';
    const duration = undefined;
    const data = [];
    const expected = [
      { type: types.WAIT, duration: 1 },
    ];
    const actual = addWait(duration, data, 0);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addWait(duration)(data)(0);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  t.end();
});

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
