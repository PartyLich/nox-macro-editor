import { ReactNode, ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
  Action,
  ClickAction,
  DragAction,
  MReleaseAction,
  WaitAction,
  types,
} from '../types';
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


// row click handler
const handleClick = (
    setSelected: (ind: number) => void,
    i: number | null | undefined,
) => () => {
  if (typeof i === 'number') {
    setSelected(i);
  }
};


type Props = Action;

type signature = (
  selected: number | null | undefined,
  setSelected: (ind: number) => void,
  remove: (ind: number) => void
) => (action: Props, ind: number) => ReactElement;

const ActionItem: signature = (selected, setSelected, remove) =>
  (action, ind) => {
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
