import React from 'react';
import './styles.css';

interface AlertProps  {
    message: string | undefined;
}

const Alert:React.FC<AlertProps> = ({ message }) => {
    return(
    <div className="error" role="alert">
        <span>{message}</span>
    </div>
    )}

export default Alert;