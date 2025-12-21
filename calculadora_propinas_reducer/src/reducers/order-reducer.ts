import {MenuItem, OrderItem} from "../types"

export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } }

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
    if (action.type === 'add-item') {
        let order: OrderItem[] = []
        const foundItem = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        if(foundItem) {
            order = state.order.map( orderItem => orderItem.id === action.payload.item.id ?
                {...orderItem, quantity: orderItem.quantity + 1 } :
                orderItem
            )
        } else {
            const newItem: OrderItem  = { ...action.payload.item, quantity: 1 }
            order = [...state.order, newItem]
        }
        return {
            ...state,
            order
        }
    }
    else if (action.type === 'remove-item') {
        const order = state.order.filter( item => item.id !== action.payload.id )
        return {
            ...state,
            order
        }
    }
    else if (action.type === 'place-order') {
        return {
            ...state,
            order: [],
            tip: 0
        }
    }
    else if (action.type === 'add-tip') {
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }

    return state

}