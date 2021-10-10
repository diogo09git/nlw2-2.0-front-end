import React from 'react';
import PageLogin from '../../components/PageLogin';
import { Link } from 'react-router-dom';
import Conclusion from '../../components/Conclusion';
import InputLogin from '../../components/InputLogin';

import backIcon from '../../assets/images/icons/back2.svg';

import './styles.css';

function ForgetPass() {
    return(
        <div className="page-forget">
            <PageLogin/>

            <main>
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                </div>
                <fieldset>
                    <form action="">
                        <legend>Eita, esqueceu sua senha ?</legend>
                        <p>Não esquenta, vamos dar um jeito nisso.</p>

                        <InputLogin
                            name="email"
                            label="E-mail"
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </fieldset>
            </main>
        </div>
    );
}

export default ForgetPass;

export const ForgetConc = () => {
    return(
        <div className="page-forget">
            <Conclusion
                title="Redefinição enviada!"
                description="Boa, agora é só checar o e-mail que foi enviado para você
                redefinir sua senha e aproveitar os estudos."
                buttonName="Voltar ao login"
                to="/login"
            />
        </div>
    );
}