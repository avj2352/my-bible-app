import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
// styling
import { useStyles } from './scripture.view.style';
import { CssBaseline, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import CloseActionButton from "../../components/notifications/CloseActionButton";
import ItemCreate from "./create/ItemCreate";
import ItemListSkeleton from "./loading/ItemListSkeleton";
import { deleteItemById, getAllItems, searchByText } from '../../common/async/AsyncCalls';
import { ItemInterface } from './common/item-interface';
import ItemCard from './card/ItemCard';
import SearchCard from '../../components/search/SearchCard';
import { ISearch } from '../../components/search/search-interface';
import EmptySearchCard from '../../components/card/404/EmptySearchCard';
import ItemUpdateModal from './update/ItemUpdateModal';

const ScriptureView: FunctionComponent = (props): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar} = useSnackbar();
    const getDefaultListContent = (): JSX.Element => <React.Fragment>
            <ItemListSkeleton/>
            <ItemListSkeleton/>
            <ItemListSkeleton/>
    </React.Fragment>;
    // states
    const [itemListContent, setItemListContent] = useState<JSX.Element>(getDefaultListContent());
    const [isModal, setModal] = useState<boolean>(false);
    const [itemModalData, setItemModalData] = useState<ItemInterface>({
        id: '',
        name: '',
        description: '',
        html: ''
    });
    // notificationBox action - OK
    const okActionButton = (key: number) => (
        <CloseActionButton keyObj={key}/>
    );

    // event handlers
    const handleItemEdit = (data: ItemInterface) => {
        console.log('Item to edit', data);
        setItemModalData(data);
        setModal(true);
    };

    const handleItemDelete = (id: string) => {
        deleteItemById(id)
            .then((res: any) => {
                enqueueSnackbar(`Group record deleted !`, {variant: 'info', action: okActionButton });
                return fetchAllItems();
            })
            .catch((err: any) => enqueueSnackbar(`Error deleting Group record...`,
                {variant: 'error', action: okActionButton }))
    };

    // lifecycle methods
    const fetchAllItems = useCallback(()=>{
        setItemListContent(getDefaultListContent());
        getAllItems()
            .then((res: any) => {
                if (res.data.length > 0) {
                    // console.log('Item list is: ', res.data);
                    const list: JSX.Element[] = res.data?.map((item: any, index:number) => <ItemCard
                            key={index}
                            onEdit={handleItemEdit}
                            onDelete={handleItemDelete}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            html={item.html}/>
                        );
                        setItemListContent(<React.Fragment>
                            {list}
                        </React.Fragment>);
                } else {
                    setItemListContent(<EmptySearchCard type="empty"/>);
                }
            }).catch((err: any) => console.log('Error fetching data: ', err));
    },[]);

    // event handlers
    const handleItemCreate = (action: string) => {
        // console.log('Action was a: ', action);
        if(action === 'success') {
            enqueueSnackbar(`Item record created !`, {variant: 'info', action: okActionButton });
            return fetchAllItems();
        } else if (action === 'failure') {
            enqueueSnackbar(`Error creating Item record...`, {variant: 'error', action: okActionButton });
        }
    };

    const handleItemSearch = (data: ISearch) => {
        setItemListContent(getDefaultListContent())
        searchByText(data)
            .then((res: any) => {
                // console.log('Search Result is: ', res.data);
                if (res.data.length > 0) {
                    const list: JSX.Element[] = res.data?.map((item: any, index:number) => <ItemCard
                        key={index}
                        onEdit={handleItemEdit}
                        onDelete={handleItemDelete}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        html={item.html}/>
                    );
                    setItemListContent(<React.Fragment>
                        {list}
                    </React.Fragment>);
                } else {
                    setItemListContent(<EmptySearchCard type="empty"/>);
                }
            }).catch((err: any) => console.log('Error fetching data: ', err));
    };

    const handleItemReset = () => {
        fetchAllItems();
    };

    const handleItemModalClose = (status: boolean, value: 'success' | 'failure' | 'cancel') => {
        // console.log('Modal status is: ', status);
        if (value === 'success') {
            enqueueSnackbar(`Tag record updated !`, {variant: 'info', action: okActionButton });
        } else if (value === 'failure') {
            enqueueSnackbar(`Error updating Tag record...`, {variant: 'error', action: okActionButton });
        }
        setModal(status);
        return fetchAllItems();
    };

    // component did mount
    useEffect(()=>{
        fetchAllItems();
    },[]);

    return (
        <div className = {classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <ItemCreate onCreateItem={handleItemCreate}/>
                    <SearchCard table="items" onSearch={handleItemSearch} onReset={handleItemReset}/>
                    {itemListContent}
                    <ItemUpdateModal isOpen={isModal} data={itemModalData} onModalClose={handleItemModalClose}/>
                </Grid>
            </div>
        </div>
    );
}

export default ScriptureView;