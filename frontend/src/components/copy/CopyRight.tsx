import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
footerText: {
fontSize: '0.8rem'
}
}));



const Copyright: FunctionComponent<any> = ()=>{
  const classes = useStyles();
  return (
  <React.Fragment>
    <Typography className={classes.footerText} variant="body2" color="textSecondary" align="center">
      {'Time-Travel © '}
      Template courtesy Material-UI Paperbase{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  </React.Fragment>
  );
  };

  export default Copyright;