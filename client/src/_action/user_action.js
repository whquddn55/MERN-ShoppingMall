import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
} from "./types"

export function loginUser(dataToSubmit) {
    const response = axios.post('/api/users/login', dataToSubmit)
        .then((response) => (response.data));
    return {
        type : LOGIN_USER,
        payload : response
    }
};

export function registerUser(dataToSubmit) {
    const response = axios.post('/api/users/register', dataToSubmit)
        .then((response) => (response.data));
    return {
        type : REGISTER_USER,
        payload : response,
    }
}

export function auth() {
    const response = axios.get('/api/users/auth')
        .then((response) => (response.data));
    return {
        type : AUTH_USER,
        payload : response,
    }
            
}

export function addToCart(productId) {
    const response = axios.post('/api/users/toCart', {
            productId
        }).then(response => (response.data))
    return {
        type : ADD_TO_CART,
        payload : response,
    }
}