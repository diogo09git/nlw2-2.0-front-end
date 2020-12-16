import React, { useState } from 'react';
import PageLogin from '../../components/PageLogin';
import { Link } from 'react-router-dom';
import InputLogin from '../../components/InputLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import purple from '../../assets/images/icons/purple-heart.svg';
import check from '../../assets/images/icons/check.svg';

import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [visible, setVisible] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye}/>;
    const eyeSlah = <FontAwesomeIcon icon={faEyeSlash}/>;

    const handleVisible = () => {
        setVisible(visible ? false : true);
    }

    const handleRememberCheck = () => {
        setRemember(true);
    }

return(
    <div id="page-login-form">
        <PageLogin>
            <main>
                <fieldset>
                    <form action="">
                        <legend>Fazer login</legend>
                        <InputLogin 
                            name="email" 
                            label="E-mail" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <InputLogin
                            type={ visible ? "text" : "password" }
                            label="Senha" 
                            name="senha"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <i onClick={ handleVisible }>{ visible ? eye : eyeSlah }</i>
                        
                        <div className="input-check">
                            <Link to="" className="password">
                                Esqueci minha senha
                            </Link>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span className="overlay">
                                    <img src={check} alt="remember"/>
                                </span>
                                Lembrar-me
                            </label>
                        </div>

                        <button type="submit">Entrar</button>
                    </form>

                    <footer>
                        <p>
                            Não tem conta ?
                            <Link to="" className="">
                                Cadastre-se
                            </Link>
                        </p>
                        <span>
                            É de graça &nbsp;
                            <img src={purple} alt="heart"/>
                        </span>
                    </footer>
                </fieldset>
            </main>
        </PageLogin>
    </div>
);}

export default Login;