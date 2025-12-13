export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & {
    quantity: number
}

//export interface CartItem extends Guitar

//export type CartItem = Pick<Guitar, "id" | "name" | "price" > & {
//export type CartItem = Omit<Guitar, "id" | "name" | "price" > & {