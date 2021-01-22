import React, { FunctionComponent } from "react";
// material
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from '@material-ui/icons/DesktopWindows';
import DeleteIcon from "@material-ui/icons/Delete";
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
// custom
import {IRecipe} from "../common/recipe-interfaces";
import SimpleBadge from "../../../components/badges/simple/SimpleBadge";
import { getSubText } from "../../../common/util/HelperFunctions";
import { DASHBOARD_ROUTES, useDashboardRouteDispatch } from "../../../layouts/dashboard/router/DashboardRouterContext";
import SmallBadge from "../../../components/badges/simple/SmallBadge";

interface IMyRecipeCardProps extends IRecipe {
    onEdit: (data: IRecipe) => void;
    onDelete: (id: string) => void;
}

//styles
export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
    },
    row: {
        width: '100%',
        display: 'flex',
        '&>div': {
            margin: 5
        },
        '&>div:nth-child(1)': {
            marginLeft: 0
        }
    },
    rowSeparate: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    chip: {
        margin: theme.spacing(1),
    },
    pos: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 18
    },
    smallText: {
        textAlign: 'left',
        marginBottom: 12,
        fontSize: 12,
        color: theme.palette.primary.dark
    },
    action: {
        display: 'flex',
        // border: '1px solid red',
        justifyContent: 'flex-end'
    },
    fab: {
        margin: '0 10px'
    }
}));

const MyRecipeCard: FunctionComponent<IMyRecipeCardProps> = (props): JSX.Element => {
    const classes = useStyles();
    const dashboardDispatch: any = useDashboardRouteDispatch();
    const { title, link, isPrivate, content, html, group,  onEdit, onDelete } = props;
    const id = props.id? props.id: '';
    const tags: any[] = props.tags? props.tags : [];
    const items: any[] = props.items ? props.items : [];
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();

    // add multiple actions to one snackbar
    const action = (key: number) => (
        <React.Fragment>
            <Button onClick={() =>{
                closeSnackbar(key);
                onDelete(id);
            }}>{'Yes'}</Button>
            <Button onClick={() => { closeSnackbar(key); }}>{'No'}</Button>
        </React.Fragment>
    );

    // event handlers
    const handleEdit = () => {
        onEdit({id, title, link, isPrivate, content, html, group, tags, items });
    };

    const handleView = () => {
        dashboardDispatch ({
            type: DASHBOARD_ROUTES.PREVIEW_RECIPE,
            payload: id
        });
    };

    const handleDelete = () => {
        enqueueSnackbar(`Are you sure you want to delete this group?`, {variant: 'warning', action});
    };

    const tagContent = tags.length > 0 && tags.map((item: any, index: number) => <SimpleBadge key={index} name={item.name} description={item.description} />);

    const groupBadge = group && group.title && <SmallBadge name={group.title} description={group.description}/>;
    const privacyBadge = <SmallBadge name={isPrivate ? 'private' : 'public'} description={isPrivate ? 'This recipe is private' : 'This recipe is public'}/>;

    return  <Grid item xs={12} md={4}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2">{title}</Typography>
                <Typography className={classes.pos} component="p">
                    {getSubText(props.content)}
                </Typography>
                <div className={classes.rowSeparate}>
                    {groupBadge}
                    {privacyBadge}
                </div>
                <div className={classes.row}>
                {tagContent}
                </div>
            </CardContent>
            <CardActions className={classes.action}>
                <Fab
                    className={classes.fab}
                    size="small"
                    color="primary"
                    aria-label="Update"
                    onClick={handleView}>
                    <ViewIcon />
                </Fab>
                <Fab
                    className={classes.fab}
                    size="small"
                    color="primary"
                    aria-label="Update"
                    onClick={handleEdit}>
                    <EditIcon />
                </Fab>
                <Fab
                    className={classes.fab}
                    size="small"
                    aria-label="Delete"
                    onClick={handleDelete}>
                    <DeleteIcon />
                </Fab>
            </CardActions>
        </Card>
    </Grid>
}

export default MyRecipeCard;