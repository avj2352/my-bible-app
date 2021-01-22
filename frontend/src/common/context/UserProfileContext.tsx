/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent, useEffect } from 'react';

export interface IUserProfileState {
    id: string;
    token: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export enum CONTEXT_ACTION_TYPE {
    UPDATE_ALL = 'update_all',
    USER_DETAILS = 'user_details',
};

export const UserProfileState = React.createContext<IUserProfileState>({
    id: '',
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
}); // Separate context for storing state

export const UserProfileDispatch = React.createContext({}); // Separate context for updating state

const userProfileReducer = (state: IUserProfileState, action: {type: CONTEXT_ACTION_TYPE, payload: any}): any => {
    switch (action.type) {
        case CONTEXT_ACTION_TYPE.UPDATE_ALL:
            // console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.UPDATE_ALL}`);
            return { 
                id: action.payload.id, 
                username: action.payload.username, 
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName,
                password: action.payload.password,
            };
        case CONTEXT_ACTION_TYPE.USER_DETAILS:
            // console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.USER_DETAILS}`);
            return { ...state, 
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName, 
                username: action.payload.username
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export interface IUserProfileProps {
    id: string;
    token: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const UserProfileContextProvider: FunctionComponent<IUserProfileProps> = (props) => {
    const { id, token, username, firstName, lastName, password } = props;

    const [state, dispatch] = React.useReducer( userProfileReducer, {
        id,
        token,
        username,
        firstName,
        lastName,
        password,
    });

    // componentDidMount
    useEffect(()=>{
        dispatch({
            type: CONTEXT_ACTION_TYPE.UPDATE_ALL,
            payload: {
                id: props.id,
                username: props.username,
                firstName: props.firstName,
                lastName: props.lastName,
                password: ''
            }
        });
    },[props]);

    return (
        <UserProfileState.Provider value={state}>
            <UserProfileDispatch.Provider value={dispatch}>
                {props.children}
            </UserProfileDispatch.Provider>
        </UserProfileState.Provider>
    );
};