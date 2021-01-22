import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      // border: '1px solid red',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '99%',
      height: '90%'
    },
    imageIcon: {
      borderRadius: 10,
      width: '150px',
      marginBottom: 10,
      boxShadow: theme.shadows[3]
    },
    title: {
      marginBottom: 30
    },
    paper: {
      position: 'relative',
      opacity: 0,
      top: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 270,
      margin: 20,
      overflow: 'hidden',
    },
    socialBtn: {
      margin: '10px 0',
      padding: `10px 20px`
    },
    fontIcon: {
      fontSize: 30,
    },
    contentWrapper: {
      // border: '1px solid green',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '40px 16px',
    },
    footer: {
      justifySelf: 'flex-end',
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20,
      maxWidth: 275,
      marginBottom: 15
    },
    footerText: {
      fontSize: '0.8rem',
      '&>a': {
          color: theme.palette.secondary.main,
          textDecoration: 'none',
          '&:hover': {
              textDecoration: 'underline'
          }
      }
    },
    [theme.breakpoints.between(270,414)]: {
      imageIcon: {
        borderRadius: 10,
        width: '75px',
        marginBottom: 0,
        boxShadow: theme.shadows[3]
      },
      footer: {
        justifySelf: 'flex-end',
        padding: 0,
        maxWidth: 275
      },
    },
  }));