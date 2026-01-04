import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore(state => state.fetchCategories)
    const categories = useAppStore(state => state.categories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    const showNotification = useAppStore(state => state.showNotification)

    const [filter, setFilter] = useState({
        ingredient: '',
        category: ''
    })

    useEffect(() => {
        (async () => {
            await fetchCategories()
        })()
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(filter).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        await searchRecipes(filter)
    }

    return (
        <header className={isHome ? 'bg-[url("/bg.jpg")] bg-cover bg-no-repeat' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logotipo" className="w-32"/>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                            Favoritos
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                                Nombre o Ingredientes
                            </label>
                            <input onChange={handleChange} value={filter.ingredient}
                                type="text"
                                name="ingredient" id="ingredient"
                                className="p-3 bg-white w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe" />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">
                                Categoria
                            </label>
                            <select onChange={handleChange} value={filter.category}
                                name="category" id="category"
                                className="p-3 bg-white w-full rounded-lg focus:outline-none">
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(drink => (
                                    <option value={drink.strCategory} key={drink.strCategory}>{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit" value="Buscar"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" />
                    </form>
                )}
            </div>
        </header>
    )
}
