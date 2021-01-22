import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { CssBaseline, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
// custom
import { getAllPublicRecipes, getAllRecipesByGroupId } from '../../../common/async/AsyncCalls';
import RecipeListSkeleton from '../loading/RecipeListSkeleton';
import { useStyles } from './recipe-list.view.styles';
import EmptySearchCard from '../../../components/card/404/EmptySearchCard';
import SimpleRecipeCard from '../card/SimpleRecipeCard';
import { DASHBOARD_ROUTES, useDashboardRouteDispatch } from '../../../layouts/dashboard/router/DashboardRouterContext';
import RecipePanel from './panels/RecipePanel';
import {mapChronologicalList, RecipeCollection} from '../components/collection/RecipeCollection';


const RecipeListView: FunctionComponent = (props): JSX.Element => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatchDashboard: any = useDashboardRouteDispatch();
    // default card content
    const defaultCardContent = (): JSX.Element => {
        return <React.Fragment>
            <RecipeListSkeleton/>
            <RecipeListSkeleton/>
            <RecipeListSkeleton/>
            <RecipeListSkeleton/>
            <RecipeListSkeleton/>
        </React.Fragment>;
    };
    // states
    const [recipeListContent, setRecipeListContent] = useState<JSX.Element>(defaultCardContent());
    const [title, setTitle] = useState<string>('All Recipes');
    const [panelState, setPanelState] = useState<number>(1);
    const [recipeList, setRecipeList] = useState<any[]>([]);

    // event handlers
    const handleView = useCallback((id: string) => {
        // console.log('Card detail to see: ', id);
        dispatchDashboard ({
            type: DASHBOARD_ROUTES.PREVIEW_RECIPE,
            payload: id
        });
    },[dispatchDashboard]);

    const handlePanelChange = (panelNumber: number) => {
        setPanelState(panelNumber);
    }
    
    //lifecycle methods
    const fetchRecipesOfType = useCallback((id: string)=>{
        setRecipeListContent(defaultCardContent());
        let asyncFetch = getAllPublicRecipes();
        if (id === 'all') setTitle('All Recipes') 
        else setTitle('Loading...');
        switch(id) {
            case 'all':
                asyncFetch = getAllPublicRecipes();
                break;
            default:
                asyncFetch = getAllRecipesByGroupId(id);
        }
        asyncFetch
            .then((res: any) => {
                if (res.data.length > 0) {
                    if (id !== 'all') setTitle(`${res.data[0].group.title}`);
                    setRecipeList(res.data);
                } else {
                    setRecipeListContent(<EmptySearchCard type="empty"/>);
                }
            })
            .catch((err: any) => console.log('Error fetching: ', err));
    },[]);

    useEffect(()=>{
        if (recipeList.length > 0 && panelState === 1) {
            const sortedList = recipeList.sort((a: any, b: any) => {
                const date1 = new Date(a?.created);
                const date2 = new Date(b?.created);
                return date2.getTime() - date1.getTime();
            });
            const list: JSX.Element[] = sortedList?.map((el: any, index:number) => <SimpleRecipeCard
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
        } else if (recipeList.length > 0 && panelState === 2) {
            setRecipeListContent(<RecipeCollection 
                list={mapChronologicalList(recipeList)} 
                onView={handleView}/>);
        } else {
            setRecipeListContent(<EmptySearchCard type="empty"/>);
        }
    },[recipeList, handleView, panelState]);
    

    //component did mount
    useEffect(()=>{
        // console.log('List recipe type: ', id);
        fetchRecipesOfType(id);
    },[fetchRecipesOfType, id]);

    return <React.Fragment>
        <div className = {classes.root}>
            <CssBaseline />
        <Grid container spacing={1}>
            <div className={classes.fullWidth}>
                <Typography variant="h5" component="h2">{title}</Typography>
                <RecipePanel onPanelChange={handlePanelChange}/>
            </div>
            {recipeListContent}
        </Grid>
        </div>
    </React.Fragment>;
};

export default RecipeListView;