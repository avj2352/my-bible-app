import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    top: {
        marginTop: 12
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
    [theme.breakpoints.between("xs","md")]: {
        smallBox: {
            width: '40%',
        },
        container: {
            marginTop: '5%'
        }
    },
    [theme.breakpoints.up("md")]: {
        container: {
            marginTop: '0'
        }
    },
}));