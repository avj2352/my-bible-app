import React, {FunctionComponent, useEffect, useState} from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
// custom
import { ItemInterface } from "../common/item-interface";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { LinearLoader } from "../../../components/loaders/linear-loader/LinearLoader";
import { updateItemById, updateTagById } from "../../../common/async/AsyncCalls";
import ClassicEditor from "../../../components/editor/ClassicEditor";

interface ItemInterfaceModalProps {
    isOpen: boolean;
    data: ItemInterface;
    onModalClose: (status: boolean, value: 'success' | 'failure' | 'cancel') => void;
}

export const useStyles = makeStyles(theme => ({
    validationText: {
        color: 'red'
    },
    pos: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 18
    },
    checkBoxText: {
        position: 'relative',
        top: '10px'
    },
    checkBoxContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
}));

const ItemUpdateModal: FunctionComponent<ItemInterfaceModalProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { isOpen, data } = props;
    
    const id = data.id ? data.id : '';
    // states
    const [itemData, setItemData] = useState<ItemInterface>({
        name: '',
        description: '',
        html: ''
    });
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>('');

    // event handlers
    const handleClose = ()=>{
        props.onModalClose(false, 'cancel');
    };

    const handleSubmit = () => {
        setLoading(true);
        // console.log('Change details are: ', groupName, groupDescription, groupSlug, isChecked);
        if(itemData.name && itemData.description) {
            // console.log('Updated value is: ', id, itemData.name, itemData.description, itemData.html);
            setLoading(true);
            updateItemById(id, {
                name: itemData.name,
                description: itemData.description,
                html: itemData.html
            })
                .then( res => {
                    setLoading(false);
                    props.onModalClose(false, 'success');
                }, err => {
                    setLoading(false);
                    console.log('Error updating tag record: ', err);
                    props.onModalClose(false, 'failure');
                });
        }
        setLoading(false);
    };

    const handleNameChange = (event: any) => {
        setItemData((prev: ItemInterface) => {return {...prev, name: event.target.value}});
    };

    const handleEditorChange = (text: string, html: string) => {
        setItemData((prev: ItemInterface) => {return {...prev, description: text, html }});
    };

    const getErrorMsgText = (): JSX.Element => <Typography
        className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        // console.log('Modal value is: ', itemData);
        if (itemData.name !== '' && itemData.description !=='' ) setErrMsg(null);
        else setErrMsg(`Please fill in missing fields`);
    },[itemData]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Update Tag Details"}</DialogTitle>
            <DialogContent>
                <Typography className={classes.pos} color="textSecondary">
                    All Fields are required to be filled in*
                </Typography>
                {getErrorMsgText()}
                <LinearLoader display={isLoading}/>
                <TextField
                    margin="normal"
                    required
                    id="title"
                    label="Item Name"
                    name="name"
                    defaultValue = {data.name}
                    autoFocus
                    onBlur={handleNameChange}/>
                <ClassicEditor placeholder={data.html} onEditorChange={handleEditorChange}/>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={!!errMsg}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary">
                    Update
                </Button>
                <Button
                    onClick={handleClose.bind('cancel')}
                    color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default ItemUpdateModal;