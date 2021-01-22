import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
// styling
import { useStyles } from './group.view.style';
import { CssBaseline, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
// custom
import CloseActionButton from "../../components/notifications/CloseActionButton";
import GroupCreate from "./create/GroupCreate";
import GroupListSkeleton from "./loading/GroupListSkeleton";
import {deleteGroupById, getAllGroups, searchByText } from "../../common/async/AsyncCalls";
import GroupCard from "./card/GroupCard";
import EmptySearchCard from "../../components/card/404/EmptySearchCard";
import {IGroup} from "./common/group-interfaces";
import GroupUpdateModal from "./update/GroupUpdateModal";
import SearchCard from "../../components/search/SearchCard";
import {ISearch} from "../../components/search/search-interface";

const GroupView: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar} = useSnackbar();
    // loading state
    const defaultGroupContent = (): JSX.Element => {
        return <React.Fragment>
            <GroupListSkeleton/>
            <GroupListSkeleton/>
            <GroupListSkeleton/>
        </React.Fragment>;
    };
    // states
    const [groupListContent, setGroupListContent] = useState<JSX.Element>(defaultGroupContent());
    const [isModal, setModal] = useState<boolean>(false);
    const [groupModalData, setGroupModalData] = useState<IGroup>({
        id: '',
        title: '',
        description: '',
        premium: false,
        slug: ''
    });
    // lifecycle methods
    const fetchAllGroups = useCallback(()=>{
        setGroupListContent(defaultGroupContent());
        getAllGroups()
            .then((res: any) => {
                // console.log('Response is: ', res.data);
                if (res.data.length > 0) {
                    const list: JSX.Element[] = res.data?.map((item: any, index:number) => <GroupCard
                        key={index}
                        onEdit={handleGroupEdit}
                        onDelete={handleGroupDelete}
                        id={item._id}
                        title={item.title}
                        description={item.description}
                        slug={item.slug}
                        premium={item.premium}/>
                    );
                    setGroupListContent(<React.Fragment>
                        {list}
                    </React.Fragment>);
                } else {
                    setGroupListContent(<EmptySearchCard type="empty"/>);
                }
            }).catch((err: any) => console.log('Error fetching data: ', err));
    },[]);

    // notificationBox action - OK
    const okActionButton = (key:number) => (
        <CloseActionButton keyObj={key} />
    );


    // event handlers
    const handleGroupCreate = (action: string) => {
        console.log('Action was a: ', action);
        if(action === 'success') {
            fetchAllGroups();
            enqueueSnackbar(`Group record created !`, {variant: 'info', action: okActionButton });
        } else if (action === 'failure') {
            enqueueSnackbar(`Error creating Group record...`, {variant: 'error', action: okActionButton });
        }
    };

    const handleGroupSearch = (data: ISearch) => {
        setGroupListContent(defaultGroupContent());
        searchByText(data)
            .then((res: any) => {
                console.log('Search Result is: ', res.data);
                if (res.data.length > 0) {
                    const list: JSX.Element[] = res.data?.map((item: any, index:number) => <GroupCard
                        key={index}
                        onEdit={handleGroupEdit}
                        onDelete={handleGroupDelete}
                        id={item._id}
                        title={item.title}
                        description={item.description}
                        slug={item.slug}
                        premium={item.premium}/>
                    );
                    setGroupListContent(<React.Fragment>
                        {list}
                    </React.Fragment>);
                } else {
                    setGroupListContent(<EmptySearchCard type="empty"/>);
                }
            });
    };

    const handleGroupEdit = (data: IGroup) => {
        // console.log('Group card to edit: ', data);
        setGroupModalData(data);
        setModal(true);
    };

    const handleSearchReset = () => {
        fetchAllGroups();
    };

    const handleGroupDelete = (id: string) => {
        deleteGroupById(id)
            .then((res: any) => {
                enqueueSnackbar(`Group record deleted !`, {variant: 'info', action: okActionButton });
                return fetchAllGroups();
            })
            .catch((err: any) => enqueueSnackbar(`Error deleting Group record...`,
                {variant: 'error', action: okActionButton }))
    };

    const handleGroupModalClose = (status: boolean, value: 'success' | 'failure' | 'cancel') => {
        console.log('Modal status is: ', status);
        if (value === 'success') {
            enqueueSnackbar(`Group record updated !`, {variant: 'info', action: okActionButton });
        } else if (value === 'failure') {
            enqueueSnackbar(`Error updating Group record...`, {variant: 'error', action: okActionButton });
        }
        setModal(status);
        return fetchAllGroups();
    };

    // component did mount
    useEffect(()=>{
        fetchAllGroups();
    },[]);

    return (
        <div className = {classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <GroupCreate onCreateGroup={handleGroupCreate}/>
                    <SearchCard table="groups" onSearch={handleGroupSearch} onReset={handleSearchReset}/>
                    {groupListContent}
                    <GroupUpdateModal
                        isOpen={isModal}
                        data={groupModalData}
                        onModalClose={handleGroupModalClose}/>
                </Grid>
            </div>
        </div>
    );
}

export default GroupView;