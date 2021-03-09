// @flow
import test from 'tape';

import TreeNode from '../src/util/treeNode';


const module = 'TreeNode';
const subtest = (msg) => `${ module }::${ msg }`;

const identity = (a) => a;
const double = (a) => a * 2;
const inc = (a) => a + 1;

const sum = (a, b) => a + b;

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

test(subtest('toString'), (t) => {
  {
    const msg = `toString is a function`;
    const expected = 'function';
    const actual = typeof TreeNode().toString;
    t.equal(actual, expected, msg);
  }

  {
    const msg = `toString returns a string`;
    const expected = 'string';
    const actual = typeof makeTree().toString();
    t.equal(actual, expected, msg);
  }

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
    console.log('composition a:', actual.toString());
    console.log('composition e:', expected.toString());
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

test(subtest('is a foldable'), (t) => {
  {
    const msg = `reduce is a function`;
    const expected = 'function';
    const actual = typeof TreeNode().reduce;
    t.equal(actual, expected, msg);
  }

  {
    const msg = `sum reduces to 4`;
    const expected = 4;
    const actual = makeTree().reduce(sum, 0);
    t.equal(actual, expected, msg);
    console.log('sum a:', actual.toString());
    console.log('sum e:', expected.toString());

    {
      const msg = `sum reduces to 10`;
      const tree = TreeNode({
        data: 1,
        children: [
          TreeNode({
            data: 3,
            children: [
              TreeNode({ data: 4 }),
            ],
          }),
          TreeNode({ data: 2 }),
        ],
      });
      const expected = 10;
      const actual = tree.reduce(sum, 0);
      t.equal(actual, expected, msg);
      console.log('sum a:', actual.toString());
      console.log('sum e:', expected.toString());
    }
  }

  t.end();
});
