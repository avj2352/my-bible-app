import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    display: {
      display: 'block'        
    }
}));

export interface ILinearLoaderProps {
  display: boolean;
}

export const LinearLoader: FunctionComponent<ILinearLoaderProps> = (props) => {
  const { display } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, display && classes.display)}>
      <LinearProgress color="secondary" />
      <br />      
    </div>
  );
};