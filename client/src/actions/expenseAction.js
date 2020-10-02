import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/transactions';

export function getMonthsTransactions(token, month) {
    return dispatch => {
        let url = `${backEndUrl}/monthly/${month}`;
        axios.get(url,
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch(monthExpenses(res.data));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(expensesError(err.response.data.message));
                } else {
                    dispatch(expensesError(err.message));
                }
            })
    }
}

export function getAllTransactions(token) {

    return dispatch => {
        let url = `${backEndUrl}/all`;
        axios.get(url,
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch(allExpenses(res.data));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(expensesError(err.response.data.message));
                } else {
                    dispatch(expensesError(err.message));
                }
            })
    }
}

export function addTransactions(token, data) {

    return dispatch => {
        let url = `${backEndUrl}/add`;
        axios.post(url, data,
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch(setExpenses(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(expensesError(err.response.data.message));
            })
    }
}


export const allExpenses = (data) => {
    return {
        type: 'GET_EXPENSES',
        payload: data
    }
}

export const monthExpenses = (data) => {
    return {
        type: 'SET_EXPENSES_MONTH',
        payload: data
    }
}

export const setExpenses = (data) => {
    return {
        type: 'SET_EXPENSES',
        payload: data
    }
}

export const expensesError = (data) => {
    return {
        type: 'EXPENSES_ERROR',
        payload: data
    }
}