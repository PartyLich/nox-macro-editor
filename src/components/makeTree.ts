import {
  ItemId,
  TreeItem,
  TreeData,
} from '@atlaskit/tree';

import { Action, types } from '../types';


// map an Action to a TreeItem
const actionToTreeItem = (isExpanded: boolean) =>
  (action: Action): TreeItem => ({
    id: action.id,
    children: [],
    data: action,
    isExpanded,
  });


// map and reduce Array<Action> to a TreeData structure
const makeTree = (
    actions: Array<Action>,
    expandMap: Record<string, boolean>,
): TreeData => {
  const baseTree: TreeData = {
    rootId: '1',
    items: {
      '1': {
        id: '1',
        children: [],
        isExpanded: true,
        isChildrenLoading: false,
      },
    },
  };

  // nesting state
  const { rootId } = baseTree;
  const parentStack = [rootId];

  return actions.reduce((tree, action) => {
    const parentId: ItemId = parentStack[parentStack.length - 1];
    const parent = tree.items[parentId];
    parent.children.push(action.id);
    parent.hasChildren = true;

    switch (action.type) {
      case types.CLICK:
        parentStack.push(action.id);
        break;

      case types.MDRAG:
        // single nesting level for drags
        if (parentId === rootId) {
          parentStack.push(action.id);
        }
        break;

      case types.MRELEASE:
        if (parentStack.length > 1) {
          parentStack.pop();
        }
        break;

      default:
    }

    tree.items = {
      ...tree.items,
      [action.id]: actionToTreeItem(expandMap[action.id])(action),
    };

    return tree;
  }, baseTree);
};

export default makeTree;
