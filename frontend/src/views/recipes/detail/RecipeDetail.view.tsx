import React, { FunctionComponent, useEffect, useCallback, useState } from 'react';
// material
import { Grid, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
// custom
import RecipeFormSkeleton from '../loading/RecipeFormSkeleton';
import { getRecipeById } from '../../../common/async/AsyncCalls';
import RecipeDetailCard from '../card/RecipeDetailCard';
import { getSubText } from '../../../common/util/HelperFunctions';
import EmptySearchCard from '../../../components/card/404/EmptySearchCard';
// styles
const useStyles = makeStyles(theme => ({
    container: {
        width: '95%',
        display: 'flex',
        flexDirection: 'column'
    },
}));

const RecipeDetailView: FunctionComponent = (props): JSX.Element => {
    const { id } = useParams();
    const classes = useStyles();
    // states
    const [formContent, setFormContent] = useState<JSX.Element>(<RecipeFormSkeleton/>);
    // lifecycle methods
    const fetchRecipeDetails = useCallback((id: string) => {
        getRecipeById(id)
            .then((res: any) => {
                if (res.data.length > 0) {
                    setFormContent(<RecipeDetailCard data={res.data[0]}/>);
                }
            })
            .catch((err: any) => {
                console.log('Error retrieving recipe details: ', err);
                setFormContent(<EmptySearchCard type="error"/>);
            });
    },[]);
    // component did mount
    useEffect(()=>{
        // console.log('Recipe id to preview: ', id);
        fetchRecipeDetails(id);
    },[]);
    return <React.Fragment>
        <Grid className={classes.container} container spacing={1}>
            {formContent}
        </Grid>
    </React.Fragment>;
};

export default RecipeDetailView;