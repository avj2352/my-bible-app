import React, { FunctionComponent } from 'react';
import { Avatar, Chip, makeStyles, Theme, Tooltip } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TheatersIcon from '@material-ui/icons/Theaters';

interface IYoutubeBadgeProps {
    link: string;
}

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

const YoutubeBadge: FunctionComponent<IYoutubeBadgeProps> = (props): JSX.Element => {
    const { link } = props;
    // styles
    const classes = useStyles();
    const toolTipClasses = useStylesBootstrap();
    
    return <React.Fragment>
        <Tooltip
            title="Watch on Youtube"
            arrow
            placement="top"
            classes={toolTipClasses}>
            <Chip
                icon={<YouTubeIcon/>}
                label="Youtube link"
                clickable
                onClick={()=>{window.open(link);}}
                color="secondary"/>
        </Tooltip>
    </React.Fragment>;
}

export default YoutubeBadge;