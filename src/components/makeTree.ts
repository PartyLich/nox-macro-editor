import {
  ItemId,
  TreeItem,
  TreeData,
} from '@atlaskit/tree';

import { Action, types } from '../types';


// map an Action to a TreeItem
const actionToTreeItem = (action: Action): TreeItem => ({
  id: action.id,
  children: [],
  data: action,
});


// map and reduce Array<Action> to a TreeData structure
const makeTree = (actions: Array<Action>): TreeData => {
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
  let parentId: ItemId = rootId;

  return actions.reduce((tree, action) => {
    const parent = tree.items[parentId];
    parent.children.push(action.id);
    parent.hasChildren = true;

    switch (action.type) {
      case types.CLICK:
        parentId = action.id;
        break;

      case types.MDRAG:
        // single nesting level for drags
        if (parentId === rootId) {
          parentId = action.id;
        }
        break;

      case types.MRELEASE:
        parentId = rootId;
        break;

      default:
    }

    tree.items = {
      ...tree.items,
      [action.id]: actionToTreeItem(action),
    };

    return tree;
  }, baseTree);
};

export default makeTree;
