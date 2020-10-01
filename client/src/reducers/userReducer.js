const initState = {
    isLoggedin: false,
    id: '',
    name: '',
    imageUrl: '',
    token: ''
}

export default function userReducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_USER':
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isLoggedin: true
            }

        case 'GET_USER':
            return {
                ...state,
            }
        case 'LOGOUT_USER':
            localStorage.clear();
            return {
                ...state,
                isLoggedin: false,
                id: '',
                name: '',
                imageUrl: '',
                token: ''
            }

        default:
            return {
                ...state
            };
    }

}
