const initState = {
    loading: true,
    inserted: false,
    items: [],
    monthlyItems: [],
    error: false
};

export default function expenseReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_EXPENSES':
            return {
                ...state,
                items: [...action.payload],
                loading: false,
                inserted: false,
                error: false
            }
        case 'SET_EXPENSES':
            return {
                ...state,
                items: [...action.payload],
                loading: false,
                inserted: true,
                error: false
            }
        case 'SET_EXPENSES_MONTH':
            return {
                ...state,
                monthlyItems: [...action.payload],
                loading: false,
                error: false
            }
        case 'EXPENSES_ERROR':
            return {
                ...state,
                loading: false,
                inserted: false,
                error: true
            }

        default:
            return {
                ...state,
            }
    }

}


