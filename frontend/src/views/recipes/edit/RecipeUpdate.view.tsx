import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
// material
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { addNewRecipe, getAllGroups, getAllItems, getAllTags, getRecipeById, updateRecipeById } from '../../../common/async/AsyncCalls';
import { LinearLoader } from '../../../components/loaders/linear-loader/LinearLoader';
import { IRecipe } from '../common/recipe-interfaces';
import RecipeForm from '../components/form/RecipeForm';
import RecipeFormSkeleton from '../loading/RecipeFormSkeleton';
import CloseActionButton from '../../../components/notifications/CloseActionButton';
import { DASHBOARD_ROUTES, useDashboardRouteDispatch } from '../../../layouts/dashboard/router/DashboardRouterContext';
// styles
const useStyles = makeStyles(theme => ({
    container: {
        width: '95%',
        display: 'flex',
        flexDirection: 'column'
    },
}));

const RecipeUpdateView: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    const dashboardDispatch: any = useDashboardRouteDispatch();
    const { id } = useParams();
    const { enqueueSnackbar} = useSnackbar();
    // states
    const [title, setTitle] = useState('Loading Form...');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formContent, setFormContent] = useState<JSX.Element>(<RecipeFormSkeleton/>);
    // notificationBox action - OK
    const okActionButton = (key:number) => (
        <CloseActionButton keyObj={key} />
    );
    
    const getDefaultData = (data: any):IRecipe => {
        const result = data && data.length>0 && data[0];
        // console.log('Recipe data to populate: ', result);
        return {
            title: result.title,
            link: result.link,
            isPrivate: result.isPrivate,
            content: result.content,
            html: result.html,
            group: result.group,
            tags: result.tags,
            items: result.items,
            timers: result.timers,
        };
    };

    // lifecycle methods
    const fetchAllData = useCallback((recipeId: string)=>{
        const promiseList: any[] = [getAllGroups(), getAllTags(), getAllItems(), getRecipeById(recipeId)];
        Promise.all(promiseList)
            .then((res: any) => {
                if (res && res.length > 3) {
                    setFormContent(
                        <RecipeForm
                            data={getDefaultData(res[3].data)}  
                            groupDropdownList={res[0].data}
                            tagDropdownList={res[1].data}
                            itemDropdownList={res[2].data}
                            onSubmit={handleFormSubmit}/>
                    );
                }
            })
            .catch((err: any) => console.log('Error fetching data: ', err))
            .finally(()=> {setLoading(false); setTitle(`Update Recipe`)});
    },[]);

    // event handlers
    const handleFormSubmit = (data: IRecipe) => {
        setLoading(true);
        // console.log('Recipe form to update is: ', data);
        const group = data.group._id;
        const tags = data.tags?.map((item: any) => item._id);
        const items = data.items?.map((item: any) => item._id);
        updateRecipeById( id, {
            title: data.title,
	        link: data.link,
	        isPrivate: data.isPrivate,
	        content: data.content,
	        html: data.html,
	        group: group,
	        tags: tags,
	        items: items,
	        timers: []
        })
        .then((res: any) => {
            enqueueSnackbar(`Recipe Form Updated!`, {variant: 'info', action: okActionButton });
            dashboardDispatch ({
                type: DASHBOARD_ROUTES.MY_RECIPES
            });
        })
        .catch((err: any) => {
            setLoading(false);
            setTitle(`Update Recipe`);
            console.log(`Error updating recipe..`, err);
            enqueueSnackbar(`Error updating Recipe!`, 
                {variant: 'error', action: okActionButton });
        });
    };

    useEffect(()=>{
        // console.log('Recipe id to update is: ', id);
        fetchAllData(id);
    },[]);

    return <React.Fragment>
        <Grid className={classes.container} container spacing={1}>
            <Typography variant="h5" component="h2">{title}</Typography>
            <LinearLoader display={isLoading}/>
                {formContent}
        </Grid>
        </React.Fragment>;
};

export default RecipeUpdateView;