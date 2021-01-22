import React, {FunctionComponent, useEffect, useState} from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DisabledBadge from "../../badges/disabled/DisabledBadge";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import {CardMedia} from "@material-ui/core";
// custom
import noResultsImg from './../../../assets/img/broke.png';


interface IEmptySearchCardProps {
    query?: string;
    type: 'search' | 'empty' | 'error';
}

//styles
export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 175,
    },
    media: {
        width: '50%',
        minWidth: 250,
        height: 0,
        paddingTop: '56.25%', // 16:9
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
        marginBottom: 12
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
        justifyContent: 'flex-end'
    },
    fab: {
        margin: '0 10px'
    }
}));


const EmptySearchCard: FunctionComponent<IEmptySearchCardProps>= (props): JSX.Element => {
    const classes = useStyles();
    const { query, type } = props;
    // event handlers
    const getContent = (type: 'search' | 'empty' | 'error', query?: string):JSX.Element => {
        if (type === 'empty') {
            return <Typography className={classes.pos} component="p">
                Sorry but there is currently nothing to see here. How about you add some content ?
            </Typography>
        } else if (type === 'search') {
            return <Typography className={classes.pos} component="p">
                Sorry but your search { query ? ` "${query}" `: "" } yielded nothing. Try again!
            </Typography>
        } else {
            return <Typography className={classes.pos} component="p">
                Oops! There is nothing to see here. Try again or go to the main menu...
            </Typography>
        }
    }
    // states
    const [content, setContent] = useState<JSX.Element>(getContent('empty'));

    // componentDidUpdate
    useEffect(()=>{
        setContent(getContent(type, query));
    },[type, query]);

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={noResultsImg}
                    title="Nothing found"
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">Oops! Nothing found...</Typography>
                    {content}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default EmptySearchCard;