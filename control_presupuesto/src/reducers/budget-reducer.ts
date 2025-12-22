import { v4 as uuidv4 } from "uuid"
import type { DraftExpense, Expense, Category } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'set-category-filter', payload: { id: Category['id'] } }


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const SavedBudget = () => {
    const savedBudget = localStorage.getItem('budget')
    return savedBudget ? +savedBudget : 0
}

const SavedExpenses = (): Expense[] => {
    return JSON.parse(localStorage.getItem('expenses') || '[]')
}

export const initialState: BudgetState = {
    budget: SavedBudget(),
    modal: false,
    expenses: SavedExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    else if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    else if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }
    else if (action.type === 'add-expense') {
        const newExpense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, newExpense],
            modal: false
        }
    }
    else if (action.type === 'remove-expense') {
        const expenses = state.expenses.filter(expense => expense.id !== action.payload.id)
        return {
            ...state,
            expenses
        }
    }
    else if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    else if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }
    else if (action.type === 'reset-app') {
        return {
            budget: 0,
            modal: false,
            expenses: [],
            editingId: ''
        }
    }
    else if (action.type === 'set-category-filter') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }
    return state
}