import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import RegisterForm, { RegisterConc } from './pages/RegisterForm';
import ForgetPass, { ForgetConc } from './pages/ForgetPass';
import { AuthProvider } from './hooks/useAuth';

const Routes = () => {
    return(
        <AuthProvider>
            <BrowserRouter>
                <Route path="/" exact component={Landing} />
                <Route path="/study" component={TeacherList} />
                <Route path="/register-teacher" component={TeacherForm} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={RegisterForm}/>
                <Route path="/conclusion-reg" component={RegisterConc}/>
                <Route path="/forget" component={ForgetPass}/>
                <Route path="/conclusion-forg" component={ForgetConc}/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routes;