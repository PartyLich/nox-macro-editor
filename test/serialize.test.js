import test from 'tape';
import {
  clickLine,
  isEmpty,
  mreleaseLine,
  mdragLine,
  splitLines,
  splitPipes,
  splitSeparators,
} from '../src/serialize';


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
