import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'none'
    },
    display: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },    
    progress: {
      margin: theme.spacing(2),
    },
  }));