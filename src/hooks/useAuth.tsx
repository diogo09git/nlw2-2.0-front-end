
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AUTH_ENDPOINT, CREDENTIALS_NAME } from '../Utils/constants';

type Credentials = {
    username: string;
    token: string;
    name: string;
}

export const useAuth = () => {
    const [credentials, setCredentials] = useState<Credentials>({ username: '', token: '', name: '' });

    useEffect(() => {
        loadCredentials();
    },[])

    const login = async (email:string, password:string): Promise<void> => {
        try {
            const response = await axios.post(`${AUTH_ENDPOINT}/login`, { email: email, password: password })
            const token = response.headers['authorization'].replace('Bearer ', '');
            storeCredentials(token);
            
        } catch (error) {
            Promise.reject(error);
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

    return { login, logout, isAuthenticated, credentials };
}