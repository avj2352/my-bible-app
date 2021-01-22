import { makeStyles } from '@material-ui/core/styles';

const BORDER_THICKNES = `4px`;

export const useStyles = makeStyles(theme => ({
    titleSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    paper: {
        borderLeft: `${BORDER_THICKNES} solid ${theme.palette.secondary.main}`,
        maxWidth: 936,
        margin: '30px auto',
        overflow: 'hidden',
    },
    contentWrapper: {
      margin: '20px 16px',
    }, 
}));
