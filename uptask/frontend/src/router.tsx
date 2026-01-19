import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateView from "@/views/projects/CreateView"
import EditView from "@/views/projects/EditView"
import DetailsView from "@/views/projects/DetailsView"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateView />} />
                    <Route path='/projects/:projectId' element={<DetailsView />} />
                    <Route path='/projects/:projectId/edit' element={<EditView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router