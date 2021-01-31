// @flow
import React from 'react';

import type {
  Action,
  ActionType,
  ClickAction,
  DragAction,
  MReleaseAction,
  WaitAction,
} from '../src/actions.js';
import { types } from '../src/actions.js';

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

const ActionItem = (selected: ?number, setSelected: (number) => void) =>
  (action: Props, ind: number) => {
    let children = action.type;
    switch (action.type) {
      case types.CLICK:
      case types.MDRAG:
      case types.MRELEASE:
      case types.WAIT:
        children = actionMap[action.type](action);
        break;
    }
    const rowModifier = (selected === ind)
          ? ` ${ styles.row__selected }`
          : '';
    // TODO: generate unique id for every action...somewhere
    const id = `${ ind }`;

    return (
      <li
        className={ styles.row + rowModifier }
        key={id}
        onClick={handleClick(setSelected, ind)}
      >
        {children}
      </li>
    );
  };

export default ActionItem;
