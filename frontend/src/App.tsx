import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Menu from './views/Menu'
import Order from './views/Order'
import Cart from './views/Checkout'
import Login from './views/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AdminPanel from './views/AdminPanel'
import Home from './views/Home'

function App() {
  return (
    <>
      <main className="flex flex-col min-h-screen w-screen">
        <Navbar />
        <section className="flex-grow flex justify-center z-1 w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/call" element={<Cart />} />
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </section>
        <footer className="flex justify-center p-2 border-t border-t-primary">
          <Link to="/login">
            <span className="text-black hover:text-primary hover:underline">
              Login
            </span>
          </Link>
        </footer>
      </main>
    </>
  )
}

export default App
