/*
* PAJ - Helper Function for testing React component with Router and Context API
* */
import React from "react";
import {BrowserRouter, Router} from "react-router-dom";
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
// custom
import {initialState, AppDispatchContext, AppStateContext} from "../context/AppContext";

/**
 * PAJ - only for testing component render function
 * @param ui ReactElement
 */
export function addBrowserRouter (ui: React.ReactElement): JSX.Element {
    return (<AppStateContext.Provider value={initialState}>
            <AppDispatchContext.Provider value={jest.fn()}>
                <BrowserRouter>
                    {ui}
                </BrowserRouter>
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

/**
 * PAJ - only for rendering with testing-library render method
 * @param ui ReactElement
* */
export function renderWithRouter (ui: React.ReactElement) {
    const history = createMemoryHistory();
    return {
        ...render(
            <AppStateContext.Provider value={initialState}>
                <AppDispatchContext.Provider value={jest.fn()}>
                    <Router history={history}>
                        {ui}
                    </Router>
                </AppDispatchContext.Provider>
            </AppStateContext.Provider>
        )
    };
}