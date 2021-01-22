import React, {useState, useContext, FunctionComponent, useEffect, createRef} from 'react';
// material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import ResetIcon from '@material-ui/icons/Cached';
// custom
import {ISearch} from "./search-interface";

// interface
interface ISearchCardProps extends ISearch {
    onSearch: (data: ISearch) => void;
    onReset: () => void;
}

// styles
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

const SearchCard: FunctionComponent<ISearchCardProps> = (props) => {
    const classes = useStyles();
    const { table, onSearch, onReset } = props;
    // state
    const [groupQuery, setGroupQuery] = useState('');
    const [isDisabled, toggleDisabled] = useState(true);
    const [isPartial, togglePartial] = useState(false);
    const buttonRef = createRef<any>();
    // event handlers

    const handleChange = (event: any) => {
        if (event.target.name === 'query') {
            setGroupQuery(event.target.value);
        }
        // buttonRef.current.focus();
    };

    const toggleSearchType = () => {
        togglePartial((prev) => !prev);
    }

    const handleSubmit = () => isPartial ?
        onSearch ({table, type: 'partial', query: groupQuery}): onSearch ({table, type: 'full',
            query: groupQuery
        });

    const handleReset = () => {
        setGroupQuery('');
        onReset();
    }


    useEffect(()=>{
        if (groupQuery !== '') toggleDisabled(false);
        else toggleDisabled(true);
    },[groupQuery]);

    // render
    return (
        <Grid item xs={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="query"
                        label={`Search ${table}`}
                        name="query"
                        value = {groupQuery}
                        autoFocus
                        onChange={handleChange}/>
                </CardContent>
                <CardActions className={classes.action}>
                    <Fab
                        size="small"
                        title="Clear search"
                        ref={buttonRef}
                        onClick={handleReset}
                        color={isPartial ? 'secondary': 'primary'}
                        aria-label="Enable partial search">
                        <ResetIcon />
                    </Fab>
                    <Fab
                        size="small"
                        title={`${isPartial ? `Disable`: `Enable`} partial search`}
                        ref={buttonRef}
                        onClick={toggleSearchType}
                        color={isPartial ? 'secondary': 'primary'}
                        aria-label="Enable partial search">
                        <TextFormatIcon />
                    </Fab>
                    <Fab
                        ref={buttonRef}
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

export default SearchCard;