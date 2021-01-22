import { fade, makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    root: {
    },
    appBar: {
      // border:'1px solid red',
      display: 'flex',
      position: "fixed",      
      width:'100%',
      flexGrow: 1,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    search: {
      // border:'1px solid red',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        width: '200px',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '80%',
      [theme.breakpoints.up('sm')]: {
        width: '100px',
      },
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
      
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
    sideButton: {
      position:'fixed',
      right:0,
      marginRight: 0,
      justifySelf:'flex-end'
    },
    sideButton02: {
      position:'fixed',
      right:60,
      marginRight: 0,
      justifySelf:'flex-end'
    },
    hide: {
      display: 'none',
    }    
}));