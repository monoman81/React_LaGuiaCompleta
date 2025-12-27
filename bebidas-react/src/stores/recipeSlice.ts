import type { StateCreator } from "zustand/vanilla"
import {getCategories, getRecipes} from "../services/RecipeService"
import type { Categories, SearchFilter, Drinks } from "../types"

export type RecipeSliceType = {
    categories: Categories,
    drinks: Drinks,
    fetchCategories: () => Promise<void>,
    searchRecipes: (filter: SearchFilter) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filter) => {
        console.log('Searching...')
        const drinks = await getRecipes(filter)
        set({
            drinks
        })
    }
})