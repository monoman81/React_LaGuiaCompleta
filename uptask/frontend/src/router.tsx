import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateView from "@/views/projects/CreateView"
import EditView from "@/views/projects/EditView"
import DetailsView from "@/views/projects/DetailsView"
import AuthLayout from "@/layouts/AuthLayout"
import LoginView from "@/views/auth/LoginView"
import RegisterView from "@/views/auth/RegisterView"
import ConfirmAccountView from "@/views/auth/ConfirmAccountView"
import RequestNewCodeView from "@/views/auth/RequestNewCodeView"
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.tsx";
import NewPasswordView from "@/views/auth/NewPasswordView.tsx";

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
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router