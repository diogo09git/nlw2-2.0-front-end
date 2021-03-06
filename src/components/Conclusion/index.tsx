import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';
import './styles.css';

interface ConclusionProps {
    title: string;
    description: string;
    buttonName: string;
    to: string;
}

const Conclusion: React.FC<ConclusionProps> = ({ title, description, buttonName, to }) => {
    return(
        <div className="page-finish">
            <div className="finish-container">
                <img src={successIcon} alt="Success"/>
                <h1>{ title }</h1>
                <p>{ description }</p>
                <Link to={ to }>
                    <button type="button">{ buttonName }</button>
                </Link>
            </div>
        </div>
    );
}

export default Conclusion;