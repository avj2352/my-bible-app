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
        margin: 10,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}
}));

interface ISimpleLinkButtonProps {
    link: string;
}

const SimpleLinkButton: FunctionComponent<ISimpleLinkButtonProps> = (props):JSX.Element=>{
  const classes = useStyles();
  const { link, children } = props;
  return (
    <React.Fragment>
        <Typography className={classes.footerText} variant="body2" color="textSecondary" align="center">
            <RouterLink to={link}>{children}</RouterLink>
        </Typography>
    </React.Fragment>
  );
};

export default SimpleLinkButton;