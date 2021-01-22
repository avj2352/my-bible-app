import React, {FunctionComponent} from 'react';
import { useSnackbar } from 'notistack';
// material
import Button from '@material-ui/core/Button';
// custom
import { useStyles } from './notification.style';

interface ICloseActionButtonProps {
    keyObj: any;
}

// notificationBox action - OK
const CloseActionButton: FunctionComponent<ICloseActionButtonProps> = (props):JSX.Element => {
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