
interface LoginState  {
    username: string;
    password: string;
    isLoading: boolean;
    error: string;
    isLoggedIn: boolean;
}

type LoginAction = 
    { type: 'login' | 'success' | 'error' | 'logout' } |
    { type: 'field'; fieldName: string; payload: string };

export const initialState: LoginState = {
        username: '',
        password: '',
        isLoading: false,
        error: '',
        isLoggedIn: false,
    }

export default function loginReducer(state: LoginState, action: LoginAction){
    switch(action.type){
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        }
        case 'login': {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case 'error': {
            return {
                ...state,
                error: 'Incorrect username or password',
                isLoading: false,
                username: '',
                password: '',
            };
        }
        case 'logout': {
            return{
                ...state,
                isLoggedIn: false,
                isLoading: false,
                username: '',
                password: '',
            };
        }
        default:
            return state;
    }
}
