import axios from 'axios';


export const registerUser = (data) => {
    return dispatch => {
        axios.post('/api/auth/register', data)
            .then(res => {
                dispatch(logIn(res.data));
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    dispatch(authError(error.response.data.message))

                } else {
                    dispatch(authError(error.message))
                }
            })
    }
}

export const savedUser = (token) => {
    return dispatch => {
        axios.get('/api/getUser',
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

