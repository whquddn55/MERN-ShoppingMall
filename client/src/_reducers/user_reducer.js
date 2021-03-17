import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    UPDATE_CART_ITEM_QUANTITY,
    REMOVE_CART_ITEM
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
        case GET_CART_ITEMS :
            return {...state, cartDetail : action.payload.product}; 
            break;
        case UPDATE_CART_ITEM_QUANTITY:
            return {...state, userData : {...state.userData, cart : action.payload.cart}, cartDetail : action.payload.product};
        case REMOVE_CART_ITEM:
            return {...state, userData : {...state.userData, cart : action.payload.cart}, cartDetail : action.payload.product};
        default:
            return state;
            break;
    }
}