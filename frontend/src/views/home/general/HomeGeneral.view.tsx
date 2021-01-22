import React, {FunctionComponent} from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
// styles
import appLogo from './../../../assets/img/logo.png';
import { useStyles } from './home.general.style';
import Avatar from "@material-ui/core/Avatar";
import {IAppContextState, useGlobalState} from "../../../common/context/AppContext";
import {SimpleCardOverview} from "../cards/SimpleCardOverview";
import SearchIcon from "@material-ui/icons/Search";

const HomeGeneralView: FunctionComponent = (props): JSX.Element => {
    // styles
    const classes = useStyles();    
    const imageRef: any = React.createRef();

    const handleLoading = () => {
        if (imageRef.current) imageRef.current.style.opacity = '1';
    };

    return (
        <React.Fragment>
            <Grid item xs={12} md={4} className={classes.column}>
                <Box className={classes.smallBox}>
                    <Avatar ref={imageRef} alt="app-logo" src={appLogo} onLoad={handleLoading} className={classes.avatar}/>
                </Box>
            </Grid>
            <Grid item xs={12} md={8} className={classes.boxTop}>
                <Typography>
                    Welcome to the <strong>Book.Of.Recipes.Easily.Done</strong>. <br/>
                    A web application to create, store & share
                    recipes among friends &amp; family.
                </Typography>
                <Typography className={classes.boxTop}>
                    You can open this web app on your browser &amp; it can also be saved on your mobile device to work as
                    a native application. Also, after signing up, you will be able to - create (write) your own recipes, which
                    you can save for your own reference or share with the world.
                </Typography>
                <Typography className={classes.boxTop} color="secondary">
                    This application is completely free to use &amp; is ad-free!
                </Typography>

            </Grid>
            <Grid item xs={12} className={classes.group}>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'Sign In'} link={'login'} btnLabel={'Sign In'}>
                        Sign in with your Google Account
                    </SimpleCardOverview>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'All Recipes'} link={'allRecipes'}>
                        List all the free, public recipes
                    </SimpleCardOverview>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'About'} link={'about'} btnLabel={'About the app'}>
                        News, Features...
                    </SimpleCardOverview>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default HomeGeneralView;