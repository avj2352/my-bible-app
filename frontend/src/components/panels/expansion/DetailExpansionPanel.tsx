import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
        color: `#3a3a5a`,
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    colorPrimary: {
        color: theme.palette.primary.light,
    },
    colorSecondary: {
        color: theme.palette.secondary.main,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

interface IDetailExpansionPanelProps {
    description: string;
    link: string;
};


const DetailExpansionPanel: FunctionComponent<IDetailExpansionPanelProps> = (props) => {
  const { description, link } = props;  
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography paragraph>
              <strong className={classes.colorPrimary}>Description: </strong>{description}
              <br/>
              <br/>
              <strong className={classes.colorPrimary}>Link: </strong><a href={link} target="_blank">Click here</a>
            </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default DetailExpansionPanel;
