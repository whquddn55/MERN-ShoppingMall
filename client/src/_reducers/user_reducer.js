import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
} from "../_action/types";

export default (state = {}, action) => {
    switch (action.type){
        case LOGIN_USER:
            return {...state, login : action.payload};
            break;
        case REGISTER_USER :
            return {...state, register : action.payload};
            break;
        case AUTH_USER :
            return {...state, userData : action.payload};
            break;
        case ADD_TO_CART :
            return {...state, userData : {...state.userData, cart : action.payload.cart}};
            break;
        default:
            return state;
            break;
    }
}