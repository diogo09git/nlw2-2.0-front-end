import React, { FormEvent, useState } from 'react';
import { FormikHelpers, FormikProps, FormikValues, useFormik, withFormik } from 'formik';
import * as Yup from 'yup';
import { login } from './login';
import { useHistory } from 'react-router-dom';

interface FormValues {
    login: string;
    password: string;
  }

const initial: FormValues = {
  login: '',
  password: '',
}
  
  const InnerForm: React.FC<FormikProps<FormValues>> = () => {
    const history = useHistory();

    const formik = useFormik({
      initialValues: initial,
      validationSchema: Yup.object().shape({
        login: Yup.string()
          .max(5, 'Please input 5 characters or less')
          .email('error')
          .required('Please input login name'),
        password: Yup.string()
          .max(5, 'Please input 5 charecters or less')
          .required('Please input a password'),
        }),
        onSubmit(values){
          login(values.login, values.password);
          history.push('/conclusion-reg');
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
          <input
            id="login"
            placeholder="User name..."
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          { formik.touched.login && formik.errors.login &&
          <div>{formik.errors.login}</div> }
          <br/>
          <input type="text"
            id="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          { formik.touched.password && formik.errors.password && 
            <div>{formik.errors.password}</div>}<br/>
          <button
            type="submit"
          >
            Submit
          </button>
        </form>
  )};
  
  // const UserSearchForm = withFormik<MyFormValues, FormValues>({
  //   mapPropsToValues: props => ({
  //     login: props.initialLogin || '',
  //     password: '',
  //   }),
  //   validationSchema: Yup.object().shape({
  //     login: Yup.string()
  //       .max(16, 'Please input 16 characters or less')
  //       .required('Please input login name'),
  //     password: Yup.string()
  //       .max(5, 'Please input 5 charecters or less')
  //       .required('Please input a password'),
  //     }),
    
  //   handleSubmit(values, {props} ) {
  //     login(values.login, values.password);
      
  //   }
  // })(InnerForm);
  
  export default InnerForm;