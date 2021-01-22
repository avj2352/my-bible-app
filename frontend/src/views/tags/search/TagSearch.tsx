import React, {useState, useContext, FunctionComponent, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {LinearLoader} from "../../../components/loaders/linear-loader/LinearLoader";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
// custom

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: 175,
        marginTop: 10
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1
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
});

interface ITagSearchProps {
    onSearchTag: (action: string) => void;
}

const TagSearch: FunctionComponent<ITagSearchProps> = (props) => {
    const classes = useStyles();

    // state
    const [tagTitle, setTagTitle] = useState('');
    const [isDisabled, toggleDisabled] = useState(true);
    // event handlers

    const handleChange = (event: any) => {
        console.log('Event is: ', event.target);
        if (event.target.name === 'title') {
            setTagTitle(event.target.value);
        }
    };

    const handleSubmit = () => {
        if(tagTitle) {
            console.log('Input data is: ', tagTitle);
        }
    };

    useEffect(()=>{
        if (tagTitle !== '') toggleDisabled(false);
        else toggleDisabled(true);
    },[tagTitle]);

    // render
    return (
        <Grid item xs={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="title"
                        label="Search Tag"
                        name="title"
                        defaultValue = {tagTitle}
                        autoFocus
                        onBlur={handleChange}/>
                </CardContent>
                <CardActions className={classes.action}>
                    <Fab
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        color="secondary"
                        aria-label="add">
                        <SearchIcon />
                    </Fab>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default TagSearch;