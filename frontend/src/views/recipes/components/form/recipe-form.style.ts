import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(11),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.secondary.main
    },
    autocomplete: {
        marginTop: 25,
        marginBottom: 25
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    debug: {
        border: '1px solid red'
    },
    card: {
        minWidth: 175,
        marginTop: 5,
        marginBottom: 25
    },
    checkBoxContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    checkBoxText: {
        position: 'relative',
        top: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        textAlign: 'left',
        marginBottom: 12,
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    validationText: {
        color: 'red'
    }
}));