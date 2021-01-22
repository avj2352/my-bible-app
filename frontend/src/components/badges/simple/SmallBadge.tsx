import React, {FunctionComponent, useState} from 'react';
// material
import {Theme} from "@material-ui/core/styles";
import {Avatar, Chip, makeStyles, Tooltip} from "@material-ui/core";
//styles
const useStylesBootstrap = makeStyles((theme: Theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    }
}));

interface ISmallBadgeProps {
    name: string;
    description: string;
    color?: 'primary' | 'secondary';
}

const SmallBadge: FunctionComponent<ISmallBadgeProps> = (props): JSX.Element => {
    const classes = useStylesBootstrap();
    const { name, description, color } = props;
    
    return <React.Fragment>
        <Tooltip
            title={description}
            arrow
            placement="top"
            classes={classes}>
            <Chip
                size="small"
                label={name}
                clickable/>
        </Tooltip>
    </React.Fragment>
}

export default SmallBadge;