import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// material
import Paper from '@material-ui/core/Paper';

export const useStyles = makeStyles(theme => ({
      paper: {
        maxWidth: 936,
        margin: '30px auto',
        overflow: 'hidden',
      },
      contentWrapper: {
        margin: '20px 16px',
      }, 
}));

const SimpleCard: FunctionComponent = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
              {props.children}
            </div>
          </Paper>
        </React.Fragment>
    );
};

export default SimpleCard;