import { ReactElement } from 'react';
import {
  TreeItem,
  ItemId,
} from '@atlaskit/tree';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';


const hasChildren = (item: TreeItem) =>
  (item.children && item.children.length > 0);

const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
): ReactElement => {
  if (hasChildren(item)) {
    return item.isExpanded
        ? (
          <IconButton
            aria-label="collapse"
            color="secondary"
            onClick={() => onCollapse(item.id)}
            size="small"
          >
            <UnfoldLessIcon fontSize="small" />
          </IconButton>
        )
          : (
          <IconButton
            aria-label="expand"
            color="secondary"
            onClick={() => onExpand(item.id)}
            size="small"
          >
            <UnfoldMoreIcon fontSize="small" />
          </IconButton>
          );
  }

  return (
    <RemoveIcon
      color="secondary"
      fontSize="small"
    />
  );
};

export default getIcon;
