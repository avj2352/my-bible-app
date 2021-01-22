import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// custom
import { AppContextProvider } from "./common/context/AppContext";
import App from './app/App';
// service-worker
import * as serviceWorker from './serviceWorker';
ReactDOM.render (
                <AppContextProvider>
                    <App/>
                </AppContextProvider>,
                document.getElementById('root')
);
// console.log('Axios default base URL is: ', axios.defaults);
serviceWorker.unregister();
