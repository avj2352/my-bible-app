import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
footerText: {
    fontSize: '0.8rem',
    '&>a': {
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}
}));



const LoginButton: FunctionComponent<any> = ()=>{

  const classes = useStyles();
  return (
  <React.Fragment>
    <Typography className={classes.footerText} variant="body2" color="textSecondary" align="center">
      <RouterLink to="/login">Click here to Login</RouterLink>
    </Typography>
  </React.Fragment>
  );
  };

export default LoginButton;