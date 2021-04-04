import React from 'react';
import './Btn.scss';

export const Btn = ({text, className, callback}) => {
    return (
        <button onClick={() => callback} className={`btn ${className}`}>
            {text}
        </button>
    );
};