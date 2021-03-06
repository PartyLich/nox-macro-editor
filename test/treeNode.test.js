// @flow
import test from 'tape';

import TreeNode from '../src/util/treeNode';


const module = 'TreeNode';
const subtest = (msg) => `${ module }::${ msg }`;

const identity = (a) => a;
const double = (a) => a * 2;
const inc = (a) => a + 1;

const makeTree = (a: number = 1) => TreeNode({
  data: a,
  children: [
    TreeNode({ data: a }),
    TreeNode({
      data: a,
      children: [
        TreeNode({ data: a }),
      ],
    }),
  ],
});

test(subtest('toString is a function'), (t) => {
  const msg = `toString is a function`;
  const expected = 'function';
  const actual = typeof TreeNode().toString;
  t.equal(actual, expected, msg);

  t.end();
});

test(subtest('is a functor'), (t) => {
  {
    const msg = `map is a function`;
    const expected = 'function';
    const actual = typeof TreeNode().map;
    t.equal(actual, expected, msg);
  }

  {
    const msg = `identity property`;
    const expected = TreeNode({ data: 'foo' });
    const actual = expected.map(identity);
    t.deepEqual(actual.toArray(), expected.toArray(), msg);
    console.log('ident a:', actual.toString());
    console.log('ident e:', expected.toString());
  }

  {
    const msg = `composition`;
    const expected = TreeNode({ data: 1 }).map((x) => inc(double(x)));
    const actual = TreeNode({ data: 1 })
        .map(double)
        .map(inc);
    t.deepEqual(actual.toArray(), expected.toArray(), msg);
  }

  {
    const msg = `map with children`;
    const expected = makeTree(42);
    const actual = makeTree(21).map(double);

    t.deepEqual(actual.toArray(), expected.toArray(), msg);
  }

  {
    const msg = `throws if argument is not a function`;
    const expected = /TypeError.*map expected/;
    // $FlowExpectedError[incompatible-call]
    const actual = () => makeTree().map(null);

    t.throws(actual, expected, msg);
  }

  t.end();
});
