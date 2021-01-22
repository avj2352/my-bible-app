import { CssBaseline, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { searchByText } from '../../../common/async/AsyncCalls';
import EmptySearchCard from '../../../components/card/404/EmptySearchCard';
import { ISearch } from '../../../components/search/search-interface';
import SearchCard from '../../../components/search/SearchCard';
import { DASHBOARD_ROUTES, useDashboardRouteDispatch } from '../../../layouts/dashboard/router/DashboardRouterContext';
import GroupListSkeleton from '../../groups/loading/GroupListSkeleton';
import SimpleRecipeCard from '../card/SimpleRecipeCard';
// custom
import { useStyles } from './recipe-search.styles';

const RecipeSearchView: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    const dispatchDashboard: any = useDashboardRouteDispatch();
    const getInitialContent = (): JSX.Element => {
        return <div className={classes.rowCenter}>
           <Typography>
                    Search Recipes by their title or by their content.
            </Typography>
        </div>;
    };
    // states
    const [recipeListContent, setRecipeListContent] = useState<JSX.Element>(getInitialContent());
     // lifecycle methods
     const defaultCardContent = (): JSX.Element => {
        return <React.Fragment>
            <GroupListSkeleton/>
            <GroupListSkeleton/>
            <GroupListSkeleton/>
        </React.Fragment>;
    };

    // event handlers
    const handleView = (id: string) => {
        console.log('Card detail to see: ', id);
        dispatchDashboard ({
            type: DASHBOARD_ROUTES.PREVIEW_RECIPE,
            payload: id
        });
    };

    const handleRecipeSearch = (data: ISearch) => {
        setRecipeListContent(defaultCardContent());
        searchByText(data)
        .then((res: any) => {
            console.log('Search result is: ', res.data);
            if (res.data.length > 0) {
                const list: JSX.Element[] = res.data?.map((el: any, index:number) => <SimpleRecipeCard
                    key={index}
                    onView={handleView}
                    id = {el._id}
                    title = {el.title}
                    link = {el.link}
                    isPrivate = {el.isPrivate}
                    content = {el.content}
                    html = {el.html}
                    group = {el.group}
                    createdBy = {el.createdBy}
                    tags = {el.tags}
                    items = {el.items}
                    timers = {el.timers}
                    />
                );
                setRecipeListContent(<React.Fragment>
                    {list}
                </React.Fragment>);
            } else {
                setRecipeListContent(<EmptySearchCard type="search" query={data.query}/>);
            }
        })
        .catch((err: any) => {
            console.log('Error fetching: ', err);
            setRecipeListContent(<EmptySearchCard type="search" query={data.query}/>);
        });
    };

    const handleSearchReset = () => {
        setRecipeListContent (getInitialContent());
    };

    return <Grid container spacing={1} className={classes.rowCenter}>
        <SearchCard table="recipes" onSearch={handleRecipeSearch} onReset={handleSearchReset}/>
        {recipeListContent}
    </Grid>
};

export default RecipeSearchView;