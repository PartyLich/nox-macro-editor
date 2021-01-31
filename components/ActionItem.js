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


type Props = Action;

const ActionItem = (action: Props, ind: number) => {
  let children = action.type;
  switch (action.type) {
    case types.CLICK:
    case types.MDRAG:
    case types.MRELEASE:
    case types.WAIT:
      children = actionMap[action.type](action);
      break;
  }
  // TODO: generate unique id for every action...somewhere
  const id = `${ ind }`;

  return (
    <li
      className={ styles.row }
      key={id}
    >
      {children}
    </li>
  );
};

export default ActionItem;
