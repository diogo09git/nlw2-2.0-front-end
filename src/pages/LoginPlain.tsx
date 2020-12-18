import React, { useReducer } from 'react';
import { login } from './login';
import loginReducer, { initialState } from './useReducer';

export default function LoginPlain() {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    
    const { email, password, isLoading, error, isLoggedIn } = state;
    console.log(email);

    // const onSubmit = async e => {
    //     e.preventDefault();

    //     dispatch({ type: 'login' });

    //     try{
    //         await login({ email, password });
    //         dispatch({ type: 'success' });
    //     } catch(error) {
    //         dispatch({ type: 'error' });
    //     }
    // }

    async function loading(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: 'login' });

        try{
            await login( email, password );
            dispatch({ type: 'success' });
        } catch(error) {
            dispatch({ type: 'error' });
        }
    }
return (
    <div>
        {isLoggedIn ? (
            <>
                <h1>welcome  {email}</h1>
                <button onClick={() => dispatch({ type: 'logout'})}>Logout</button>
            </>
        ) : ( 
        <form onSubmit={loading}>
            {error && <p>{error}</p>}
            <input 
                type="text" 
                value= {email}
                onChange={e => 
                    dispatch({
                        type: 'field',
                        fieldName: 'email',
                        payload: e.currentTarget.value,
                    })}
            /><br/>
            <input 
                type="password" 
                value={password}
                onChange={e => 
                    dispatch({
                        type: 'field',
                        fieldName: 'password',
                        payload: e.currentTarget.value,
                    })}
            />
            <button type="submit">
                {isLoading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
        )}
    </div>
);}