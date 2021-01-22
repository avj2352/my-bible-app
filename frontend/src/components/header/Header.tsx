import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
//Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
// custom
import { useGlobalState } from '../../common/context/AppContext';
//CSS in JS
import { useStyles } from './header-style';

interface IHeaderProps {
  open: boolean;
  handleDrawerOpen: ()=>void; 
}

const Header:FunctionComponent<IHeaderProps> = (props):JSX.Element => {
    //context
    const appContext = useGlobalState();
    const classes = useStyles();
    const { open, handleDrawerOpen } = props;    
    

    return(
        <AppBar          
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar disableGutters={!open}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {`${appContext.title}`}
            </Typography>            
          </Toolbar>
        </AppBar>
    );
}


export default Header;