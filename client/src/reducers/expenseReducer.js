const initState = {
    loading: true,
    inserted: false,
    items: [],
    monthlyItems: [],
    groupedItems: {},
    error: false,
    success: false
};

export default function expenseReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_EXPENSES':
            return {
                ...state,
                items: [...action.payload],
                loading: false,
                inserted: false,
                error: false,
                success: false
            }
        case 'SET_EXPENSES':
            return {
                ...state,
                items: [...action.payload],
                loading: false,
                inserted: true,
                error: false,
                success: true
            }
        case 'SET_EXPENSES_MONTH':
            return {
                ...state,
                monthlyItems: [...action.payload],
                loading: false,
                error: false,
                success: false
            }
        case 'GROUPED_EXPENSES':
            return {
                ...state,
                groupedItems: { ...action.payload },
                loading: false,
                error: false,
                success: false
            }
        case 'EXPENSES_ERROR':
            return {
                ...state,
                loading: false,
                inserted: false,
                error: true,
                success: false
            }

        default:
            return {
                ...state,
            }
    }

}


