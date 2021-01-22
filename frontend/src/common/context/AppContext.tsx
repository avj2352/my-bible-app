import React, { FunctionComponent, createContext, useReducer, useContext } from 'react';

export interface IAppContextState {
    profile: any;
    theme: 'light' | 'dark';
    version: string;
    title: string;
}

export enum CONTEXT_ACTION_TYPE {
    THEME_TOGGLE,
    SET_VERSION,
    SET_PROFILE_DATA
}

export const initialState: IAppContextState = {
    profile: undefined,
    theme: 'light',
    version: '0.4',
    title: 'B.O.R.E.D'
};

export const AppStateContext = createContext<IAppContextState>(initialState); // Separate context for storing state
export const AppDispatchContext = createContext({}); // Separate context for updating state

const appContextReducer = (state: IAppContextState, action: {type: CONTEXT_ACTION_TYPE, payload: any}): any => {
    const { type, payload } = action;
    switch (type) {
        case CONTEXT_ACTION_TYPE.SET_PROFILE_DATA:
            return { ...state, profile: payload };
        case CONTEXT_ACTION_TYPE.THEME_TOGGLE:            
            if (payload) return {...state, theme: 'dark'};
            else return {...state, theme: 'light'};
        case CONTEXT_ACTION_TYPE.SET_VERSION:
            return { ...state, version: payload};
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

export const AppContextProvider: FunctionComponent<any> = ({children}): JSX.Element => {
    const [state, dispatch] = useReducer(appContextReducer, initialState);
    return (<React.Fragment>
            <AppStateContext.Provider value={state}>
                <AppDispatchContext.Provider value={dispatch}>
                    {children}
            </AppDispatchContext.Provider>
            </AppStateContext.Provider>
        </React.Fragment>);
};

// Custom Hooks
export const useGlobalState  = () => useContext(AppStateContext);
export const useGlobalDispatch =  () => useContext(AppDispatchContext);