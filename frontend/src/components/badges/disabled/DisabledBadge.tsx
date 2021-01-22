import React, { FunctionComponent } from 'react';
// material
import {makeStyles} from "@material-ui/core/styles";
import {Chip} from "@material-ui/core";

interface IDisabledBadgeProps {
    value: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

const DisabledBadge: FunctionComponent<IDisabledBadgeProps> = (props): JSX.Element =>{
    const classes = useStyles();
    const { value } = props;

    return (
        <div className={classes.root}>
            <Chip variant="outlined" color="secondary" label={value} className={classes.chip} />
        </div>
    );
};

export default DisabledBadge;

