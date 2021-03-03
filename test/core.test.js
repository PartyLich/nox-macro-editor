// @flow
import test from 'tape';
import { types } from '../src/actions';
import {
  addClick,
  addDrag,
  addWait,
  test as toTest,
} from '../src/core';

const {
  scale,
  shallowEqual,
} = toTest || {};


const idToBool = (a) => ({
  ...a,
  id: !!a.id,
});

test('addClick()', (t) => {
  {
    const msg = 'adds a click, wait, and release to empty array';
    const coord = { x: 0, y: 0 };
    const data = [];
    const expected = [
      { id: true, type: types.CLICK, ...coord },
      { id: true, type: types.WAIT, duration: 1 },
      { id: true, type: types.MRELEASE },
    ];
    const actual = addClick(coord, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addClick(coord)(data)(0)
          .map(idToBool);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a click action set with default coord';
    const coord = undefined;
    const data = [];
    const expected = [
      { id: true, type: types.CLICK, ...{ x: 0, y: 0 } },
      { id: true, type: types.WAIT, duration: 1 },
      { id: true, type: types.MRELEASE },
    ];
    const actual = addClick(coord, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addClick(coord)(data)(0)
          .map(idToBool);
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
      { id: true, type: types.MDRAG, ...coord },
      { id: true, type: types.WAIT, duration: 16 },
      { id: true, type: types.MRELEASE },
    ];
    const actual = addDrag(coord, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addDrag(coord)(data)(0)
          .map(idToBool);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a drag action set with default coord';
    const coord = undefined;
    const data = [];
    const expected = [
      { id: true, type: types.MDRAG, ...{ x: 0, y: 0 } },
      { id: true, type: types.WAIT, duration: 16 },
      { id: true, type: types.MRELEASE },
    ];
    const actual = addDrag(coord, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addDrag(coord)(data)(0)
          .map(idToBool);
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
      { id: true, type: types.WAIT, duration },
    ];
    const actual = addWait(duration, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addWait(duration)(data)(0)
          .map(idToBool);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  {
    const msg = 'adds a wait action set with default duration';
    const duration = undefined;
    const data = [];
    const expected = [
      { id: true, type: types.WAIT, duration: 1 },
    ];
    const actual = addWait(duration, data, 0)
        .map(idToBool);
    t.deepEqual(actual, expected, msg);
    t.notDeepEqual(actual, data, 'does not mutate input');

    {
      const actual = addWait(duration)(data)(0)
          .map(idToBool);
      t.deepEqual(actual, expected, '(curried)' + msg);
      t.notDeepEqual(actual, data, 'does not mutate input');
    }
  }

  t.end();
});

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
