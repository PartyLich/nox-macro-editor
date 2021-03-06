// @flow
const treeNode = ({
  data = null,
  parent = null,
  children = [],
} = {}) => {
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
