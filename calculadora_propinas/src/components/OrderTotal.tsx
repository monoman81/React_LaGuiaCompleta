import type { OrderItem } from "../types"
import { useMemo } from "react"
import { formatCurrency } from "../helpers"

type OrderTotalProps = {
    order: OrderItem[]
    tip: number
    placeOrder: () => void
}

export default function OrderTotal({ order, tip, placeOrder }: OrderTotalProps) {

    const subtotal = useMemo(() =>
        order.reduce((total, item) => total + item.quantity * item.price, 0), [order])

    const tipAmount = useMemo(() => subtotal * tip, [order, tip])

    const total = useMemo(() => subtotal + tipAmount, [order, tipAmount])

    //Example using callback
    // const subtotal2 = useCallback(() =>
    //     order.reduce((total, item) => total + item.quantity * item.price, 0), [order])
    // const tipAmount2 = useCallback(() => subtotal * tip, [order, tip])
    // const total2 = useCallback(() => subtotal2() + tipAmount2(), [order, tipAmount])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black-text-2xl">Totales y Propinas</h2>
                <p>
                    Subtotal a pagar: <span className="font-bold">{formatCurrency(subtotal)}</span>
                </p>
                <p>
                    Propina: <span className="font-bold">{formatCurrency(tipAmount)}</span>
                </p>
                <p>
                    Total a pagar: <span className="font-bold">{formatCurrency(total)}</span>
                </p>
            </div>
            <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                    disabled={total === 0} onClick={placeOrder} >
                Guardar Orden
            </button>
        </>
    )
}
