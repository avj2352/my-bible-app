import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const RouterHandler: FunctionComponent = (props): JSX.Element => {
    const history = useHistory();
    // componentDidMount
    useEffect(()=>{
        const location = window.location;
        let path: any;
        if (location.href && location.href.includes('preview/')) {
            const index = location.href.indexOf('preview/')
            const previewId = location.href.substring(index+8, location.href.length);
            path = {
                pathname: `/preview/${previewId}`
            };            
        } else {
            path = {
                pathname: `/login`
            };            
        }
        history.push(path);
    },[]);
    return (
        <React.Fragment></React.Fragment>
    );
};

export default RouterHandler;