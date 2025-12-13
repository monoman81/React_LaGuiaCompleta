import {menuItems} from "./data/db"
import MenuItem from "./components/MenuItem"
import useOrder from "./hooks/useOrder"
import OrderContent from "./components/OrderContent"
import OrderTotal from "./components/OrderTotal"
import TipPercentageForm from "./components/TipPercentageForm"

function App() {

    const {order, addItem, removeItem, tip, setTip} = useOrder()

  return (
    <>
        <header className="bg-teal-400 py-5">
          <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumos</h1>
        </header>
        <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
            <div className="p-5">
                <h2 className="text-4xl font-black">Menu</h2>
                <div className="space-y-3 mt-10">
                    {menuItems.map(item => (
                        <MenuItem key={item.id} item={item} addItem={addItem} />
                    ))}
                </div>
            </div>
            <div className="border border-dashed border-slate-300 p-5 rounded space-y-10">
                <OrderContent order={order} removeItem={removeItem} />
                <TipPercentageForm setTip={setTip} />
                <OrderTotal order={order} tip={tip} />
            </div>
        </main>
    </>
  )
}

export default App
