import React, { FunctionComponent, useContext, useState, useEffect, useCallback, useRef } from 'react';
import gsap, { CSSPlugin, TimelineLite, Back } from 'gsap';
import { FaGoogle } from 'react-icons/fa';
// material
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// custom
import {useStyles} from './about.style';
import RegisterButton from '../../components/buttons/register-button/RegisterButton';
import logo from './../../assets/img/logo.png';
import { authenticateUser } from '../../common/async/AsyncCalls';
import { addLocalStorageItem } from '../../common/helper/LocalStorageProvider';
import { LinearLoader } from '../../components/loaders/linear-loader/LinearLoader';
// context
import { RouterDispatchContext, NAMED_ROUTES } from '../../router/context/RouterContext';
import {AppStateContext, CONTEXT_ACTION_TYPE, useGlobalDispatch} from '../../common/context/AppContext';
import { getUserDetails } from '../../common/async/AsyncCalls';
import { getLocalStorageItem } from '../../common/helper/LocalStorageProvider';
// notification
import { SimpleNotification, NOTIFICATION_TYPE } from '../../common/snackbar/SnackbarHelper';
import SimpleLinkButton from '../../components/buttons/links/SimpleLinkButton';



// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

const AboutView : FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);
    const routeDispatch: any = useContext(RouterDispatchContext);
    const appDispatch: any = useGlobalDispatch();
    //states    
    const [noteMsg, setNoteMsg] = useState('');
    const [isLoading, setLoading] = useState(false);
    //refs    
    let aboutRef = useRef<HTMLButtonElement>(document.createElement("button"));
    let loginBoxDom = useRef<HTMLDivElement>(document.createElement("div"));

    const animateIn = useCallback(()=>{
        const t1 = new TimelineLite();
        // reset mode to always white
        appDispatch ({
            type: CONTEXT_ACTION_TYPE.THEME_TOGGLE,
            payload: false
        });
        setTimeout(()=>{
            console.log('Login Box Reference is: ', loginBoxDom);
            t1.to(loginBoxDom.current, 1, {top: 0, opacity: 1, ease: Back.easeOut.config(1)});
            t1.play();
        },1000);
    },[]);


    const goback = () => {
        window.location.href = '/login';
    };

    //componentDidMount
    useEffect(()=>{
        animateIn();
        aboutRef.current.focus();
    },[]);

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root} alignItems="center">
                <SimpleNotification type={NOTIFICATION_TYPE.ERROR} message={noteMsg} />
                <Paper className={classes.paper} ref={loginBoxDom}>
                    <div className={classes.contentWrapper}>
                        <img src={logo} className={classes.imageIcon} alt="logo"/>                         
                        <Typography align="center" className={classes.title}>
                            {`I AM B.O.R.E.D v${appContext.version}`}
                        </Typography>      
                        <Typography color="textSecondary" align="center" className={classes.content}>
                            This is a simple web Application <br/>
                            in which you can create, store & share <br/>
                            your favourite recipes with people.
                        </Typography>                      
                        <Typography color="textSecondary" align="center" className={classes.content}>
                            {`v${appContext.version}`} now supports Social Login, <br/>
                            Dark & Light Themes, <br/>
                            Ability to create, store and tag recipe items
                        </Typography>
                        <Typography color="textSecondary" align="center" className={classes.content}>
                            If you think this recipe app was useful, <br/>
                            consider buying me treat <br/>
                            (or just drop a vote of support) <br/>
                            on the following Patreon Page <br/>
                            <a rel="noreferrer noopener" href="https://www.patreon.com/pramodPanta" target="_blank">Click here</a>
                        </Typography>
                    </div>
                    <footer className={classes.footer}>
                        <SimpleLinkButton link="/login">
                            Login to application
                        </SimpleLinkButton>
                        <SimpleLinkButton link="/">
                            Home
                        </SimpleLinkButton>
                    </footer>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default AboutView;