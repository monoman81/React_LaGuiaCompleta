import { z } from "zod"
import {
    CategoriesAPIResponseSchema,
    SearchFilterSchema,
    DrinksAPIResponse,
    DrinkApiResponse,
    RecipeAPIResponseSchema
} from "../utils/recipes-schema"

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drink = z.infer<typeof  DrinkApiResponse>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>