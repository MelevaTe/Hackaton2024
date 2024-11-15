import React from 'react';
import classes from './OgInput.module.css';

const OgInput = (props) => {
    return (
        <input className={classes.OgInput} {...props}/>
    );
};



export default OgInput;
