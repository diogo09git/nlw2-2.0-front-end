import React from 'react';

interface AlertProps  {
    message: string;
}

const Alert:React.FC<AlertProps> = ({ message }) => {
    return(
    <div role="alert">
        <span>{message}</span>
    </div>
    )}

export default Alert;