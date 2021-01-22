import React, { FunctionComponent } from 'react';
import { useSnackbar } from 'notistack';
// material
import Button from '@material-ui/core/Button';
// custom
import { useStyles } from './close-action-button.styles';


// notificationBox action - OK
const CloseActionButton:FunctionComponent<any> = props => {
    const classes = useStyles();
    const { keyObj } = props;
    const { closeSnackbar }  = useSnackbar();
    return (
        <React.Fragment>        
            <Button className={classes.notificationButton} onClick={() => { closeSnackbar(keyObj) }}>
                OK
            </Button>
        </React.Fragment>
    );
};

export default CloseActionButton;