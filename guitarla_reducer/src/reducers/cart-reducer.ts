import { CartItem, Guitar } from '../types'
import { db } from '../data/db'

export type CartActions =
    { type: 'add-to-cart', payload: {item: Guitar} } |
    { type: 'remove-from-cart', payload: {id: Guitar['id']} } |
    { type: 'decrease-quantity', payload: {id: Guitar['id']} } |
    { type: 'increase-quantity', payload: {id: Guitar['id']} } |
    { type: 'clear-cart' }

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const savedCart = (): CartItem[] => {
    return JSON.parse(localStorage.getItem('cart') || "[]")
}

export const initialState: CartState = {
    data: db,
    cart: savedCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (state: CartState = initialState, action: CartActions): CartState => {
    if (action.type === 'add-to-cart') {
        const foundItem = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let cart: CartItem[] = []
        if (foundItem) {
            cart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS)
                        return { ...item, quantity: item.quantity + 1 }
                    else
                        return item
                } else {
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity: 1}
            cart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart
        }
    } else if (action.type === 'remove-from-cart') {
        //setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    } else if (action.type === 'decrease-quantity') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS)
                return { ...item, quantity: item.quantity - 1 }
            else
                return item
        })
        return {
            ...state,
            cart
        }
    } else if (action.type === 'increase-quantity') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS)
                return { ...item, quantity: item.quantity + 1 }
            else
                return item
        })
        return {
            ...state,
            cart
        }
    } else if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
    }

    return state
}