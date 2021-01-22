import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    fullWidth: {
        width: '100%'
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
        marginBottom: 12,
        fontSize: 18
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    fab: {
        margin: '0 10px'
    }
}));

const TagListSkeleton: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Skeleton>
                        <Typography variant="h5" component="h2">Loading Text Title, please...</Typography>
                    </Skeleton>
                    <Skeleton>
                        <Typography className={classes.pos} component="p">
                            Loading Text subtitle..
                        </Typography>
                    </Skeleton>
                </CardContent>
                <CardActions className={classes.action}>
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="circle" width={40} height={40} />
                </CardActions>
            </Card>
        </Grid>
        );
};

export default TagListSkeleton;