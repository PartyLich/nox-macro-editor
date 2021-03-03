import test from 'tape';

import {
  isEmpty,
  // notEmpty,
  parseCoord,
  splitLines,
  splitPipes,
  splitSeparators,
  tryTokenToObj,
  tryParseAction,
  tryParseCoord,
  tryParseInt,
} from '../src/nox-serializer/deserialize';


const identity = (x) => x;

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

test('tryParseAction()', (t) => {
  {
    const msg = 'parses click Action from string';
    const data = 'MULTI:1:0:360:640';
    const expected = {
      id: true,
      type: 'CLICK',
      x: 360,
      y: 640,
    };
    const actual = tryParseAction(data).either(identity, identity);
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
    const actual = tryParseAction(data).either(identity, identity);
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
    const actual = tryParseAction(data).either(identity, identity);
    actual.id = Boolean(actual.id);

    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  {
    const msg = 'returns an Err';
    const expected = /Err /i;

    {
      const data = 'foobar:0:0:321:435';
      const actual = tryParseAction(data);
      t.match(actual.toString(), expected, msg);
      t.ok(
          Array.isArray(actual.either(identity, identity)),
          'returns array of errors',
      );
    }

    {
      const data = null;
      const actual = tryParseAction(data);
      t.match(actual.toString(), expected, msg);
      t.ok(
          Array.isArray(actual.either(identity, identity)),
          'returns array of errors',
      );
    }

    {
      const data = 0;
      const actual = tryParseAction(data);
      t.match(actual.toString(), expected, msg);
      t.ok(
          Array.isArray(actual.either(identity, identity)),
          'returns array of errors',
      );
    }
  }

  t.end();
});

test('tryTokenToObj()', (t) => {
  {
    const msg = 'returns Err with < 5 tokens';
    const expected = /unable to parse action: /;
    const data = [];
    const actual = tryTokenToObj(data).either(identity, () => 'non match');
    t.match(actual[0], expected, msg);
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
      time,
      action,
      { x: resX, y: resY },
    ];
    const data = ['0', `${ resX }`, `${ resY }`, 'MULTI:1:0:360:640', `${ time }`];
    const actual = tryTokenToObj(data).either(identity, identity);
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

test('tryParseInt()', (t) => {
  {
    const msg = '';
    const expected = 10;
    const actual = tryParseInt('10').either(identity, identity);
    t.equal(actual, expected, msg);
    t.equal(typeof actual, 'number', 'returns a number');
  }

  {
    const msg = 'returns an Err';
    const expected = /error/i;
    const actual = tryParseInt('foo')
        .either(identity, () => 'no match');
    t.match(actual[0], expected, msg);
    t.ok(Array.isArray(actual), 'returns array of errors');
  }

  t.end();
});

test('tryParseCoord()', (t) => {
  {
    const msg = '';
    const expected = { x: 10, y: 42 };
    const data = ['10', '42'];
    const actual = tryParseCoord(data).either(identity, identity);
    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'returns an object');
  }

  {
    const msg = 'returns an Err';
    const expected = /error/i;
    const data = ['10', 'foo'];
    const actual = tryParseCoord(data)
        .either(identity, () => 'no match');
    t.match(actual[0], expected, msg);
    t.ok(Array.isArray(actual), 'returns array of errors');

    {
      const data = ['bar', 'foo'];
      const actual = tryParseCoord(data)
          .either(identity, () => 'no match');
      t.match(actual[0], expected, msg);
      t.ok(Array.isArray(actual), 'returns array of errors');
    }

    {
      const data = ['foo'];
      const actual = tryParseCoord(data)
          .either(identity, () => 'no match');
      t.match(actual[0], expected, msg);
      t.ok(Array.isArray(actual), 'returns array of errors');
    }
  }

  t.end();
});
