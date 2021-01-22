/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, {FunctionComponent, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {AppDispatchContext, AppStateContext} from "../../../common/context/AppContext";

export type IDashboardRouterContextState = {
    name: DASHBOARD_ROUTES,
    history: any[],
};

export enum DASHBOARD_ROUTES {
    WELCOME = '',
    ABOUT = 'about',
    LOGIN = 'login',
    LIST = 'list',
    RECIPES = 'recipes',
    NEW_RECIPES = 'newRecipes',
    UPDATE_RECIPES = 'updateRecipes',
    LIST_RECIPES = 'listRecipes',
    MY_RECIPES = 'myRecipes',
    PREVIEW_RECIPE = 'previewRecipe',
    SEARCH_RECIPES = 'searchRecipes',
    GROUPS = 'groups',
    TAGS = 'tags',
    ITEMS = 'items'
};

const contextDefaultState: IDashboardRouterContextState = {
    name: DASHBOARD_ROUTES.WELCOME,
    history: [],
}

export const DashboardRouterStateContext = React.createContext<IDashboardRouterContextState>(contextDefaultState); // Separate context for storing state

export const DashboardRouterDispatchContext = React.createContext({}); // Separate context for updating state

const useDashboardRouterContextReducer = (state: IDashboardRouterContextState, action: {type: DASHBOARD_ROUTES, payload?: any}): any => {
    const {history} = state;
    let location: { pathname: string; };

    switch (action.type) {
        case DASHBOARD_ROUTES.WELCOME:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.WELCOME}`);
            location = {
                pathname: `/app`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.WELCOME};

        case DASHBOARD_ROUTES.ABOUT:
            location = {
                pathname: `/about`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.ABOUT};

        case DASHBOARD_ROUTES.LOGIN:
            location = {
                pathname: `/login`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.LOGIN};

        case DASHBOARD_ROUTES.LIST:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.LIST}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.LIST}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.LIST};

        case DASHBOARD_ROUTES.RECIPES:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.RECIPES}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.RECIPES}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.RECIPES};

        case DASHBOARD_ROUTES.GROUPS:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.GROUPS}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.GROUPS}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.GROUPS};

        case DASHBOARD_ROUTES.TAGS:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.TAGS}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.TAGS}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.TAGS};

        case DASHBOARD_ROUTES.ITEMS:
            // console.log(`Dispatch Route: ${DASHBOARD_ROUTES.ITEMS}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.ITEMS}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.ITEMS};

        case DASHBOARD_ROUTES.NEW_RECIPES:
            location = {
                pathname: `/app/recipes/add`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.NEW_RECIPES};

        case DASHBOARD_ROUTES.UPDATE_RECIPES:
            location = {
                pathname: `/app/recipes/update/${action.payload}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.UPDATE_RECIPES};

        case DASHBOARD_ROUTES.LIST_RECIPES:
            console.log('Routing to List Recipes: ', action.payload);
            location = {
                pathname: `/app/recipes/list/${action.payload}`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.LIST_RECIPES};

        case DASHBOARD_ROUTES.MY_RECIPES:
            console.log('Routing to List Recipes: ', action.payload);
            location = {
                pathname: `/app/recipes/profile`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.MY_RECIPES};

        case DASHBOARD_ROUTES.SEARCH_RECIPES:
            location = {
                pathname: `/app/recipes/search`
            };
            history.push(location);
            return {...state, name: DASHBOARD_ROUTES.SEARCH_RECIPES};

        case DASHBOARD_ROUTES.PREVIEW_RECIPE:
            location = {
                pathname: `/app/recipes/detail/${action.payload}`
            };
            history.push(location);
            return  {...state, name: DASHBOARD_ROUTES.PREVIEW_RECIPE};

        default:
            throw new Error(`Sorry...Unknown Dashboard Route Name: ${action.type}`);
    }
};

export const DashboardRouterContextProvider: FunctionComponent<any> = ({children}) => {
    const history = useHistory();

    const [state, dispatch] = React.useReducer( useDashboardRouterContextReducer, {
        name: DASHBOARD_ROUTES.WELCOME,
        history: history,
    });
    return (
        <DashboardRouterStateContext.Provider value={state}>
            <DashboardRouterDispatchContext.Provider value={dispatch}>
                {children}
            </DashboardRouterDispatchContext.Provider>
        </DashboardRouterStateContext.Provider>
    );
};

// Custom Hooks
export const useDashboardRouteState  = () => useContext(DashboardRouterStateContext);
export const useDashboardRouteDispatch =  () => useContext(DashboardRouterDispatchContext);
