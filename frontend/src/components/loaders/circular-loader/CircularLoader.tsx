import React, { FunctionComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import classnames from 'clsx';
import { useStyles } from './circular-loader-styles';


export interface ICircularLoaderProps {
  display: boolean;
}

export const CircularLoader: FunctionComponent<ICircularLoaderProps> = (props) => {

  const classes = useStyles();
  const displayLoader = classnames(classes.root, { [classes.display]: props.display });

  return (
    <div className = {displayLoader} >
      <CircularProgress className={classes.progress} color="secondary" />
      <Typography component="p">Loading...</Typography>
    </div>
  );
};
