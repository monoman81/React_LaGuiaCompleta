import type { StateCreator } from "zustand/vanilla"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, SearchFilter, Drinks, Drink, Recipe } from "../types"
import type { FavoritesSliceType } from "./favoritesSlice";

export type RecipeSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (filter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipeSliceType & FavoritesSliceType, [], [], RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
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
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            selectedRecipe: {} as Recipe,
            modal: false
        })
    }
})