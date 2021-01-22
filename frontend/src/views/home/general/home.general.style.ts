import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    avatar: {
        position: 'relative',
        transform: 'translate(0)',
        transition: 'opacity 0.8s ease',
        opacity: '0',
        width: '60%',
        maxWidth: 200,
        height: '200px',
        borderRadius: '10px',
        boxShadow: theme.shadows[3]
    },
    boxTop: {
        marginTop: 12
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    group: {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    debug: {
        border: '1px solid red'
    },
    container: {
        marginTop: '5%'
    },
    box: {
        padding: 5,
        borderRadius: '10px',
        height: 180
    },
    smallBox: {
        padding: 5,
        width: '80%',
        borderRadius: '10px',
        height: 180
    },
    item: {
        padding: 5
    },
    footerText: {
      marginTop: 120
    },
    [theme.breakpoints.between("xs","md")]: {
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            transition: 'opacity 0.8s ease',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)',
            opacity: '0',
            width: '150%',
            maxWidth: 200,
            minWidth: 175,
            height: '190px',
            borderRadius: '10px',
            boxShadow: theme.shadows[3]
        },
        smallBox: {
            width: '40%',
        },
        container: {
            marginTop: '5%'
        },
        boxTop: {
            marginTop: 20
        },
        footerText: {
            marginTop: 20,
            marginBottom: 40
        }
    },
    [theme.breakpoints.up("md")]: {
        avatar: {
            transition: 'opacity 0.8s ease',
            position: 'relative',
            left: 0,
            transform: 'translate(0px)',
            opacity: '0',
            width: '150%',
            maxWidth: 200,
            minWidth: 175,
            height: '190px',
            borderRadius: '10px',
            boxShadow: theme.shadows[3]
        },
        container: {
            marginTop: '0',
        },
        smallBox: {
            display: 'flex',
            width: '80%',
            justifyContent: 'flex-end'
        }
    },
}));