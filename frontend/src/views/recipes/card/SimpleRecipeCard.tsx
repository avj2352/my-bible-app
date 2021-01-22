import React, { FunctionComponent } from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
// custom
import {IRecipe} from "../common/recipe-interfaces";
import SimpleBadge from "../../../components/badges/simple/SimpleBadge";
import { getSubText } from "../../../common/util/HelperFunctions";
import { CardActionArea } from "@material-ui/core";
import SmallBadge from "../../../components/badges/simple/SmallBadge";

interface ISimpleRecipeCardProps extends IRecipe {
    onView: (id: string) => void;
}

//styles
export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    row: {
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
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    chip: {
        margin: theme.spacing(1),
    },
    pos: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 18
    },
    smallText: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 12,
        color: theme.palette.primary.dark
    },
    action: {
        display: 'flex',
        // border: '1px solid red',
        justifyContent: 'space-between'
    },
    fab: {
        margin: '0 10px'
    }
}));

const SimpleRecipeCard: FunctionComponent<ISimpleRecipeCardProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { title, content, group, onView } = props;
    const createdBy = props.createdBy ? props.createdBy : null;
    const id = props.id? props.id: '';
    const tags: any[] = props.tags? props.tags : [];

    const tagContent = tags.length > 0 && tags.map((item: any, index: number) => <SimpleBadge key={index} name={item.name} description={item.description} />);

    return  <Grid item xs={12} md={4}>
        <Card className={classes.card}>
                 <CardActionArea onClick={()=>onView(id)}>
            <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">{title}</Typography>
                    <Typography className={classes.pos} component="p">
                        {getSubText(content)}
                    </Typography>
            </CardContent>
                </CardActionArea>
                <div className={classes.row}>
                    {tagContent}
                </div>
            <CardActions className={classes.action}>
                <SmallBadge name={group.title} description={group.description} color={'primary'}/>
                <Button
                    variant="contained"
                    color="primary"
                    aria-label="read"
                    onClick={()=>onView(id)}>
                     View...
                </Button>
            </CardActions>
        </Card>
    </Grid>
}

export default SimpleRecipeCard;