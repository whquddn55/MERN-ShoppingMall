import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    UPDATE_CART_ITEM_QUANTITY,
    REMOVE_CART_ITEM
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

export function getCartItems(userCart) {
    let cart = userCart.map(element => (element.productId));

    const response = axios.get(`/api/product/products_by_id?id=${cart}`)
        .then(response => {
            response.data.product.forEach(element1 => {
                userCart.forEach(element2 => {
                    if (element1._id === element2.productId)
                        element1.quantity = element2.quantity
                })
            })
            return response.data;
        })
    return {
        type : GET_CART_ITEMS,
        payload : response,
    }
}

export function updateCartItemQuantity(productId, quantity) {
    const response = axios.put(`/api/users/cart`, {
        productId,
        quantity,
    }) .then (response => {
        response.data.product.forEach(element1 => {
            response.data.cart.forEach(element2 => {
                if (element1._id == element2.productId)
                    element1.quantity = element2.quantity;
            })
        })
        return response.data;
    })

    return {
        type : UPDATE_CART_ITEM_QUANTITY,
        payload : response,
    }
}

export function removeCartItem(productIds) {
    const response = axios.delete(`/api/users/cart?id=${productIds}`)
        .then(response => {
            // quantity 넣는 작업
            response.data.product.forEach(element1 => {
                response.data.cart.forEach(element2 => {
                    if (element1._id == element2.productId)
                        element1.quantity = element2.quantity;
                })
            })
            return response.data;
        })

    return {
        type : REMOVE_CART_ITEM,
        payload : response,
    }
} 