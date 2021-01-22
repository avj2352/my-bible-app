import React, { FunctionComponent, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      outline: 'none',
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 2),
    },
  }),
);

interface ISimpleModalProps {
    title: string;
    open: boolean;
    onClose: ()=>void;
}

const SimpleModal: FunctionComponent<ISimpleModalProps> = (props)=>{
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  // side-effects
  useEffect(()=>{
    // console.log('Modal state: ', props.open);
    setOpen(props.open);
  },[props]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.title}</h2>
            <div id="transition-modal-description">
                {props.children}
            </div>
            <Button variant="text" onClick={handleClose}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SimpleModal;


