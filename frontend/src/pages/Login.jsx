import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthProvider"
import wallapaper from "../../assets/wallapaper.jpeg"

const Login = () => {

  const { setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4001/api/users/login',
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || 'User login successfully!');

      setProfile(data)
      setIsAuthenticated(true)
      setEmail("")
      setPassword("")
      setRole("")
      navigateTo("/");

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fields!")
    }

  }

  return (
    <div
    className="h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${wallapaper})` }}
  > 
      <div className="min-h-screen flex items-center justify-center ">
        <div className="max-w-md w-full bg-white  border-4 border-gray-500 shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl text-center">App
              <span className="text-blue-500 text-2xl">Blog</span>
            </div>
            <h1 className="text-xl text-blue-600 font-semibold mb-6">LOGIN </h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full  p-2 mb-4 border rounded-md ">
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>

            <div className="mb-4">
              <input type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>
            <p className="text-center font-semibold mb-4">
              New User?
              <Link to={"/register"} className="text-blue-500 p-1 no-underline hover:text-blue-800 font-semibold"> Sign Up</Link>
            </p>
            <button type="submit " className="bg-blue-500 text-white  w-full p-2 hover:bg-blue-800 duration-300 rounded-md">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login