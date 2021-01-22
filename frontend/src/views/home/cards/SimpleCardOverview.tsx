import React, {FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {DASHBOARD_ROUTES, useDashboardRouteDispatch} from "../../../layouts/dashboard/router/DashboardRouterContext";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        width: '100%',
        margin: 5
    },
    [theme.breakpoints.between("xs","md")]: {
        root: {
            margin: 0,
            marginTop: 5,
            marginBottom: 5
        }
    }
}));

interface  ISimpleCardOverview {
    title: string;
    link: string;
    params?: string;
    btnLabel?: string;
};

export const SimpleCardOverview: FunctionComponent<ISimpleCardOverview> = (props):JSX.Element => {
    // context
    const dashboardRouteDispatch: any = useDashboardRouteDispatch();
    const classes = useStyles();
    const { title, children, link, btnLabel } = props;
    const params = props.params? props.params : '';

    // event handlers
    const handleNavigation = (link: string) => {
        switch (link) {
            case 'groups':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.GROUPS
                });
                break;
            case 'tags':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.TAGS
                });
                break;
            case 'items':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.ITEMS
                });
                break;
            case 'login':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.LOGIN
                });
                break;
            case 'about':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.ABOUT
                });
                break;
            case 'newRecipes':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.NEW_RECIPES
                });
                break;
            case 'listRecipes':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.LIST_RECIPES,
                    payload: params
                });
                break;
            case 'allRecipes':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.LIST_RECIPES,
                    payload: 'all'
                });
                break;
            case 'myRecipes':
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.MY_RECIPES,
                    payload: params
                });
                break;
            default:
                dashboardRouteDispatch ({
                    type: DASHBOARD_ROUTES.WELCOME
                });
        }
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleNavigation.bind(null, link)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {children}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary" onClick={handleNavigation.bind(null, link)}>
                    {btnLabel ? btnLabel: 'More Details...'}
                </Button>
            </CardActions>
        </Card>
    );
};

