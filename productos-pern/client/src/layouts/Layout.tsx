import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <header className="bg-slate-800">
                <div className="max-w-6xl mx-auto py-10">
                    <h1 className="text-4xl font-extrabold text-white">Administrador de Productos</h1>
                </div>
            </header>
            <main className="max-w-6xl mx-auto p-10 bg-white shadow-lg mt-10">
                <Outlet />
            </main>
        </>

    )
}
