import axios, { AxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AUTH_ENDPOINT, CREDENTIALS_NAME } from '../Utils/constants';

interface User {
    username: string;
    token: string;
    name: string;
}

interface AuthContextData {
    login(email: string, passord: string): void;
    registerUser(user: {
        name: string,
        lastName: string,
        email: string,
        password: string
    }): void
    logout(): void;
    isAuthenticated(): boolean;
    error: string;
    processing: boolean;
    credentials: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [credentials, setCredentials] = useState<User>({ username: '', token: '', name: '' });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCredentials();
    },[])

    const login = async (email:string, password:string): Promise<void> => {
        setProcessing(true);

        try {
            const response = await axios.post(`${AUTH_ENDPOINT}/login`, { email: email, password: password })
            const token = response.headers['authorization'].replace("Bearer", "");
            storeCredentials(token);
            setProcessing(false);
            
        } catch (error) {
            setError('E-mail e ou senha inválidos !');
            setProcessing(false);
        }
    }

    const registerUser = async (userToSave:{name: string, lastName: string, email: string, password: string}) => {
        try {
            setError('');
            await axios.post(`${AUTH_ENDPOINT}/api/users`, userToSave);
            setProcessing(true);
        } catch (error) {
            handleError(error);
        }
    }

    const storeCredentials = (token: string): void => {
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const userInfo = { username: tokenData.sub, name: tokenData.name, token: token };
        sessionStorage.setItem(CREDENTIALS_NAME, JSON.stringify(userInfo));
        setCredentials(userInfo);
    }

    const loadCredentials = (): void => {
        const storedCredentials = sessionStorage.getItem(CREDENTIALS_NAME);

        if(storedCredentials !== null) {
            setCredentials(JSON.parse(storedCredentials));
        }
    }

    const logout = (): void => {
        sessionStorage.removeItem(CREDENTIALS_NAME);
        setCredentials({ username: '', token: '', name: '' });
    }

    const isAuthenticated = (): boolean => {
        return sessionStorage.getItem(CREDENTIALS_NAME) !== null;
    }

    const handleError = (error: AxiosError): any => {
        const resp = error.response;

        if(resp && resp.status === 400 && resp.data) {
            setError(resp.data.error);
        } else {
            setError("Servidor fora de serviço, tente mais tarde");
        }
    }

    return(
        <AuthContext.Provider
            value={{ login, logout, isAuthenticated, error, credentials, processing, registerUser }}
        >
            {children}

        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
