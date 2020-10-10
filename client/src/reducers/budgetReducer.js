const initState = {
    amount: 0,
    month: '',
    year: 0,
    error: null,
};

export default function expenseReducer(state = initState, action) {

    switch (action.type) {
        case 'SET_BUDGET':
            return {
                ...state,
                ...action.payload,
                error: false,
            }

        case 'GET_BUDGET':
            return {
                ...state,
                ...action.payload,
                error: false,
            }


        case 'BUDGET_ERROR':
            return {
                ...state,
                error: true,
            }
            break;
        default:
            return {
                ...state
            };
    }

}


