import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/transactions';

export function getMonthsTransactions(userId, month) {
    return dispatch => {
        axios.get(backEndUrl + `/monthly/${userId}/${month}`)
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

export function getAllTransactions(userId) {
    return dispatch => {
        axios.get(backEndUrl + `/all/${userId}`)
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

export function addTransactions(data) {

    return dispatch => {
        axios.post(backEndUrl + '/add', data)
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