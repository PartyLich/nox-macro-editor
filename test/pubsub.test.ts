import test from 'tape';

import pubsub, { noop } from '../src/pubsub';


test('pubsub()', (t) => {
  {
    const msg = 'subscribe() should return a function';
    const caster = pubsub();

    const expected = 'function';
    const actual = typeof caster.subscribe(noop);
    t.equal(actual, expected, msg);
  }

  {
    const msg = `publish value`;
    const caster = pubsub<string>();
    const actual: Array<string> = [];
    const value = 'foo';

    const notify = (x: string) => actual.push(x);

    const unsub = caster.subscribe(notify);
    caster.publish(value);

    const expected = [value];
    t.deepEqual(actual, expected, msg);

    {
      const msg = `unsubscribes`;
      unsub();
      caster.publish('bar');
      t.deepEqual(actual, expected, msg);
    }
  }

  {
    const msg = `publish to multiple subscribers`;
    const caster = pubsub<string>();
    const subA: Array<string> = [];
    const subB: Array<string> = [];
    const value1 = 'foo';
    const value2 = 'bar';

    caster.subscribe((x) => subA.push(x));
    caster.subscribe((x) => subB.push(x));

    caster.publish(value1);
    caster.publish(value2);

    const expected = [value1, value2];
    t.deepEqual(subA, expected, msg);
    t.deepEqual(subB, expected, msg);
  }

  {
    const msg = `unsubscribe with multiple subscribers`;
    const caster = pubsub<string>();
    const subA: Array<string> = [];
    const subB: Array<string> = [];
    const value1 = 'foo';
    const value2 = 'bar';

    const unsubA = caster.subscribe((x) => subA.push(x));
    caster.subscribe((x) => subB.push(x));

    caster.publish(value1);
    unsubA();
    caster.publish(value2);

    const expectedA = [value1];
    const expectedB = [value1, value2];
    t.deepEqual(subA, expectedA, msg);
    t.deepEqual(subB, expectedB, msg);
  }

  t.end();
});
