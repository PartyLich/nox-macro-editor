import * as React from 'react';
import { ReactElement } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';

import { ActionItem } from '.';
import { Action } from '../types';

import styles from './ActionList.module.scss';


type Props = {
  actions: Array<Action>;
  selected: number | null | undefined;
  setSelected: (ind: number) => void;
  reorder: (from: number, to: number) => void;
  remove: (ind: number) => void;
};

type signature = (props: Props) => ReactElement;

const ActionList: signature = ({
  actions = [],
  selected,
  setSelected,
  reorder,
  remove,
}) => {
  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    reorder(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper elevation={3} className={styles.container}>
        <Droppable
          droppableId="list"
          type="ACTION"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className={styles.list}>
                {actions.map(ActionItem(selected, setSelected, remove))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable >
      </Paper>
    </DragDropContext>
  );
};

export default ActionList;
