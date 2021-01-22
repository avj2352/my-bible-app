import React, {FunctionComponent, useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {IAppContextState, useGlobalState} from "../../common/context/AppContext";
import {HomeSkeletonLoading} from "./loading/Skeleton";
// styles
import { useStyles } from './home.style';
import HomeGeneralView from "./general/HomeGeneral.view";
import HomeProfileView from "./profile/HomeProfile.view";

const HomeView: FunctionComponent = (props): JSX.Element => {
    // context
    const appContext: IAppContextState = useGlobalState();
    // states
    const [heading, setHeading] = useState<string>('Book.Of.Recipes.Easily.Done');
    const [content, setContent] = useState<JSX.Element>(<HomeSkeletonLoading/>);    
    // styles
    const classes = useStyles();
    // componentDidMount
    useEffect(()=>{
        // console.log('Rendering!!');
        setTimeout(()=>{
            if(appContext.profile) {                
                if (appContext.profile.role === 'admin') {
                    setContent(<HomeProfileView isAdmin={true}/>);
                } else {
                    setContent(<HomeProfileView isAdmin={false}/>);
                }
                setHeading(`Welcome, ${appContext.profile.name}`);
            }
            else {
                // console.log('Profile not set', appContext.profile);
                setHeading(`B.O.R.E.D v${appContext.version}`);
                setContent(<HomeGeneralView/>);
            }
        }, 1500);
    },[appContext.profile]);

    return (
        <React.Fragment>            
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant="h5"><strong>{heading}</strong></Typography>
                </Grid>
                {content}
            </Grid>
        </React.Fragment>
    );
};

export default HomeView;