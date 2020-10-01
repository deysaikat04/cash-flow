import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/auth';

export const registerUser = (data) => {
    return dispatch => {
        axios.post(backEndUrl + '/register', data)
            .then(res => {
                dispatch(logIn(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authError(err.response.data.message));
            })
    }
}

export const savedUser = (data) => {
    return dispatch => {
        axios.post(backEndUrl + '/getUser', data)
            .then(res => {
                dispatch(logIn(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authError(err.response.data.message));
            })
    }
}

export const logIn = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const logOut = () => {
    return {
        type: 'LOGOUT_USER'
    }
}



export const authError = (error) => {
    return {
        type: 'AUTH_ERROR',
        payload: error
    }
}

