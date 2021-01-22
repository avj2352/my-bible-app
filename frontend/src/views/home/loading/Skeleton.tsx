import React, { FunctionComponent } from 'react';
import { useStyles } from './skeleton.style';
import {Box, Grid} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export const HomeSkeletonLoading: FunctionComponent = (props):JSX.Element => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} md={3} className={classes.column}>
                <Box className={classes.smallBox}>
                    <Skeleton variant="rect" width={'100%'} height={'100%'} animation="wave"/>
                </Box>
            </Grid>
            <Grid item xs={12} md={9}>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
            </Grid>
            <Grid item xs={12} className={`${classes.column} ${classes.top}`}>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
                <Skeleton variant="text" className={classes.item} width={'100%'} animation="wave"/>
            </Grid>
            <Grid item xs={12} className={`${classes.row} ${classes.top}`}>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Skeleton variant="rect" width={'100%'} height={'100%'} animation="wave"/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Skeleton variant="rect" width={'100%'} height={'100%'} animation="wave"/>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};