import type { StateCreator } from "zustand/vanilla"
import type { Recipe } from "../types"
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice"
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: Recipe[]
    addToFavorites: (recipe: Recipe) => void
    alreadyFavorite: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    addToFavorites: recipe => {
        if (get().alreadyFavorite(recipe.idDrink)) {
            set(state => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se elimino de favoritos',
                error: false
            })
        }
        else {
            set(state => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a favoritos',
                error: false
            })
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('bebidas-favoritos', JSON.stringify(get().favorites))
    },
    alreadyFavorite: id => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        set({
            favorites: JSON.parse(localStorage.getItem('bebidas-favoritos') || '[]')
        })
    }
})