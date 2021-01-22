import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardActions, CardContent, Fab, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 175,
    },
    fullWidth: {
        width: '100%'
    },
    cardContent: {
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
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
    box: {
        width: '100%'
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    fab: {
        margin: '0 10px'
    }
}));

const RecipeFormSkeleton: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid item xs={12} md={12}>
                        <Skeleton>
                            <Typography className={classes.fullWidth} 
                                variant="h5" component="h2">Loading Text Title. 
                                This is a long text,
                                This might take some time...</Typography>
                        </Skeleton>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton>
                            <Typography className={classes.fullWidth} 
                                variant="h5" component="h2">Loading Text Title.</Typography>
                        </Skeleton>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton>
                            <Typography className={classes.fullWidth} 
                                variant="h5" component="h2">Loading Text Title. 
                                This might take some time...</Typography>
                        </Skeleton>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton>
                            <Typography className={classes.fullWidth} 
                                variant="h5" component="h2">Loading Text Title. 
                                This is a long text,
                                This might take some time...</Typography>
                        </Skeleton>
                    </Grid>
                    <Skeleton variant="rect" className={classes.box} height={200}/>
                </CardContent>
                <CardActions className={classes.action}>
                    <Skeleton variant="rect" width={140} height={40} />
                </CardActions>
            </Card>
        </Grid>
        );
};

export default RecipeFormSkeleton;