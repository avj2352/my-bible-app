import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
// custom
import { IGroup } from "../common/group-interfaces";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@material-ui/core";
import {LinearLoader} from "../../../components/loaders/linear-loader/LinearLoader";
import {updateGroupById} from "../../../common/async/AsyncCalls";

interface IGroupModalProps {
    isOpen: boolean;
    data: IGroup;
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

const GroupUpdateModal: FunctionComponent<IGroupModalProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { isOpen, data } = props;
    // states
    const [groupTitle, setGroupTitle] = useState('');
    const [groupSlug, setGroupSlug] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [isChecked, setChecked] = useState(data.premium);
    const [isLoading, setLoading] = useState(false);
    const [tagId, setTagId] = useState(data.id);
    const [errMsg, setErrMsg] = useState<string | null>('');

    // event handlers
    const handleClose = ()=>{
        props.onModalClose(false, 'cancel');
    };

    const handleCheckboxChange = (evt: any) => {
        setChecked(evt.target.checked);
    };

    const handleSubmit = () => {
        setLoading(true);
        // console.log('Change details are: ', groupTitle, groupDescription, groupSlug, isChecked);
        if(groupTitle && groupDescription && groupSlug) {
            setLoading(true);
            updateGroupById(data.id, {
                title: groupTitle.trim(),
                slug: groupSlug.trim(),
                description: groupDescription,
                premium: isChecked
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
        if (event.target.name === 'title') {
            setGroupTitle(event.target.value);
        } else if (event.target.name === 'slug') {
            setGroupSlug(event.target.value.toLowerCase());
        } else {
            setGroupDescription(event.target.value);
        }
    };

    const getErrorMsgText = (): JSX.Element => <Typography
        className={classes.validationText} component="p">
        {errMsg}
    </Typography>;

    useEffect(()=>{
        if (groupTitle !== '' && groupSlug !== '' && groupDescription !=='' ) setErrMsg(null);
        else setErrMsg(`Please fill in missing fields`);
    },[groupTitle, groupSlug, groupDescription]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Update Group Details"}</DialogTitle>
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
                    label="Group Title"
                    name="title"
                    defaultValue = {data.title}
                    autoFocus
                    onBlur={handleChange}/>
                <TextField
                    margin="normal"
                    required
                    id="slug"
                    label="slug (lowercase)"
                    name="slug"
                    defaultValue = {data.slug}
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
                <div className={classes.checkBoxContent}>
                    <Checkbox
                        checked = {isChecked}
                        onChange={handleCheckboxChange}
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }} />
                    <Typography
                        className={classes.checkBoxText}
                        variant="button"
                        component="em">
                        Check if the Group is only for Signed in Users
                    </Typography>
                </div>
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

export default  GroupUpdateModal;