import React, { useState } from 'react';
import PageLogin from '../../components/PageLogin';
import InputLogin from '../../components/InputLogin';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Conclusion from '../../components/Conclusion';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import backIcon from '../../assets/images/icons/back2.svg';

import './styles.css';

interface FormValues {
    name: string;
    lastName: string;
    eMail: string;
    password: string;
}

const initialValues: FormValues = {
    name: '',
    lastName: '',
    eMail: '',
    password: ''
}

const RegisterForm: React.FC<FormikProps<FormValues>> = () => {

    const [visible, setVisible] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye}/>
    const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

    const history = useHistory();

    const handleVisible = () => {
        setVisible(visible ? false : true);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Insira seu nome')
                .max(12, 'Tente um nome menor'),
            lastName: Yup.string()
                .required('Insira seu sobrenome')
                .max(12, 'Tente um sobrenome menor'),
            eMail: Yup.string()
                .email('Tente um email válido')
                .required('Insira seu e-mail'),
            password: Yup.string()
                .required('Insira sua senha')
                .max(12, 'Tente uma senha menor')
                .min(4, 'Senha muito curta, tente novamente')
        }),
        onSubmit() {
            history.push('/');
        }
    })

    return(
        <div className="page-register">
            <PageLogin />

            <main>
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                </div>
                <fieldset>
                    <form onSubmit={formik.handleSubmit}>
                        <legend>Cadastro</legend>
                        <p>Preencha os dados abaixo para começar.</p>

                        { formik.errors.name && formik.touched.name && 
                            <div className="error">
                                <span>{ formik.errors.name }</span> 
                            </div>
                        }
                        <InputLogin
                            label="Nome"
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />   

                        { formik.errors.lastName && formik.touched.lastName &&
                            <div className="error">
                                <span>{ formik.errors.lastName }</span>
                            </div>
                        }
                        <InputLogin
                            label="Sobrenome"
                            id="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />

                        { formik.errors.eMail && formik.touched.eMail &&
                            <div className="error">
                                <span>{ formik.errors.eMail }</span>
                            </div>
                        }
                        <InputLogin
                            label="E-mail"
                            id="eMail"
                            onChange={formik.handleChange}
                            value={formik.values.eMail}
                        />

                        { formik.errors.password && formik.touched.password && 
                            <div className="error">
                                <span>{ formik.errors.password }</span> 
                            </div>
                        }
                        <InputLogin
                            type={ visible ? "text" : "password" }
                            name="senha"
                            label="Senha"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        /> 
                        <i onClick={ handleVisible }>{ visible ? eye : eyeSlash }</i>

                        <button type="submit">Concluir cadastro</button>
                    </form>
                </fieldset>
            </main>
        </div>
    );
}

export default RegisterForm;

export const RegisterConc = () => {
    return(
        <Conclusion 
            title="Cadastro concluído" 
            description="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência." 
            buttonName="Login"
        />
    );
}
