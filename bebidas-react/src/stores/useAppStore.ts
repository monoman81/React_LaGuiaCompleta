import { create } from "zustand/react"
import { devtools } from "zustand/middleware"
import {createRecipesSlice, RecipeSliceType} from "./recipeSlice"

export const useAppStore = create<RecipeSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a)
})))