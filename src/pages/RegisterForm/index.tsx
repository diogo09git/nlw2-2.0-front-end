import React, { useState } from 'react';
import PageLogin from '../../components/PageLogin';
import InputLogin from '../../components/InputLogin';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

import backIcon from '../../assets/images/icons/back2.svg';

import './styles.css';

interface FormValues {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

const initialValues: FormValues = {
    name: '',
    lastName: '',
    email: '',
    password: ''
}

const RegisterForm: React.FC<FormikProps<FormValues>> = () => {

    const auth = useAuth();
    const [visible, setVisible] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye}/>
    const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

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
            email: Yup.string()
                .email('Tente um email válido')
                .required('Insira seu e-mail'),
            password: Yup.string()
                .required('Insira sua senha')
                .max(12, 'Tente uma senha menor')
                .min(4, 'Senha muito curta, tente novamente')
        }),
        onSubmit: values => {
            auth.registerUser(values);
        }
    })

    if(auth.processing) {
        return <Redirect to="/conclusion-reg"/>
    }

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

                        { formik.errors.email && formik.touched.email &&
                            <div className="error">
                                <span>{ formik.errors.email }</span>
                            </div>
                        }
                        <InputLogin
                            label="E-mail"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
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

                        {auth.error && <div className="error">{ auth.error }</div>}

                        <button type="submit">Concluir cadastro</button>
                    </form>
                </fieldset>
            </main>
        </div>
    );
}

export default RegisterForm;
