import React, { FunctionComponent, useState } from 'react';
// material
import { Button, Dialog, DialogContent, DialogTitle, Divider, Fab, IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import CopyIcon from '@material-ui/icons/FileCopy';

interface IShareButtonProps {
    link: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    highlight: {
        color: theme.palette.secondary.main
    }
}));

const ShareButton: FunctionComponent<IShareButtonProps> = (props): JSX.Element => {
    const { link } = props;
    const classes = useStyles();
    // states
    const [copyText, setCopyText] = useState<string>('');
    const [isOpen, toggleOpen] = useState<boolean>(false);
    // event handlers
    const handleCopy = () => {
        navigator.clipboard.writeText(`${link}`).then(()=>{
            /* clipboard successfully set */
            setCopyText('Copied to clipboard !!');
        });
    };

    return <React.Fragment>
        <Dialog
            open={isOpen}
            onClose={() => toggleOpen((prev: boolean) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Share link"}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" component="p" paragraph>
                    <span className={classes.highlight}>To share, copy the link from the below field.</span><br/>
                    <small><em>If you are using an Android phone / on Chrome -</em></small> <br/>
                    <small><em>Click on copy-to-clipboard icon</em></small>
                </Typography>
                <Paper component="form" className={classes.root}>
                    <InputBase fullWidth className={classes.input} defaultValue={link}/>      
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton onClick={handleCopy} color="secondary" className={classes.iconButton} aria-label="copy-to-clipboard">
                        <CopyIcon />
                    </IconButton>
                </Paper>
                <p className={classes.highlight}>{copyText}</p>
            </DialogContent>
        </Dialog>
        <IconButton
            color="secondary"
            aria-label="share"
            onClick={() => toggleOpen((prev: boolean) => !prev)}>
            <ShareIcon />
        </IconButton>
    </React.Fragment>;
}

export default ShareButton;