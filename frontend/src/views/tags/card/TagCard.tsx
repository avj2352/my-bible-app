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
import DeleteIcon from "@material-ui/icons/Delete";
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
// custom
import {ITag} from "../common/tag-interfaces";
import SimpleBadge from "../../../components/badges/simple/SimpleBadge";

interface ITagCardProps extends ITag {
    onEdit: (data: ITag) => void;
    onDelete: (id: string) => void;
}

//styles
export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
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

const TagCard: FunctionComponent<ITagCardProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { id, name, description, onEdit, onDelete } = props;
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
    // event handlers
    const handleEdit = () => {
        onEdit({id, name, description });
    };

    const handleDelete = () => {
        enqueueSnackbar(`Are you sure you want to delete this group?`, {variant: 'warning', action});
    };
    return  <Grid item xs={12} md={4}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2">{name}</Typography>
                <Typography className={classes.pos} component="p">
                    {props.description}
                </Typography>
                <SimpleBadge name={name} description={description} />
            </CardContent>
            <CardActions className={classes.action}>
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

export default TagCard;