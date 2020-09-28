const initState = {};

export default function expenseReducer(state = initState, action) {

    switch (action.type) {
        case 'SET_BUDGET':
            return {
                ...state,
                ...action.payload,
            }

        case 'GET_BUDGET':
            return {
                ...state,
                ...action.payload,
            }


        case 'BUDGET_ERROR':
            return {
                ...state,
            }
            break;
        default:
            return {
                ...state
            };
    }

}


