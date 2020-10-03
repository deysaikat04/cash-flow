import axios from 'axios';


export function getBudget(token, month) {
    return dispatch => {
        let url = `/api/transactions/getBudget/${month}`;
        axios.get(url,
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
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

export function addBudget(token, data) {

    return dispatch => {
        let url = `/api/transactions/setBudget`;
        axios.post(url, data,
            {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
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