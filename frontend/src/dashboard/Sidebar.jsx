import axios from "axios";
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiMenuBurger } from 'react-icons/ci'
import { BiSolidLeftArrowAlt } from 'react-icons/bi'
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

const Sidebar = ({ setComponent }) => {

  const { profile, setIsAuthenticated } = useAuth();
  // console.log(profile?.user);

  const navigateTo = useNavigate();
  const [show, setShow] = useState(false)

  const handleComponents = (value) => {
    setComponent(value)
  }

  const goToHome = () => {
    navigateTo('/')
  }
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
      toast.error(error.data.message || "Failed to logout! Try again.")
    }
  }

  return (
    <>
      <div className="sm:hidden fixed top-4 left-4 z-50" onClick={() => setShow(!show)}>
        <CiMenuBurger className="text-2xl" />
      </div>
      <div className={`w-64 h-full shadow-lg fixed top-0 left bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer lg:visible "
          onClick={() => setShow(!show)}>
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>
        <div className="text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto mt-2 mb-2"
            src={profile?.user?.photo?.url}
            alt="profile" />
          <p className="text-lg font-semibold">{profile?.user?.name}</p>
        </div>
        <ul className="space-y-4 mr-4 ">
          <button onClick={() => handleComponents("My Blogs")} className="mb-2 w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300">
            MY BLOGS
          </button>
          <button onClick={() => handleComponents("Create Blog")} className="mb-2 w-full px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition duration-300">
            CREATE BLOGS
          </button>
          <button onClick={() => handleComponents("My Profile")} className=" mb-2 w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300">
            MY PROFILE
          </button>
          <button onClick={goToHome} className="mb-2 w-full px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition duration-300">
            HOME
          </button>
          <button onClick={logoutHandler} className="mb-2 w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300">
            LOG OUT
          </button>

        </ul>
      </div>
    </>

  )
};
Sidebar.propTypes = {
  setComponent: PropTypes.func.isRequired,  // Validate that setComponent is a function and is required
};

export default Sidebar