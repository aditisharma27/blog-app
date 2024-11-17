import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthProvider'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function NavBar() {
  const [show, setShow] = useState(false)
  const { blogs, profile, isAuthenticated, setIsAuthenticated, } = useAuth();
  // const navigateTo = useNavigate()
  console.log(profile?.user)


  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      })
      console.log(data)
      toast.success(data.message)
      setIsAuthenticated(false)

    } catch (error) {
      console.log(error)
      toast.error( "Failed to logout! Try again.")
    }
  }

  console.log(blogs)
  return (
    <>
      <nav className="shadow-lg px-4 py-3">
        <div className="flex items-center justify-between container mx-auto ">
          <div className="font-semibold text-xl">App
            <span className="text-blue-500 text-xl">Blog</span>
          </div>
          {/* DESKTOP */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-800 font-semibold no-underline hover:text-blue-500">HOME</Link>
              <Link to="/blogs" className="text-gray-800  font-semibold no-underline hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" className="text-gray-800  font-semibold no-underline hover:text-blue-500">CREATORS</Link>
              <Link to="/about" className="text-gray-800  font-semibold no-underline hover:text-blue-500">ABOUT</Link>
              <Link to="/contact" className="text-gray-800  font-semibold no-underline hover:text-blue-500">CONTACT  </Link>
            </ul>
            <div className="md:hidden" 
                 onClick={() => setShow(!show)}>
                  {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
          <div className="space-x-2 flex md:flex">
            {isAuthenticated && profile?.user?.role === "admin" ? (
              <Link to="/dashboard" 
                    className="bg-blue-500 no-underline font-semibold text-white hover:bg-blue-700 duration-300 px-2 py-2 rounded">
                DASHBOARD
              </Link>
            ) : ("")}
            {!isAuthenticated ? (<Link to="/login" className="bg-red-500 no-underline font-semibold text-white hover:bg-red-700 duration-300 px-4 py-2 rounded">
              LOGIN
            </Link>) : (
              <div >
                <button onClick={logoutHandler} className="bg-red-500 font-semibold text-white hover:bg-red-700 duration-300 px-4 py-2 rounded">
                    LOG OUT
                </button>
              </div>
            )}

          </div>
        </div>
        {/* mobile navbar */}
        {show && (
          <div className="bg-white ">
            <ul className="flex flex-col h-screen items-center justify-center space-y-5 text-black-700 text-2xl md:hidden">
              <Link to="/" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="text-gray-800 font-semibold no-underline hover:text-blue-500">
                HOME
              </Link>
              <Link to="/blogs" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="text-gray-800 font-semibold no-underline hover:text-blue-500">
                BLOGS
              </Link>
              <Link to="/creators" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="text-gray-800 font-semibold no-underline hover:text-blue-500">
                CREATORS
              </Link>
              <Link to="/about" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="text-gray-800 font-semibold no-underline hover:text-blue-500">
                ABOUT
              </Link>
              <Link to="/contact" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="text-gray-800 font-semibold no-underline hover:text-blue-500">
                CONTACT US
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

export default NavBar