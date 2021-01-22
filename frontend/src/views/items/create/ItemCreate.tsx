import React, {useState, useContext, FunctionComponent, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {LinearLoader} from "../../../components/loaders/linear-loader/LinearLoader";
import ClassicEditor from '../../../components/editor/ClassicEditor';
import { ItemInterface } from '../common/item-interface';
import { addNewItem } from '../../../common/async/AsyncCalls';


const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    editorContainer: {
        width: '100%',
        minWidth: 200,
        border: '1px solid red'
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

interface IItemCreateProps {
    onCreateItem: (action: string) => void;
}

const ItemCreate: FunctionComponent<IItemCreateProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { onCreateItem } = props;
    // state
    const [itemData, setItemData] = useState<ItemInterface>({
        name: '',
        description: '',
        html: ''
    });
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>('');

    // Lifecycle methods
    const resetAllFields = useCallback(()=>{
        setItemData({
            name: '',
            description: '',
            html: ''
        })
    },[]);

    const handleTitleChange = (event: any) => {
        setItemData((prev: ItemInterface) => {return {...prev, name: event.target.value}});
    };

    const handleSubmit = () => {
        setLoading(true);
        const { name, description, html } = itemData;
        if(name && description && html ) {
            addNewItem({name, description, html})
                .then((res: any) => {
                    resetAllFields();
                    return onCreateItem('success');
                })
                .catch((err: any) => onCreateItem('failure'))
                .finally(()=> setLoading(false));
        }
    };

    const handleEditorChange = (text: string, html: string) => {
        setItemData((prev: ItemInterface) => {return {...prev, description: text, html }});
    }
    

    const errorMsgText = () => <Typography className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        if (itemData.name !== '' && itemData.description !=='' ) setErrMsg(null);
        else setErrMsg(`Please fill in missing fields`);
    },[itemData]);

    // render
    return (
        <Grid item xs={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography  variant="h5" component="h2">Create New Item / Category</Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        All Fields are required to be filled in*
                    </Typography>
                    {errorMsgText()}
                    <LinearLoader display={isLoading}/>
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        label="Item Title"
                        name="title"
                        value = {itemData.name}
                        autoFocus
                        onChange={handleTitleChange}/>
                        <ClassicEditor placeholder={'Enter Item Description!'} onEditorChange={handleEditorChange}/>
                </CardContent>
                <CardActions className={classes.action}>
                    <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium" color="primary">Create Item</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ItemCreate;