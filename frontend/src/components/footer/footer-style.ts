import { makeStyles } from '@material-ui/core/styles';
export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    appBar: {
        // border:'1px solid red',
        top: 'auto',
        bottom: 0,
        display: 'flex',
        position: "fixed",      
        width:'100%',
        flexGrow: 1,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },    
    hide: {
        display: 'none',
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    grow: {
      flexGrow: 1,
    },
    dashboardButton: {
        margin: '0 5px'
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    notificationButton: {
      color: 'white'
    }
}));