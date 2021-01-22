import React, { FunctionComponent } from 'react';
// material-ui
import { Button, ButtonGroup, Grid, makeStyles } from '@material-ui/core';

interface IRecipePanelProps {
    onPanelChange: (id: number) => void;
}


export const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
    },
    fullWidth: {
        width: '100%'
    },
    panel: {
        padding: '0 10px'
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const RecipePanel: FunctionComponent<IRecipePanelProps> = (props): JSX.Element => {
    const { onPanelChange } = props;
    const classes = useStyles();
    return <React.Fragment>
            <ButtonGroup className={classes.panel} color="primary" aria-label="outlined primary button group">
                <Button onClick={onPanelChange.bind(null, 1)}>Card</Button>
                <Button onClick={onPanelChange.bind(null, 2)}>List</Button>
            </ButtonGroup>
    </React.Fragment>;
};

export default RecipePanel;