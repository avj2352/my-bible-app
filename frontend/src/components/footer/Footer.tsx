import React, {useEffect, useState, FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// material
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import clxs from 'clsx';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import ToggleDarkIcon from '@material-ui/icons/NightsStay';
import ToggleLightIcon from '@material-ui/icons/WbSunny';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/AccountBalance';
// custom
import MenuDropDown from './../menu-drop-down/MenuDropdown';
import { useStyles } from './footer-style';
import {CONTEXT_ACTION_TYPE, IAppContextState, useGlobalDispatch, useGlobalState} from '../../common/context/AppContext';
import clsx from "clsx";


interface IFooterProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

const Footer: FunctionComponent<IFooterProps> = (props): JSX.Element => {
    const appDispatch: any = useGlobalDispatch();
    const appContext: IAppContextState = useGlobalState();

    const history = useHistory();
    const classes = useStyles();
    const { open, handleDrawerOpen } = props;

    const { enqueueSnackbar, closeSnackbar }  = useSnackbar();
    const [ userDetails, setUserDetails] = useState({firstName: '', lastName: '', role: ''});
    const [ theme, setTheme] = useState(appContext.theme);

    // event handlers - toggleTheme
    const toggleMode = (evt: any) => {
        if (theme === 'dark') {
            appDispatch ({
                type: CONTEXT_ACTION_TYPE.THEME_TOGGLE,
                payload: false
            });
        } else {
            appDispatch ({
                type: CONTEXT_ACTION_TYPE.THEME_TOGGLE,
                payload: true
            });
        }        
    }

    //close sidebar on sidebar buttons click
    //https://reacttraining.com/react-router/web/api/history
    const navigateLink = (paramName: string) => {
        const location = {
            pathname: `/app/${paramName}`,
        };
        history.push(location);        
    }

    useEffect(()=>{        
        setTheme(appContext.theme);
    },[appContext.theme]);

    return (
        <AppBar position="fixed" color="primary" className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}>
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="open drawer" 
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu button"
                    className={classes.dashboardButton}
                    onClick={navigateLink.bind(null,'')}>
                    <DashboardIcon />
                </IconButton>
                <Fab 
                    color="primary"
                    aria-label="add" 
                    className={classes.fabButton}
                    onClick={() => navigateLink('recipes/search')}>
                    <SearchIcon />
                </Fab>
                <div className={classes.grow} />                
                {appContext.profile && <IconButton onClick={toggleMode}>
                    {appContext.theme === 'dark' ? <ToggleLightIcon /> : <ToggleDarkIcon/> }
                </IconButton>}
                <MenuDropDown/>                               
            </Toolbar>
        </AppBar>
    );
};



export default Footer;