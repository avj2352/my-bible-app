import React, { FunctionComponent, useContext, useState, useEffect, useCallback, useRef } from 'react';
import gsap, { CSSPlugin, TimelineLite, Back } from 'gsap';
import { FaGoogle } from 'react-icons/fa';
// material
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// custom
import {useStyles} from './login.style';
import logo from './../../assets/img/logo.png';
import { LinearLoader } from './../../components/loaders/linear-loader/LinearLoader';
// context
import { RouterDispatchContext, NAMED_ROUTES } from '../../router/context/RouterContext';
import {AppStateContext, CONTEXT_ACTION_TYPE, useGlobalDispatch} from './../../common/context/AppContext';
// notification
import SimpleLinkButton from '../../components/buttons/links/SimpleLinkButton';



// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

const LoginView : FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);
    const routeDispatch: any = useContext(RouterDispatchContext);
    const appDispatch: any = useGlobalDispatch();
    //states
    const [isLoading, setLoading] = useState(false);
    //refs    
    let submitRef = useRef<HTMLButtonElement>(document.createElement("button"));
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

   

    const authenticate = async (evt: any) => {
        setLoading(true);
        evt.preventDefault();
        window.location.href = '/auth/google';
    };

    

    //componentDidMount
    useEffect(()=>{
        animateIn();
        submitRef.current.focus();
    },[]);

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root} alignItems="center">
                <Paper className={classes.paper} ref={loginBoxDom}>
                    <div className={classes.contentWrapper}>
                        <img src={logo} className={classes.imageIcon} alt="logo"/>
                        <Typography color="textSecondary" align="center" className={classes.title}>
                            {`I AM B.O.R.E.D v${appContext.version}`}
                        </Typography>
                        <LinearLoader display={isLoading}/>                        
                        <Button
                            onClick={authenticate}
                            fullWidth
                            buttonRef={submitRef}
                            variant="contained"
                            color="primary"
                            onKeyDown={authenticate}
                            className={classes.socialBtn}>
                            <FaGoogle/>&nbsp;&nbsp;Sign In with Google
                        </Button>
                    </div>
                    <footer className={classes.footer}>
                        <SimpleLinkButton link="/about">
                            About B.O.R.E.D
                        </SimpleLinkButton>
                        <Typography className={classes.footerText} variant="body2" color="textSecondary" align="center">
                            <a href="/">Home</a>
                        </Typography>
                    </footer>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default LoginView;