import axios from "axios"
import {CategoriesAPIResponseSchema, DrinkApiResponse, DrinksAPIResponse } from "../utils/recipes-schema"
import type { SearchFilter } from "../types"

export const getCategories = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success)
        return result.data
}

export const getRecipes = async (filter: SearchFilter) => {
    const url = `https:\\www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter.ingredient}&c=${filter.category}`
    const { data } = await axios(url)
    const result = DrinksAPIResponse.safeParse(data)
    if (result.success)
        return result.data
}