import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ItemBadgeModal from '../badges/item-badge/ItemBadgeModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        margin: '5px 0',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '&>div': {
          margin: 5
        }
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

interface IRecipeAccordianProps {
    date: string;
    author: string;
    items: any[] | null;
}

const RecipeAccordian: FunctionComponent<IRecipeAccordianProps> = (props):JSX.Element => {
    const { date, author, items } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

  // event handlers
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const parseDateString = (data: string) => {
      const currDate: Date = new Date(data);
      return `${currDate.getDate()}/${currDate.getMonth()+1}/${currDate.getFullYear()}`;
  }

  const itemsContent = items && items.length > 0 && items.map((item: any, index: number) => <ItemBadgeModal key={index} name={item.name} description={item.description} html={item.html}/>);
  const itemDiv = itemsContent && <div className={classes.row}>
                    <Typography className={classes.root}>
                      <strong>Key Ingredients:</strong>
                    </Typography>
                    {itemsContent}
                  </div>;

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'recipePanel'} onChange={handleChange('recipePanel')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="recipePanelbh-content"
          id="recipePanelbh-header">
          <Typography className={classes.heading}>Additional Info</Typography>          
        </AccordionSummary>
        <AccordionDetails className={classes.column}>
          <Typography>
            <strong>Created by: </strong> {author}
          </Typography>
          <Typography className={classes.root}>
            <strong>Created on: </strong> {parseDateString(date)}
          </Typography>
          {itemDiv}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RecipeAccordian;