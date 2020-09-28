import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/auth';

export const setLogginUser = (data) => {
    return dispatch => {
        axios.post(backEndUrl + '/login', data)
            .then(res => {
                dispatch(logIn(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authError(err.response.data.message));
            })
    }
}

export const getUser = (data) => {
    return dispatch => {
        axios.get(backEndUrl + '/user/' + data)
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

