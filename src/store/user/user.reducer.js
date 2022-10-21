//Reducer : Define type of actions
import { USER_ACTION_TYPES } from "./user.types";
// Reducer : Define intial state
const INITIAL_STATE = {
    currentUser: null
}

// Reducer: function to replace useState
export const userReducer = (state = INITIAL_STATE, action) => {       //no use reducer hook so need to manualy set initial state
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            return state;                                       // reducer is fired with every user action
    }
}