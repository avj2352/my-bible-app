import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        marginTop: '3%'
    },
    heading: {
        // border: '1px solid red',
        textAlign: 'center'
    },
    [theme.breakpoints.between(270,414)]: {
        container: {
            width: '92%'
        },
        heading: {
            fontSize: '0.7rem'
        }
    },
}));