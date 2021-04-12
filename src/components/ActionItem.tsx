import { ReactNode, ReactElement } from 'react';
import { RenderItemParams } from '@atlaskit/tree';

import {
  Action,
  ClickAction,
  DragAction,
  MReleaseAction,
  WaitAction,
  types,
} from '../types';
import { ExpandIcon, RemovableItem } from '.';

import styles from './ActionItem.module.scss';


const Click = ({
  type,
  x,
  y,
}: ClickAction | DragAction) => (
  <>
    <span >
      {type}
    </span>
    <span >
      (x: {x}, y: {y})
    </span>
  </>
);

const MRelease = ({
  type,
}: MReleaseAction) => (
  <>
    <span >
      {type}
    </span>
  </>
);

const Wait = ({
  type,
  duration,
}: WaitAction) => (
  <>
    <span >
      {type}
    </span>
    <span >
      {duration}
    </span>
  </>
);


// row click handler
const handleClick = (
    setSelected: (ind: number) => void,
    i: number | null | undefined,
) => () => {
  if (typeof i === 'number') {
    setSelected(i);
  }
};


type signature = (
  selected: number | null | undefined,
  setSelected: (ind: number) => void,
  remove: (ind: number) => void,
  indexMap: Record<string, number>,
  // onExpand: (itemId: ItemId) => void,
  // onCollapse: (itemId: ItemId) => void,
) => ({
  item,
  onExpand,
  onCollapse,
  provided,
}: RenderItemParams) => ReactElement;

const ActionItem: signature = (
    selected,
    setSelected,
    remove,
    indexMap,
) => ({
  item,
  onExpand,
  onCollapse,
  provided,
}: RenderItemParams) => {
  const action: Action = item.data;
  const ind = indexMap[item.id];
  const isSelected = (selected === ind);
  let children: string | ReactNode = action.type;

  switch (action.type) {
    case types.CLICK:
      // intentional fallthrough
    case types.MDRAG:
      children = Click(action);
      break;

    case types.MRELEASE:
      children = MRelease(action);
      break;

    case types.WAIT:
      children = Wait(action);
      break;
  }

  children = RemovableItem({
    selected: isSelected,
    remove: () => remove(ind),
    children,
  });

  const rowModifier: string = (isSelected)
          ? styles.row__selected
          : '';
  const className = [styles.row, rowModifier].join(' ');

  return (
    <div
      className={className}
      onClick={handleClick(setSelected, ind)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {ExpandIcon(item, onExpand, onCollapse)}
      {children}
    </div>
  );
};

export default ActionItem;
