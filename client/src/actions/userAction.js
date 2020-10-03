import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/auth';

export const registerUser = (data) => {
    alert("first "+data.email);
    return dispatch => {
        axios.post(backEndUrl + '/register', data)
            .then(res => {
            alert("second "+res.data.email);
                dispatch(logIn(res.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(authError(error.response.data.message))

                } else {

                    dispatch(authError(error.message))
                }
            })
    }
}

export const savedUser = (token) => {
    return dispatch => {
        axios.get(backEndUrl + '/getUser',
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch(logIn(res.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(authError(error.response.data.message))

                } else {

                    dispatch(authError(error.message))
                }
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

