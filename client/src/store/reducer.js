import { ADD_EXPENSE, DELETE_EXPENSE, SET_BUDGET } from './type';

const initialState = {
    budget: 5000,
    expenses: []
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state, expenses: action.payload,
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        case SET_BUDGET:
            return {
                ...state, budget: action.payload
            };
        default:
            return state;
    }
};
export default AppReducer;