import test from 'tape';

import { isLeft } from 'fp-ts/Either';

import {
  splitLines,
  splitPipes,
  splitSeparators,
  tryTokenToObj,
  tryParseAction,
  tryParseCoord,
  tryParseInt,
} from '../src/nox-serializer/deserialize';


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

test('tryParseAction()', (t) => {
  {
    const data = 'MULTI:1:0:360:640';
    const expected = {
      id: true,
      type: 'CLICK',
      x: 360,
      y: 640,
    };
    const result = tryParseAction(data);

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = {
        ...result.right,
        id: !!result.right.id,
      };

      t.equal(typeof result.right, 'object', 'returns an object');
      t.deepEqual(actual, expected, 'parses click Action from string');
    }
  }

  {
    const data = 'MULTI:1:2:342:666';
    const expected = {
      id: true,
      type: 'MDRAG',
      x: 342,
      y: 666,
    };
    const result = tryParseAction(data);

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = {
        ...result.right,
        id: !!(result.right.id),
      };

      t.equal(typeof result.right, 'object', 'returns an object');
      t.deepEqual(actual, expected, 'parses drag Action from string');
    }
  }

  {
    const data = 'MSBRL:0:0';
    const expected = {
      id: true,
      type: 'MRELEASE',
    };
    const result = tryParseAction(data);

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = {
        ...result.right,
        id: !!(result.right.id),
      };

      t.equal(typeof result.right, 'object', 'returns an object');
      t.deepEqual(actual, expected, 'parses release Action from string');
    }
  }

  {
    const data = [
      'foobar:0:0:321:435',
      null,
      0,
    ];

    for (const datum of data) {
      // @ts-expect-error intentional bad data
      const result = tryParseAction(datum);

      if (isLeft(result)) {
        const actual = result.left;
        t.ok(Array.isArray(actual), 'returns array of error messages');
      } else {
        t.fail('expected a Left, received Right');
      }
    }
  }

  t.end();
});

test('tryTokenToObj()', (t) => {
  {
    const expected = /unable to parse action: /;
    const data: Array<string> = [];
    const result = tryTokenToObj(data);

    if (isLeft(result)) {
      const actual = result.left;
      t.match(actual[0], expected, 'returns Err with < 5 tokens');
    } else {
      t.fail('expected a Left, received Right');
    }
  }

  {
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
    const data = [
      '0',
      `${ resX }`,
      `${ resY }`,
      'MULTI:1:0:360:640',
      `${ time }`,
    ];
    const result = tryTokenToObj(data);

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = result.right;
      const actualAction = {
        ...actual[1],
        // existence only check for random id
        id: !!(actual[1].id),
      };

      t.ok(Array.isArray(actual), 'returns array');
      t.equal(actual.length, 3, 'returns tuple length 3');
      t.deepEqual(result.right[0], expected[0], 'parses time from string');
      t.deepEqual(actualAction, expected[1], 'parses Action from string');
      t.deepEqual(result.right[2], expected[2], 'parses Coord from string');
    }
  }

  t.end();
});

test('tryParseInt()', (t) => {
  {
    const expected = 10;
    const result = tryParseInt('10');

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = result.right;
      t.equal(typeof actual, 'number', 'returns a number');
      t.equal(actual, expected, `expected the parsed value ${ expected }`);
    }
  }

  {
    const result = tryParseInt('foo');

    if (isLeft(result)) {
      const actual = result.left;
      t.ok(Array.isArray(actual), 'returns array of errors');
      t.match(actual[0], /error/i, 'left contains error description(s)');
    } else {
      t.fail('expected a Left, received Right');
    }
  }

  t.end();
});

test('tryParseCoord()', (t) => {
  {
    const expected = { x: 10, y: 42 };
    const data = ['10', '42'];
    const result = tryParseCoord(data);

    if (isLeft(result)) {
      t.fail('expected a Right, received Left');
    } else {
      const actual = result.right;
      t.equal(typeof actual, 'object', 'returns an object');
      t.deepEqual(actual, expected, 'parses a Coord from string');
    }
  }

  {
    const cases = [
      ['10', 'foo'],
      ['bar', 'foo'],
      ['foo'],
    ];

    for (const datum of cases) {
      const result = tryParseCoord(datum);

      if (isLeft(result)) {
        const actual = result.left;
        t.ok(Array.isArray(actual), 'returns array of errors');
        t.match(actual[0], /error/i, 'left contains error description(s)');
      } else {
        t.fail('expected a Left, received Right');
      }
    }
  }

  t.end();
});
