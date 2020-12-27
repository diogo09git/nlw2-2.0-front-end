import React, { useReducer, useState } from 'react';
import PageLogin from '../../components/PageLogin';
import { Link } from 'react-router-dom';
import InputLogin from '../../components/InputLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import loginReducer, { initialState } from '../useReducer';

import purple from '../../assets/images/icons/purple-heart.svg';
import check from '../../assets/images/icons/check.svg';

import './styles.css';
import Alert from '../../components/Alert';

function Login() {
    const[state, dispatch] = useReducer(loginReducer, initialState);
    const { email, password, isLoading, error, isLoggedIn } = state;

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
                        <Alert message="E-mail ou Senha inválidos !" />

                        <InputLogin
                            label="E-mail" 
                            value={email} 
                            onChange={e => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'email',
                                    payload: e.currentTarget.value,
                                })}
                        />
                        <InputLogin
                            type={ visible ? "text" : "password" }
                            label="Senha" 
                            value={password} 
                            onChange={e => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'password',
                                    payload: e.currentTarget.value,
                                })}
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