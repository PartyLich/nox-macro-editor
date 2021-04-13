import { ReactElement, useState, useEffect } from 'react';
import Tree, {
  mutateTree,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree';
import Paper from '@material-ui/core/Paper';
import ReactMarkdown from 'react-markdown';

import { ActionItem, makeTree } from '.';
import { Action } from '../types';

import styles from './ActionList.module.scss';


const mapIndices = (actions: Array<Action>): Record<string, number> =>
  actions.reduce((map: Record<string, number>, { id }, ind) => {
    map[id] = ind;
    return map;
  }, {});

type Props = {
  actions: Array<Action>;
  selected: number | null | undefined;
  setSelected: (ind: number) => void;
  reorder: (from: number, to: number) => void;
  remove: (ind: number) => void;
  md: string;
};

type signature = (props: Props) => ReactElement;

const ActionList: signature = ({
  actions = [],
  selected,
  setSelected,
  reorder,
  remove,
  md,
}) => {
  const [expandMap, setExpandMap] = useState<Record<string, boolean>>({});
  const [tree, setTree] = useState<TreeData>(makeTree(actions, expandMap));
  const [indexMap, setIndexMap] = useState(mapIndices(actions));

  // reset local state if actions prop changes
  useEffect(
      () => {
        setTree(makeTree(actions, expandMap));
        setIndexMap(mapIndices(actions));
      },
      [actions],
  );

  const handleDragEnd = (
      source: TreeSourcePosition,
      destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    // tree indexes are relative to parent.
    // get absolute index
    const from = source.index;
    const to = destination.index === undefined ? from : destination.index;
    const sourceId = tree.items[source.parentId].children[from];
    const destinationId = tree.items[destination.parentId].children[to];

    reorder(indexMap[sourceId], indexMap[destinationId] || to);
  };

  const setExpand = (isExpanded: boolean) => (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded }));
    setExpandMap({
      ...expandMap,
      [itemId]: isExpanded,
    });
  };

  const onExpand = setExpand(true);
  const onCollapse = setExpand(false);

  return (
    <Paper elevation={3} className={styles.container}>
      {!actions.length && <ReactMarkdown children={md} /> }
      <Tree
        {...{
          tree,
          renderItem: ActionItem(
              selected,
              setSelected,
              remove,
              indexMap,
          ),
          offsetPerLevel: 8,
          onDragEnd: handleDragEnd,
          onExpand,
          onCollapse,
        }}
        isDragEnabled
      />
    </Paper>
  );
};

export default ActionList;
