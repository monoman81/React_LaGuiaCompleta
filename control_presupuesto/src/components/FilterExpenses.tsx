import type { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export default function FilterExpenses() {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'set-category-filter', payload: {id: e.target.value}})
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">
                <div className="flex items-center gap-2">
                    <label htmlFor="category_filter">Filtrar: </label>
                    <select name="category_filter" id="category_filer" className="flex-1 bg-slate-100 p-2 rounded"
                        onChange={handleChange}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
