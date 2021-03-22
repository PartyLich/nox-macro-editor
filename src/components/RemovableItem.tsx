import * as React from 'react';
import { ReactNode } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


type Props = {
  selected: boolean;
  remove: () => void;
  children: ReactNode | null | undefined;
};

type signature = (props: Props) => ReactNode;

const RemovableItem: signature = ({
  selected = false,
  remove,
  children,
}) => {
  const handleClick = (e: React.SyntheticEvent) => {
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
