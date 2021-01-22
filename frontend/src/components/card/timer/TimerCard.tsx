import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// custom
import DetailExpansionPanel from '../../panels/expansion/DetailExpansionPanel';
import TimerOptions from './../../options/timer/TimerOptions';
import CountdownSVG from './countdown/CountdownSVG';
import { useStyles } from './timer-card.styles';
import { formatDate } from './../../../common/helper/DateHelper';

export interface ITimerCardData {
    id: string;
    title: string;
    selected: boolean;
    description: string;
    date: Date;
    type: boolean;
    status: boolean;
    link: string;
};

interface ITimerCardProps extends ITimerCardData {
    onMoveToTop: (id: string, selected: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onPreview: (id: string) => void;
    onShare: (id: string) => void;
}


const TimerCard: FunctionComponent<ITimerCardProps> = (props) => {
    const classes = useStyles();
    const { title, description, date, selected, type, link, onDelete, onEdit, onMoveToTop, onPreview, onShare } = props;

    const handlePreview = (id: string) => {
        onPreview(id);
    };

    const handleShare = (id: string) => {
        onShare(id);
    };

    const handleEdit = (id: string) => {
        onEdit(id);
    };
    
    const handleDelete = (id: string) => {
        onDelete(id);
    };

    const handleMoveToTop = (id: string) => {
        onMoveToTop(id, true);
    }
    return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                <div className={classes.titleSection}>
                    <Typography color="textPrimary" variant="h6" >
                        {title}
                    </Typography>
                    <TimerOptions
                        selected={selected}
                        id={props.id} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        onMoveToTop={handleMoveToTop} 
                        onPreview={handlePreview}
                        onShare={handleShare}
                        />
                </div>
                <CountdownSVG until={date}/>
                <Typography color="secondary" align="center">
                    {type ? 'until': 'since'}, {formatDate(date)}
                </Typography>
                <DetailExpansionPanel description={description} link={link}/>
            </div>
          </Paper>
        </React.Fragment>
    );
};

export default TimerCard;