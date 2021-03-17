// @flow
import React, { type Node } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


type Props = {
  selected: boolean,
  remove: () => void,
  children: ?Node,
};

type signature = (Props) => Node;

const RemovableItem: signature = ({
  selected = false,
  remove,
  children,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    remove();
  };

  return (
    <>
      {children}
      {selected &&
          <IconButton
            aria-label="delete"
            color="secondary"
            edge="end"
            onClick={handleClick}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
      }
    </>
  );
};

export default RemovableItem;
