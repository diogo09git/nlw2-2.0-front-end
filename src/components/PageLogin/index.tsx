import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface PageLoginProps {
    
}

const PageLogin: React.FC<PageLoginProps> = (props) => {

    return(
        <header className="page-login">
            <div className="header-content">
                <img src={logoImg} alt="Proffy"/>
                <strong>Sua plataforma de estudos online.</strong>
            </div>
            { props.children }
        </header>
    );

}

export default PageLogin;