const initState = {
    isLoggedin: false,
    name: '',
    token: '',
    error: false,
    errorMsg: ''
}

export default function userReducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_USER':
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isLoggedin: true,
                error: false,
                errorMsg: ''
            }

        case 'GET_USER':
            return {
                ...state,
            }
        case 'LOGOUT_USER':
            sessionStorage.clear();
            return {
                ...state,
                isLoggedin: false,
                id: '',
                name: '',
                token: false,
                errorMsg: ''
            }
        case 'AUTH_ERROR':
            // sessionStorage.clear();
            return {
                ...state,
                isLoggedin: false,
                error: true,
                errorMsg: payload
            }
        case 'RESET_AUTH_ERROR':
            // sessionStorage.clear();
            return {
                ...state,
                error: false,
                errorMsg: ''
            }

        default:
            return {
                ...state
            };
    }

}
