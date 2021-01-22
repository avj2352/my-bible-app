import React, {useState, useContext, FunctionComponent, useEffect, useCallback} from 'react';
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
import {addGroupDetails} from "../../../common/async/AsyncCalls";
// custom

const useStyles = makeStyles({
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

interface IGroupCreateProps {
    onCreateGroup: (action: string) => void;
}

const GroupCreate: FunctionComponent<IGroupCreateProps> = (props) => {
    const classes = useStyles();
    const { onCreateGroup } = props;
    // state
    const [groupTitle, setGroupTitle] = useState('');
    const [groupSlug, setGroupSlug] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [isChecked, setCheckBox] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>('');

    // lifecycle events
    const resetAllFields = useCallback(() => {
        setGroupTitle('');
        setGroupSlug('');
        setGroupDescription('');
        setCheckBox(false);
    },[]);

    // event handlers
    const handleCheckboxChange = (name: string) => (event: any) => {
        setCheckBox(event.target.checked);
    };

    const handleChange = (event: any) => {
        if (event.target.name === 'title') {
            setGroupTitle(event.target.value);
        } else if (event.target.name === 'slug') {
            setGroupSlug(event.target.value.toLowerCase());
        } else {
            setGroupDescription(event.target.value);
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        if(groupTitle && groupDescription && groupSlug) {
            setLoading(true);
            // console.log('Input data is: ', groupTitle, groupSlug, groupDescription, isChecked);
            addGroupDetails({
                title: groupTitle.trim(),
                slug: groupSlug.trim(),
                description: groupDescription,
                premium: isChecked
            })
                .then((res: any) => {
                    resetAllFields();
                    return onCreateGroup('success');
                })
                .catch((err: any) => onCreateGroup('failure'))
                .finally(()=> setLoading(false));
        }
    };

    const errorMsgText = () => <Typography className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        if (groupTitle !== '' && groupSlug !== '' && groupDescription !=='' ) setErrMsg(null);
        else setErrMsg(`Please fill in missing fields`);
    },[groupTitle, groupSlug, groupDescription]);

    // render
    return (
        <Grid item xs={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography  variant="h5" component="h2">Create New Group / Category</Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        All Fields are required to be filled in*
                    </Typography>
                    {errorMsgText()}
                    <LinearLoader display={isLoading}/>
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        label="Group Title"
                        name="title"
                        value = {groupTitle}
                        autoFocus
                        onChange={handleChange}/>
                    <TextField
                        margin="normal"
                        required
                        id="slug"
                        label="slug (lowercase)"
                        name="slug"
                        value = {groupSlug}
                        autoFocus
                        onChange={handleChange}/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        name="description"
                        label="Provide Description"
                        type="description"
                        value = {groupDescription}
                        onChange={handleChange}/>
                    <div className={classes.checkBoxContent}>
                        <Checkbox
                            checked={isChecked}
                            onChange={handleCheckboxChange('checkedA')}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }} />
                        <Typography className={classes.checkBoxText} variant="button" component="em">
                            Check if the Group is only for Signed in Users
                        </Typography>
                    </div>
                </CardContent>
                <CardActions className={classes.action}>
                    <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium" color="primary">Create Group</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GroupCreate;