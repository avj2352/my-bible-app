import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import { fireEvent, wait } from '@testing-library/react';
// custom
import App from './App';
import { addBrowserRouter } from "../common/util/RouterHelper";

/**
* TDD Objectives
* 1. // Check if the Component Renders without any issues
**/

describe(' App - Component renders ', ()=>{
  it ('...without crashing', () => {
      const div = document.createElement('div');
      ReactDom.render(addBrowserRouter(<App/>), div);
      ReactDom.unmountComponentAtNode(div);
  });
});
