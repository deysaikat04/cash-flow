import expenseReducer from './expenseReducer';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    expenses: expenseReducer,
    budget: budgetReducer,
    user: userReducer
})
