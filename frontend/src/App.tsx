import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Menu from './views/Menu'
import Order from './views/Order'
import Cart from './views/Checkout'
import Login from './views/Login'

function App() {

  return (
    <>
      <main className="flex flex-col w-[100vw] max-w-[1280px] min-h-[400px] gap-y-8 p-8">
        <section className="flex justify-center z-1 w-full">
          <Navbar />
        </section>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="flex justify-center p-2 border-t-1 border-t-primary">
        <Link to="/login">
          <span className="text-black hover:text-primary hover:underline">
            Login
          </span>
        </Link>
      </footer>
    </>
  )
}

export default App
