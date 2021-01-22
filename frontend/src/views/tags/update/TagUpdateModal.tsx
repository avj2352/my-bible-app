import React, {FunctionComponent, useEffect, useState} from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
// custom
import { ITag } from "../common/tag-interfaces";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { LinearLoader } from "../../../components/loaders/linear-loader/LinearLoader";
import { updateTagById } from "../../../common/async/AsyncCalls";

interface ITagModalProps {
    isOpen: boolean;
    data: ITag;
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

const TagUpdateModal: FunctionComponent<ITagModalProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { isOpen, data } = props;
    // states
    const [groupName, setTagName] = useState('');
    const [groupDescription, setTagDescription] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>('');

    // event handlers
    const handleClose = ()=>{
        props.onModalClose(false, 'cancel');
    };

    const handleSubmit = () => {
        setLoading(true);
        // console.log('Change details are: ', groupName, groupDescription, groupSlug, isChecked);
        if(groupName && groupDescription) {
            setLoading(true);
            updateTagById(data.id, {
                name: groupName.trim(),
                description: groupDescription,
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

    const handleChange = (event: any) => {
        if (event.target.name === 'name') {
            setTagName(event.target.value);
        } else {
            setTagDescription(event.target.value);
        }
    };

    const getErrorMsgText = (): JSX.Element => <Typography
        className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        if (groupName !== '' && groupDescription !=='' ) setErrMsg(null);
        else setErrMsg(`Please fill in missing fields`);
    },[groupName, groupDescription]);

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
                    label="Tag Name"
                    name="name"
                    defaultValue = {data.name}
                    autoFocus
                    onBlur={handleChange}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    name="description"
                    label="Provide Description"
                    type="description"
                    defaultValue = {data.description}
                    onBlur={handleChange}/>
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

export default TagUpdateModal;