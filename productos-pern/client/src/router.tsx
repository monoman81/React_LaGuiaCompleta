import { createBrowserRouter } from 'react-router-dom'
import Layout from "./layouts/Layout"
import Products, { loader as productsLoader, action as toggleAvailabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from "./views/NewProduct"
import EditProduct, { loader as productLoader, action as editProductAction } from "./views/EditProduct"
import { action as deleteProductAction } from "./components/ProductDetails"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products  />,
                loader: productsLoader,
                HydrateFallback: () => null,
                action: toggleAvailabilityAction
            },
            {
                path: 'products/newproduct',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct />,
                loader: productLoader,
                action: editProductAction,
                HydrateFallback: () => null
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])