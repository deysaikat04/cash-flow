import axios from 'axios';

const backEndUrl = 'http://localhost:5000/api/transactions';

export function getBudget(userId, month) {
    return dispatch => {
        axios.get(backEndUrl + '/getBudget/' + userId + '/' + month)
            .then(res => {
                dispatch(getBudgetAction(res.data));
            })
            .catch(err => {
                // console.log(err.response.data.msg);
                if (err.response) {
                    dispatch(budgetError(err.response.data.msg));
                } else {
                    dispatch(budgetError(err.message));
                }
            })
    }
}

export function addBudget(data) {
    return dispatch => {
        axios.post(backEndUrl + '/setBudget', data)
            .then(res => {
                dispatch(setBudget(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(budgetError(err.response.data.message));
            })
    }
}



export const getBudgetAction = (data) => {
    return {
        type: 'GET_BUDGET',
        payload: data
    }
}

export const setBudget = (data) => {
    return {
        type: 'SET_BUDGET',
        payload: data
    }
}

export const budgetError = (error) => {
    return {
        type: 'BUDGET_ERROR',
        payload: error
    }
}