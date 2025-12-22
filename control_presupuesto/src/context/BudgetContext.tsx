import {useReducer, createContext, type ReactNode, useMemo} from "react"
import { type BudgetActions, budgetReducer, type BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses: number
    available: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total,expense) => expense.amount + total, 0), [state.expenses])
    const available = state.budget - totalExpenses

    return (
        <BudgetContext.Provider value={{ state, dispatch, totalExpenses, available }}>
            {children}
        </BudgetContext.Provider>
    )
}