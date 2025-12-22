import {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react"
import { categories } from "../data/categories"
import type { DraftExpense, Value } from "../types"
import DatePicker from "react-date-picker"
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage.tsx"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {

    const { state, dispatch, available } = useBudget()
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [originalAmount, setOriginalAmount] = useState(0)
    const [error, setError] = useState('')


    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(expense => expense.id === state.editingId)[0]
            setExpense(editingExpense)
            setOriginalAmount(editingExpense.amount)
            // const { amount, expenseName, category, date } = editingExpense
            // setExpense({
            //     amount,
            //     expenseName,
            //     category,
            //     date
            // })
        }
    }, [state.editingId]);

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChangeInputs = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios...')
            return
        }

        if (expense.amount - originalAmount > available) {
            setError('Gasto fuera de presupuesto...')
            return
        }

        //Agregar o Actualizar
        if (!state.editingId)
            dispatch({type: 'add-expense', payload: {expense}})
        else
            dispatch({type: 'update-expense', payload: {expense: {...expense, id: state.editingId}}})

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setOriginalAmount(0)
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
                {state.editingId ? 'Modificando Gasto' : 'Nuevo Gasto'}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input type="text" name="expenseName" id="expenseName" placeholder="Anade el nombre del gasto" value={expense.expenseName}
                       className="bg-slate-100 p-2" onChange={handleChangeInputs} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Monto:</label>
                <input type="number" name="amount" id="amount" placeholder="Anade el monto del gasto: ej 300" value={expense.amount}
                       className="bg-slate-100 p-2" onChange={handleChangeInputs}  />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select name="category" id="category" className="bg-slate-100 p-2" value={expense.category} onChange={handleChangeInputs}  >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">Fecha Gasto:</label>
                <DatePicker id="date" name="date" className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate} />
            </div>
            <input type="submit" value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
                   className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"/>
        </form>
    )
}