import React, { useState, useEffect, useCallback, FunctionComponent} from 'react';
import clsx from 'clsx';
// material
import CssBaseline from '@material-ui/core/CssBaseline';
// custom
import Sidebar from './../../components/sidebar/Sidebar';
import Header from './../../components/header/Header';
import Footer from './../../components/footer/Footer';
import { useGlobalDispatch, useGlobalState } from './../../common/context/AppContext';
import { useStyles } from './dashboard-style';
import { getUserDetails } from '../../common/async/AsyncCalls';
import { CONTEXT_ACTION_TYPE } from '../../common/context/AppContext';
import DashboardRouterApp from "./router/DashboardRouter";



const DashboardLayout:FunctionComponent = (props):JSX.Element => {        
    const appDispatch: any = useGlobalDispatch();
    //state
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    // lifecycle methods
    const fetchUserDetails = useCallback(()=>{
        return getUserDetails()
            .then((res: any) => appDispatch({
                type: CONTEXT_ACTION_TYPE.SET_PROFILE_DATA,
                payload: res.data
            }));            
    },[]);
    
    // events
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    
    // componentLoaded
    useEffect(()=>{
        fetchUserDetails();
    },[]);

    return (        
            <div className={classes.root}>
                <CssBaseline />
                <Header open={open} handleDrawerOpen={handleDrawerOpen} />
                <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
                <main className={clsx(classes.content, { [classes.contentShift]: open })}>                    
                    <DashboardRouterApp/>
                </main>
                 <Footer open={open} handleDrawerOpen={handleDrawerOpen}/>
            </div>
    );
}

export default DashboardLayout;