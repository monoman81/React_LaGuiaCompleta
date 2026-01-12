import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateView from "@/views/projects/CreateView.tsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router