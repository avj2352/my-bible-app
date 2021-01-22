import React, { FunctionComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// icons
import EditIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import MoveToTopIcon from '@material-ui/icons/VerticalAlignTop';
import PreviewIcon from '@material-ui/icons/ColorLens';
import ShareIcon from '@material-ui/icons/Share';

interface ITimerOptionProps {
  id: string;
  selected: boolean;
  onEdit: (item: string) => void;
  onDelete: (item: string) => void;
  onMoveToTop: (item: string) => void;
  onPreview: (item: string) => void;
  onShare: (item: string) => void;
};

interface ITimerOptions {
  selected: boolean;
  label: LABEL_OPTIONS;
  icon: JSX.Element;
  action: (item: string) => void;
}

export enum LABEL_OPTIONS {
  EDIT = 'Edit',
  DELETE = 'Delete',
  MOVE = 'Move to Top',
  PREVIEW = 'Preview',
  SHARE = 'Share',
};



const ITEM_HEIGHT = 48;

const TimerOptions: FunctionComponent<ITimerOptionProps> = (props)=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { id, selected, onEdit, onDelete, onMoveToTop, onPreview, onShare } = props;

  const handlePreview = (item: string) => {
    onPreview(item);
    handleClose();
  };

  const handleShare = (item: string) => {
    onShare(item);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (item: string) => {
    onEdit(item);
    handleClose();
  };

  const handleDelete = (item: string) => {
    onDelete(item);
    handleClose();
  };

  const handleSelected = (item: string) => {
    onMoveToTop(item);
    handleClose();
  }

  const options: ITimerOptions[] = [
    {
      selected: false,
      label: LABEL_OPTIONS.PREVIEW,
      icon: <PreviewIcon color='primary' />,
      action: handlePreview
    },
    {
      selected: false,
      label: LABEL_OPTIONS.SHARE,
      icon: <ShareIcon color='primary' />,
      action: handleShare
    },    
    {
      selected: selected,
      label: LABEL_OPTIONS.MOVE,
      icon: <MoveToTopIcon color='primary' />,
      action: handleSelected,
    },
    {
      selected: false,
      label: LABEL_OPTIONS.EDIT,
      icon: <EditIcon color='primary'/>,
      action: handleEdit,
    },
    {
      selected: false,
      label: LABEL_OPTIONS.DELETE,
      icon: <DeleteIcon color='primary'/>,
      action: handleDelete,
    },
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((item, index) => (
          <MenuItem
            disabled={item.selected}
            key={index} 
            onClick={item.action.bind(null,id)}>
            {item.icon}&nbsp;{item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TimerOptions;