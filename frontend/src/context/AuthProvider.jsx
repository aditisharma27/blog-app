import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Cookies from 'js-cookie';

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {

  const [blogs, setBlogs] = useState()
  const [profile, setProfile] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {


    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            "https://blog-app-s1n1.onrender.com/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
      }
    };
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("https://blog-app-s1n1.onrender.com/api/blogs/all-blogs",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data)
        setBlogs(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchBlogs();
    fetchProfile();
  }, [])

  return (
    <AuthContext.Provider value={{
      blogs,
      profile,
      setProfile,
      isAuthenticated,
      setIsAuthenticated,
    }}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validates that children is a React node
};

export default AuthProvider