const initState = {
    isLoggedin: false,
    id: '',
    name: '',
    email: '',
    imageUrl: '',
    googleId: ''
}

export default function userReducer(state = initState, action) {

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload,
                isLoggedin: true
            }

        case 'GET_USER':
            return {
                ...state,
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                isLoggedin: false,
                id: '',
                name: '',
                email: '',
                imageUrl: '',
                googleId: ''
            }

        default:
            return {
                ...state
            };
    }

}
