import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        marginTop: '5px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: '50px'
    },
    rowCenter: {
        width: '100%',
        padding: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    cardContent: {
        width: '90%',
        marginTop: '30px',
        alignSelf: 'center'
    },
    tabContent: {
        width: '60%',
        marginTop: '30px',
        alignSelf: 'center'
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));