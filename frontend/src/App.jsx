import NavBar from '../src/components/NavBar'
import Home from '../src/components/Home'
import Blogs from '../src/pages/Blogs'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Dashboard from '../src/pages/Dashboard'
import Login from '../src/pages/Login'
import Creator from '../src/pages/Creator'
import Register from '../src/pages/Register'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Footer from '../src/components/Footer'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'
import UpdateBlog from './dashboard/UpdateBlog'
import Details from './pages/Details'
import NotFound from './pages/NotFound'

const App = () => {

  const location = useLocation()
  const hideNavbarfooter = ["/dashboard", "/login", "/register"].includes(location.pathname)

  const { blogs, isAuthenticated } = useAuth();
  console.log(blogs)
  console.log(isAuthenticated)
  return (
    <div >
      {!hideNavbarfooter && <NavBar />}
      {/* Defining routes  */}
      <Routes>
        <Route exact path="/" element={isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creator />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        {/* update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        {/* detail page */}
        <Route exact path="/blog/:id" element={<Details />} />
        {/* Universal route */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Toaster />
      {!hideNavbarfooter && <Footer />}
    </div>
  )
}

export default App