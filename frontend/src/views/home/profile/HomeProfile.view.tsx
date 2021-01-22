import React, {FunctionComponent, useEffect, useState} from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
// styles
import appLogo from './../../../assets/img/logo.png';
import { useStyles } from './home.profile.style';
import Avatar from "@material-ui/core/Avatar";
import {IAppContextState, useGlobalState} from "../../../common/context/AppContext";
import {SimpleCardOverview} from "../cards/SimpleCardOverview";
import SearchIcon from "@material-ui/icons/Search";

interface IHomeProfileViewProps {
    isAdmin: boolean;
}

const HomeProfileView: FunctionComponent<IHomeProfileViewProps> = (props): JSX.Element => {
    // context
    const { isAdmin } = props;
    // states
    const [groupContent, setGroupContent] = useState<JSX.Element>(<React.Fragment/>);
    // styles
    const classes = useStyles();
    const imageRef: any = React.createRef();

    // dependencies
    useEffect(()=>{
        if (isAdmin) setGroupContent (
            <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'Groups'} link={'groups'} btnLabel={'Add / Edit Groups'}>
                        Click here to add / edit groups
                    </SimpleCardOverview>
                </Grid>
        );
    },[isAdmin]);

    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.group}>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'New Recipe'} link={'newRecipes'} btnLabel={'Create New...'}>
                        Create a new Recipe
                    </SimpleCardOverview>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'All Recipes'} link={'listRecipes'} params={'all'}>
                        List all the free, public recipes
                    </SimpleCardOverview>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'My Recipes'} link={'myRecipes'} params={'my'} btnLabel={'View My Recipes'}>
                        Click here to view your recipes
                    </SimpleCardOverview>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.group}>
            <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'Tags'} link={'tags'} btnLabel={'Add / Edit Tags'}>
                        Click here to add / edit tags
                    </SimpleCardOverview>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SimpleCardOverview title={'Items'} link={'items'} btnLabel={'Add / Edit Items'}>
                        Click here to add / edit items
                    </SimpleCardOverview>
                </Grid>
                {groupContent}
            </Grid>
        </React.Fragment>
    );
}

export default HomeProfileView;