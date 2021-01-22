import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
// material
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { addNewRecipe, getAllGroups, getAllItems, getAllTags } from '../../../common/async/AsyncCalls';
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

const RecipeAddView: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar} = useSnackbar();
    const dashboardRouterDispatch: any = useDashboardRouteDispatch();
    // states
    const [title, setTitle] = useState('Loading Form...');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formContent, setFormContent] = useState<JSX.Element>(<RecipeFormSkeleton/>);
    // notificationBox action - OK
    const okActionButton = (key:number) => (
        <CloseActionButton keyObj={key} />
    );
    
    const getDefaultData = ():IRecipe => {
        return {
            title: '',
            link: '',
            isPrivate: false,
            content: '',
            html: '',
            group: null,
            tags: [],
            items: [],
            timers: [],
        };
    };

    // lifecycle methods
    const fetchAllDropdowns = useCallback(()=>{
        const promiseList: any[] = [getAllGroups(), getAllTags(), getAllItems()];
        Promise.all(promiseList)
            .then((res: any) => {
                if (res && res.length > 2) {
                    setFormContent(
                        <RecipeForm
                            data={getDefaultData()}  
                            groupDropdownList={res[0].data}
                            tagDropdownList={res[1].data}
                            itemDropdownList={res[2].data}
                            onSubmit={handleFormSubmit}/>
                    );
                }
            })
            .catch((err: any) => console.log('Error fetching data: ', err))
            .finally(()=> {setLoading(false); setTitle(`Create New Recipe`)});
    },[]);

    // event handlers
    const handleFormSubmit = (data: IRecipe) => {
        setLoading(true);
        // console.log('New Recipe form data is: ', data);
        const group = data.group._id;
        const tags = data.tags?.map((item: any) => item._id);
        const items = data.items?.map((item: any) => item._id);
        addNewRecipe({
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
            enqueueSnackbar(`New Recipe Added!`, {variant: 'info', action: okActionButton });
            dashboardRouterDispatch ({
                type: DASHBOARD_ROUTES.MY_RECIPES
            });
        })
        .catch((err: any) => {
            console.log(`Error creating new recipe..`, err);
            enqueueSnackbar(`Error creating Recipe / Duplicate Recipe Title!`, 
                {variant: 'error', action: okActionButton });
        })
        .finally(() => {
            setLoading(false);
            setTitle(`Create New Recipe`);
        });
    };

    useEffect(()=>{
        fetchAllDropdowns();
    },[]);

    return <React.Fragment>
        <Grid className={classes.container} container spacing={1}>
            <Typography variant="h5" component="h2">{title}</Typography>
            <LinearLoader display={isLoading}/>
                {formContent}
        </Grid>
        </React.Fragment>;
};

export default RecipeAddView;