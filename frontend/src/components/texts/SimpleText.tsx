import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';

interface ISimpleTextProps {
    content: string;
};


const SimpleText: FunctionComponent<ISimpleTextProps> = (props): JSX.Element => {
    return (
        <Typography color="primary" variant="h5" align="center" paragraph>
           {props.content}   
        </Typography>
    );
};

export default SimpleText;