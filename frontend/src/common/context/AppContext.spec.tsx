import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import { fireEvent, wait } from '@testing-library/react';
// custom
import { AppContextProvider } from './AppContext';
import { addBrowserRouter } from "../util/RouterHelper";

/**
 * TDD Objectives
 * 1. // Check if the Component Renders without any issues
 **/

describe(' AppContextProvider - Component renders ', ()=>{
    it ('...without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(addBrowserRouter(<div>AppContext's children are part of addBrowserRouter helper method already!</div>), div);
        ReactDom.unmountComponentAtNode(div);
    });
});
