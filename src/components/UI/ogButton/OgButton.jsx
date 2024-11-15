import React from 'react';
import classes from './OgButton.module.css';

const OgButton = ({ children, isActive, additionalClass, ...props }) => {
    return (
        <button
            {...props}
            className={`${classes.ogBtn} ${isActive ? classes.active : ''} ${additionalClass || ''}`}
        >
            {children}
        </button>
    );
};

export default OgButton;

