import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {    
    width: '100%',
    position:'relative',
    top:'5vh',    
    display:'flex',
    justifyContent:'center',    
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),    
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: '100%',      
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }  

}));