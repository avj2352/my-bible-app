/**
 * Sidebar component - Drawer API
 * PAJ - 22 March 2019
 */
import React, {useState, useEffect, FunctionComponent, useCallback, useRef} from 'react';
import { useHistory } from 'react-router-dom';
// Material
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
// custom
import {IAppContextState, useGlobalState} from "../../common/context/AppContext";
import { getAllGroups } from '../../common/async/AsyncCalls';
//Icons
import AllIcon from '@material-ui/icons/AcUnit';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import GroupIcon from '@material-ui/icons/Bookmarks';
import ItemsIcon from '@material-ui/icons/PostAdd';
import TagsIcon from '@material-ui/icons/LabelImportant';
import RecipeIcon from '@material-ui/icons/Fastfood';
import DashboardIcon from '@material-ui/icons/AccountBalance';
//Styles
import appLogo from './../../assets/img/logo.png';
import { useStyles } from './sidebar-style';



interface ISidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar: FunctionComponent<ISidebarProps> = (props): JSX.Element => {
  // destructuring
    const { open, handleDrawerClose } = props;
    const imageRef: any = React.createRef();
    const appContext: IAppContextState = useGlobalState();
    // context    
    const history = useHistory();
    // skeleton loading
    const skeletonLoading: JSX.Element = <React.Fragment>
        <ListItem>
            <Skeleton variant="text" width={200} height={20}/>
        </ListItem>
        <ListItem>
            <Skeleton variant="text" width={200} height={20}/>
        </ListItem>
    </React.Fragment>;
    // state        
    const [generalListContent, setGeneralListContent] = useState<JSX.Element>(skeletonLoading);
    const [signedInListContent, setSignedInListContent] = useState<JSX.Element>(skeletonLoading);
    const [adminListContent, setAdminListContent] = useState<JSX.Element>(<React.Fragment/>);
    const classes = useStyles();

    // Lifecycle methods
    // fetch all groups (premium / non-premium)
    const fetchGroups = useCallback(()=>{
      getAllGroups()
        .then((res: any) => {
          // console.log('Result is: ', res.data);
          const listContent: any = res.data && res.data.map((item: any, index: number)=> {
            return <ListItem button onClick={navigateLink.bind(null, `recipes/list/${item._id}`)} key={index}>
                <ListItemIcon><TurnedInNotIcon/></ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
          });
          setGeneralListContent(listContent);
        });
    },[]);

    const navigateLink = (paramName: string) => {
      const location = {
        pathname: `/app/${paramName}`,
      };
      history.push(location);
      handleDrawerClose();
    };

    const handleLoading = () => {
        if (imageRef.current) imageRef.current.style.opacity = '1';
    };

    // Dependencies
    useEffect(()=>{
        if (appContext.profile) {
            setSignedInListContent(
                <React.Fragment>
                    <ListItem button onClick={navigateLink.bind(null, '')}>
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText primary='My Dashboard' />
                    </ListItem>
                    <ListItem button onClick={navigateLink.bind(null, 'recipes/profile')}>
                        <ListItemIcon><ImportContactsIcon/></ListItemIcon>
                        <ListItemText primary='My Recipes' />
                    </ListItem>
                    <ListItem button onClick={navigateLink.bind(null, 'tags')}>
                        <ListItemIcon><TagsIcon/></ListItemIcon>
                        <ListItemText primary='Add / Edit Tags' />
                    </ListItem>
                    <ListItem button onClick={navigateLink.bind(null, 'items')}>
                        <ListItemIcon><ItemsIcon/></ListItemIcon>
                        <ListItemText primary='Add / Edit Items' />
                    </ListItem>
                    <ListItem button onClick={navigateLink.bind(null, 'recipes/add')}>
                        <ListItemIcon><RecipeIcon/></ListItemIcon>
                        <ListItemText primary='Add / Edit Recipes' />
                    </ListItem>
                </React.Fragment>
            );
        } else {
            setSignedInListContent(<React.Fragment/>);
        } if (appContext.profile?.role =='admin') {
            setAdminListContent (
                <React.Fragment>
                    <Divider className={classes.listDivider}/>
                    <ListItem button onClick={navigateLink.bind(null, 'groups')}>
                        <ListItemIcon><GroupIcon/></ListItemIcon>
                        <ListItemText primary='Add / Edit Groups' />
                    </ListItem>
                </React.Fragment>
            );
        } else {
            setAdminListContent(<React.Fragment/>);
        }
    },[appContext.profile]);

    // componentDidMount
    useEffect(()=>{
      fetchGroups();
    },[]);

    return (
        <div>          
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={open}
            classes={{paper: classes.drawerPaper}}>
            <div className={classes.drawerHeader}>
              <div>&nbsp;</div>
              <Avatar ref={imageRef} alt="app-logo" src={appLogo} onLoad={handleLoading} className={classes.avatar}/>
              <IconButton onClick={handleDrawerClose}>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List className={classes.listGroup}>                
              <ListItem key='All Recipes' button onClick={navigateLink.bind(null, `recipes/list/all`)}>
                <ListItemIcon><AllIcon/></ListItemIcon>
                <ListItemText primary='All Recipes' />
              </ListItem>
              {generalListContent}
              <Divider className={classes.listDivider}/>
              {signedInListContent}
              {adminListContent}
            </List>       
          </Drawer>
        </div>
    );
};

export default Sidebar;