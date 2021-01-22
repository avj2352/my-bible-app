import React, {FunctionComponent, useCallback, useEffect, useState } from 'react';
// material
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
// router
import { useHistory } from 'react-router-dom';
import { IAppContextState, useGlobalState } from '../../common/context/AppContext';
import { logoutUser } from '../../common/async/AsyncCalls';

interface IMenuOptionProps {
    label: string | JSX.Element;
    event: (data: any | null) =>  void;
};

const ITEM_HEIGHT = 48;

const MenuDropdown: FunctionComponent = (props) => {
    const appContext: IAppContextState = useGlobalState();
    const history = useHistory();
    // states
    const [menuOptions, setMenuOptions] = useState<IMenuOptionProps[]>(
        [
            {
                label: <Skeleton variant="text" width={200} height={20}/>,
                event: ()=>{}
            },
            {
                label: <Skeleton variant="text" width={200} height={20}/>,
                event: ()=>{}
            }
        ]  
    );

    // event handlers
    const handleLogout = (data: any) => {
        logoutUser()
            .then(() => {
                const location = {
                    pathname: '/login'
                };
        
                history.push(location);
            });
    };

    const displayUserInfo = (info: any) => console.log('User info is: ', info);
    
    const handleLogin = useCallback((data: any) => {

        const location = {
            pathname: '/login'
        };

        history.push(location);
    },[]);

    const routeToAbout = () => {
        const location = {
            pathname: '/about'
        };
        history.push(location);
    };    

    // menu options list
    const notSignedInOptions: IMenuOptionProps[] = [
        {
            label: 'Sign In',
            event: handleLogin
        },
        {
            label: 'About',
            event: routeToAbout
        }    
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (appContext.profile) {
            // console.log('Profile Detail is: ', appContext.profile);
            // menu options list
            const signedInOptions: IMenuOptionProps[] = [
                {
                    label: appContext.profile.name,
                    event: displayUserInfo.bind(null, appContext.profile)
                },
                {
                    label: `Role: ${appContext.profile.role}`,
                    event: displayUserInfo.bind(null, appContext.profile)
                },
                {
                    label: 'About',
                    event: routeToAbout
                },
                {
                    label: 'Logout',
                    event: handleLogout
                }
            ];
            setMenuOptions (signedInOptions);
        }else {
            setMenuOptions (notSignedInOptions);
        }
    },[
        appContext.profile,
        
    ]);

    return (
        <React.Fragment>
            <IconButton color="inherit" aria-label="delete" onClick={handleClick}>
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {menuOptions.map((el: IMenuOptionProps, index: number) => (
                    <MenuItem key={index} onClick={el.event}>
                        {el.label}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
};

export default MenuDropdown;