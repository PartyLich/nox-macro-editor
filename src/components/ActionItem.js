// @flow
import React, { type Node } from 'react';
import {
  Draggable,
} from 'react-beautiful-dnd';

import type {
  Action,
  ActionType,
  ClickAction,
  DragAction,
  MReleaseAction,
  WaitAction,
} from '../actions';
import { types } from '../actions';
import { RemovableItem } from '.';

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

const actionMap: {[ActionType]: function} = {
  [types.WAIT]: Wait,
  [types.CLICK]: Click,
  [types.MRELEASE]: MRelease,
  [types.MDRAG]: Click,
};

// row click handler
const handleClick = (setSelected: (number) => void, i: ?number) => () => {
  if (typeof i === 'number') {
    setSelected(i);
  }
};


type Props = Action;
type signature = (
    selected: ?number,
    setSelected: (number) => void,
    remove: (number) => void,
) => ((action: Props, ind: number) => Node);

const ActionItem: signature = (selected, setSelected, remove) =>
  (action, ind) => {
    const isSelected = (selected === ind);
    let children = action.type;

    switch (action.type) {
      case types.CLICK:
      case types.MDRAG:
      case types.MRELEASE:
      case types.WAIT:
        children = RemovableItem({
          selected: isSelected,
          remove: () => remove(ind),
          children: actionMap[action.type](action),
        });
        break;
    }
    const rowModifier = (isSelected)
          ? styles.row__selected
          : '';
    const className = [styles.row, rowModifier].join(' ');
    const id = action.id;

    return (
      <Draggable
        key={id}
        draggableId={id}
        index={ind}
      >
        {(provided) => (
          <li
            className={className}
            onClick={handleClick(setSelected, ind)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
          </li>
        )}
      </Draggable>
    );
  };

export default ActionItem;
