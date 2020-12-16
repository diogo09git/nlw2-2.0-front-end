import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import pupleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import user from '../../assets/images/images.png';
import loggOff from '../../assets/images/icons/power2.svg';
import api from '../../services/api';

import './styles.css';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    });

    return(
        <div id="page-landing">
            <div id="page-landing-content">
                <div className="user-header">
                    <span className="user">
                        <img src={user} alt="Usuário"/>
                        Diogo Gonçalves
                    </span>

                    <span className="logout">
                        <img src={loggOff} alt="Sair"/>
                    </span>
                </div>

                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <p>Sua plataforma de estudos online.</p>
                </div>

                <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>
            </div>

                
                <div className="buttons-container">
                    <span className="welcome">
                        Seja bem-vindo. <strong>O que deseja fazer?</strong>
                    </span>

                    <span className="total-connections">
                        Total de {totalConnections} conexões já realizadas <img src={pupleHeartIcon} alt="Coraçao roxo"/>
                    </span>

                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar"/>
                        Dar aulas
                    </Link>
                </div>
        </div>
    )
}

export default Landing;

