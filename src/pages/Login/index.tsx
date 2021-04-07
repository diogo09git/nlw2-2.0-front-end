import React, { useState } from 'react';
import PageLogin from '../../components/PageLogin';
import { Link, Redirect } from 'react-router-dom';
import InputLogin from '../../components/InputLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../hooks/useAuth';

import purple from '../../assets/images/icons/purple-heart.svg';
import check from '../../assets/images/icons/check.svg';
import Alert from '../../components/Alert';

import './styles.css';

const Login = () => {

    const auth = useAuth();
    const [userForm, setUserForm] = useState({ email: '', passord: '' });
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        auth.login(userForm.email, userForm.passord);
    }

    if(auth.isAuthenticated()) {
        return <Redirect to="/" />
    }

return(
    <div id="page-login-form">
        <PageLogin>
            <main>
                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <legend>Fazer login</legend>
                        {auth.error && <Alert message={auth.error} /> }

                        <InputLogin
                            label="E-mail" 
                            value={userForm.email} 
                            onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                        />
                        <InputLogin
                            type={ visible ? "text" : "password" }
                            label="Senha" 
                            value={userForm.passord} 
                            onChange={e => setUserForm({ ...userForm, passord: e.target.value })}
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
                            <Link to="/register"> 
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