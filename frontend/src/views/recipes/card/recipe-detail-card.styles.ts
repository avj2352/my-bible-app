import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        margin: '10px 0px',
        width: '100%'
    },
    rowSeparate: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    rowItems: {
        padding: 5,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '&>div': {
            margin: 5
        },
        '&>div:nth-child(1)': {
            marginLeft: 0
        }
    },
    htmlContent: {
        width: '100%'
    }
}));