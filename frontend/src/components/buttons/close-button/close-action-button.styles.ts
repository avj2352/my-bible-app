import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({    
    card: {
      minWidth: 150,
      padding: 10
    },
    cardText: {
      color: theme.palette.primary.main,
      fontSize: 14
    },
    notificationButton: {
      color: 'white'
    }
  }));