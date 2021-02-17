import test from 'tape';
import { test as toTest } from '../src/serialize';
const {
  clickLine,
  isEmpty,
  mreleaseLine,
  mdragLine,
  parseAction,
  parseCoord,
  splitLines,
  splitPipes,
  splitSeparators,
  tokenToObj,
} = toTest;


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

test('splitLines()', (t) => {
  {
    const msg = 'splits a string with windows line breaks';
    const expected = ['foo', 'bar', 'baz'];
    const data = expected.join('\r\n');
    const actual = splitLines(data);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'splits a string with unix line breaks';
    const expected = ['foo', 'bar', 'baz'];
    const data = expected.join('\n');
    const actual = splitLines(data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('splitPipes()', (t) => {
  {
    const msg = 'splits a string at | characters';
    const expected = ['foo', 'bar', 'baz'];
    const data = expected.join('|');
    const actual = splitPipes(data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('splitSeparators()', (t) => {
  {
    const msg = 'Split strings in an array at Nox macro script separator tokens';
    const expected = ['foo', 'bar', 'baz'];
    const data = [expected.join('ScRiPtSePaRaToR')];
    const actual = splitSeparators(data);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('tokenToObj()', (t) => {
  {
    const msg = 'throws with < 5 tokens';
    const expected = /unable to parse action: /;
    const data = [];
    const actual = () => tokenToObj(data);
    t.throws(actual, expected, msg);
  }

  {
    const msg = 'parses string tokens to objects';
    const time = 0;
    const resX = 720;
    const resY = 720;
    const action = {
      id: true,
      type: 'CLICK',
      x: 360,
      y: 640,
    };
    const expected = [
      parseInt(time, 10),
      action,
      { x: resX, y: resY },
    ];
    const data = ['0', `${ resX }`, `${ resY }`, 'MULTI:1:0:360:640', `${ time }`];
    const actual = tokenToObj(data);
    // existence only check for random id
    actual[1] = {
      ...actual[1],
      id: !!actual[1].id,
    };

    t.deepEqual(actual, expected, msg);
    t.ok(Array.isArray(actual), 'returns array');
    t.equal(actual.length, 3, 'returns tuple length 3');
  }

  t.end();
});

test('clickLine()', (t) => {
  {
    const msg = 'serialize click action to Nox macro format';
    const expected = '0ScRiPtSePaRaToR900|1600|MULTI:1:0:207:1360ScRiPtSePaRaToR1';
    const resolution = { x: 900, y: 1600 };
    const time = 1;
    const action = { type: '', x: 207, y: 1360 };
    const actual = clickLine(resolution, time, action);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('mdragLine()', (t) => {
  {
    const msg = 'serialize drag action to Nox macro format ';
    const expected = '0ScRiPtSePaRaToR900|1600|MULTI:1:2:519:1226ScRiPtSePaRaToR399';
    const resolution = { x: 900, y: 1600 };
    const time = 399;
    const action = { type: '', x: 519, y: 1226 };
    const actual = mdragLine(resolution, time, action);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('mreleaseLine()', (t) => {
  {
    const msg = 'serialize mouse release action to Nox macro format';
    const expected = '0ScRiPtSePaRaToR900|1600|MSBRL:0:0ScRiPtSePaRaToR2';
    const resolution = { x: 900, y: 1600 };
    const time = 2;
    const actual = mreleaseLine(resolution, time);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('parseAction()', (t) => {
  {
    const msg = 'parses click Action from string';
    const data = 'MULTI:1:0:360:640';
    const expected = {
      id: true,
      type: 'CLICK',
      x: 360,
      y: 640,
    };
    const actual = parseAction(data);
    actual.id = Boolean(actual.id);

    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  {
    const msg = 'parses drag Action from string';
    const data = 'MULTI:1:2:342:666';
    const expected = {
      id: true,
      type: 'MDRAG',
      x: 342,
      y: 666,
    };
    const actual = parseAction(data);
    actual.id = Boolean(actual.id);

    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  {
    const msg = 'parses release Action from string';
    const data = 'MSBRL:0:0';
    const expected = {
      id: true,
      type: 'MRELEASE',
    };
    const actual = parseAction(data);
    actual.id = Boolean(actual.id);

    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  t.end();
});

test('parseCoord()', (t) => {
  {
    const msg = 'parses Coord from array of strings';
    const expected = { x: 10, y: 42 };
    const data = ['10', '42'];
    const actual = parseCoord(data);
    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  t.end();
});
