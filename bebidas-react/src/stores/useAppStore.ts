import { create } from "zustand/react"
import { devtools } from "zustand/middleware"
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice"
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice"
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice"
import { createAISlice, type AISliceType } from "./aiSlice"

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))