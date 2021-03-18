// @flow
import test from 'tape';

import {
  clickLine,
  mdragLine,
  mreleaseLine,
} from '../src/nox-serializer/serialize';
import {types} from '../src/actions'


test('clickLine()', (t) => {
  {
    const msg = 'serialize click action to Nox macro format';
    const expected = '0ScRiPtSePaRaToR900|1600|MULTI:1:0:207:1360ScRiPtSePaRaToR1';
    const resolution = { x: 900, y: 1600 };
    const time = 1;
    const action = { id: '', type: types.CLICK, x: 207, y: 1360 };
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
    const action = { id: '', type: types.MDRAG, x: 519, y: 1226 };
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
