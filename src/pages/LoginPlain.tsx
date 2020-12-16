import React, { useReducer } from 'react';
import { login } from './login';
import loginReducer, { initialState } from './useReducer';

export default function LoginPlain() {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    
    const { username, password, isLoading, error, isLoggedIn } = state;
    console.log(username);

    // const onSubmit = async e => {
    //     e.preventDefault();

    //     dispatch({ type: 'login' });

    //     try{
    //         await login({ username, password });
    //         dispatch({ type: 'success' });
    //     } catch(error) {
    //         dispatch({ type: 'error' });
    //     }
    // }

    async function loading(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: 'login' });

        try{
            await login( username, password );
            dispatch({ type: 'success' });
        } catch(error) {
            dispatch({ type: 'error' });
        }
    }
return (
    <div>
        {isLoggedIn ? (
            <>
                <h1>welcome {username}</h1>
                <button onClick={() => dispatch({ type: 'logout'})}>Logout</button>
            </>
        ) : ( 
        <form onSubmit={loading}>
            {error && <p>{error}</p>}
            <input 
                type="text" 
                value={username}
                onChange={e => 
                    dispatch({
                        type: 'field',
                        fieldName: 'username',
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