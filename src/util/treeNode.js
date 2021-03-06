// @flow
export type options<T> = {
  data?: any,
  // data?: ?T,
  parent?: ?TreeNode<T>,
  children?: Array<TreeNode<T>>,
  ...
};

export interface TreeNode<T: mixed> {
  data: T,
  children: Array<TreeNode<T>>,
  constructor: (options<T>) => TreeNode<T>,
  map: <B>((T) => B) => TreeNode<B>,
  reduce: <B>((B, T) => B, B) => B,
  toString: () => string,
  toArray: () => Array<T>,
}

const treeNode = <T>({
  data = null,
  parent = null,
  children = [],
}: options<T> = {}): TreeNode<T> => {
  // apply a function to the data at each node in this tree
  const map = <B>(fn: (T) => B): TreeNode<B> => {
    if (typeof fn !== 'function') {
      throw new TypeError('TreeNode: map expected a function as its argument');
    }

    const mappedData = fn(data);
    const mappedChildren = children.map((node) => node.map(fn));

    return treeNode({
      data: mappedData,
      children: mappedChildren,
    });
  };

  // fold out a value out by applying a reducer function to each node in this
  // tree
  // expects a binary reducer function and an initial accumulator value
  const reduce = <B>(fn: (B, T) => B, initial: B): B => {
    if (typeof fn !== 'function') {
      throw new TypeError('TreeNode: reduce expected a binary function as its argument');
    }

    return toArray().reduce(fn, initial);
  };

  // returns a string representation of this TreeNode
  const toString = (): string => `TreeNode ${
    JSON.stringify(data)
  } ${
    JSON.stringify(children.map((a) => a.toString()))
  }`;

  // returns an array of the data at each node in this tree
  const toArray = (): Array<T> => {
    return [data].concat(children.map((a) => a.toArray())).flat();
  };

  return {
    data,
    children,
    map,
    reduce,
    toArray,
    toString,
    constructor: treeNode,
  };
};

export default treeNode;
