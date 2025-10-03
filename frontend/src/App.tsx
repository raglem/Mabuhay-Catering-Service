import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Menu from './views/Menu'
import Order from './views/Order'
import Cart from './views/Checkout'

function App() {

  return (
    <div>
      <main className="flex flex-col w-[100vw] max-w-[1280px] gap-y-8 p-8">
        <section className="flex justify-center z-1 w-full">
          <Navbar />
        </section>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
