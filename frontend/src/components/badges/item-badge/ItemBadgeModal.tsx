import React, { FunctionComponent, useEffect, useState } from 'react';
// material
import { 
    Avatar,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    RootRef,
    Theme,
    Tooltip,
    Typography 
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
// custom
import { ItemInterface } from '../../../views/items/common/item-interface';
import { getSubText } from '../../../common/util/HelperFunctions';

//styles
const useStylesBootstrap = makeStyles((theme: Theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    }
}));

export const useStyles = makeStyles(theme => ({
    content: {
        width: '100%'
    },
    pos: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 18
    },
    checkBoxText: {
        position: 'relative',
        top: '10px'
    },
    checkBoxContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
}));


const ItemBadgeModal: FunctionComponent<ItemInterface> = (props): JSX.Element => {
    const { name, description, html } = props;
    const classes = useStyles();
    const toolTipClasses = useStylesBootstrap();
    const domRef = React.useRef(document.createElement('div'));
    // states
    const [isOpen, toggleOpen] = useState<boolean>(false);
    // event handlers
    const toggleModal = () => toggleOpen(prev => !prev);
    
    const createMarkup = () => {
        return {__html: html};
    };

    return <React.Fragment>
        <Tooltip
            title={getSubText(description)}
            arrow
            placement="top"
            classes={toolTipClasses}>
            <Chip
                avatar={<Avatar><FastfoodIcon/></Avatar>}
                label={name}
                clickable
                onClick={toggleModal}
                color="primary"/>
        </Tooltip>
        <Dialog
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
            <DialogContent>
                <div className={classes.content} dangerouslySetInnerHTML={createMarkup()}>            
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={toggleModal}
                    color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>;
};

export default ItemBadgeModal;