import test from 'tape';
import {
  isEmpty,
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
