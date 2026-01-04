import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage.tsx"
import Layout from "./layouts/Layout";
import GenerateAI from "./views/GenerateAI.tsx";

const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage />} index />
                    <Route path='/favorites' element={
                        <Suspense fallback="Cargando...">
                            <FavoritesPage />
                        </Suspense>
                    } />
                    <Route path='/generateai' element={
                        <Suspense fallback="Cargando...">
                            <GenerateAI />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
