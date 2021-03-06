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
  const map = (node) => (fn) => {
  };

  const toString = () => ``;

  const toArray = (node) => () => {
  };

  const reduce = (node) => (fn, initial) => {
  };

  return {
    data,
    children,
    map: map(this),
    reduce: reduce(this),
    toArray: toArray(this),
    toString,
    constructor: treeNode,
  };
};

export default treeNode;
