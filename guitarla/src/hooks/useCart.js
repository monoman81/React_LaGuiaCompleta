import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    //Initialize
    const initialCart = () => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    }

    //State
    const [ guitars ] = useState(db)
    const [ cart, setCart ] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = item => {
        const itemIdx = cart.findIndex(guitar => guitar.id === item.id)
        if (itemIdx >= 0) {
            if (cart[itemIdx].quantity >= MAX_ITEMS)
                return
            const updatedCart = [...cart]
            updatedCart[itemIdx].quantity++
            setCart(updatedCart)
        }
        else {
            item.quantity = 1
            setCart([...cart, item])
            //setCart(prevCart => [...prevCart, item])
        }
    }

    const removeFromCart = id => {
        console.log("Eliminando Guitarra con id ", id)
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const updateQty = (id, increment) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                if ((Math.sign(increment) > 0 && item.quantity < MAX_ITEMS) || (Math.sign(increment) < 0 && item.quantity > MIN_ITEMS))
                    return { ...item, quantity: item.quantity + increment}
                else
                    return item
            }
            else
                return item
        })
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    const isEmpty = useMemo (() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

    return {
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        guitars,
        cart,
        isEmpty,
        cartTotal
    }

}
