import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const Register = () => {

  const { setIsAuthenticated,setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [education, setEducation] = useState("")
  const [photo, setPhoto] = useState("")
  const [photoPreview, setPhotoPreview] = useState("")

  const photoHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhotoPreview(reader.result)
      setPhoto(file)
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('password', password)
    formData.append('role', role)
    formData.append('education', education)
    formData.append('photo', photo)

    try {
      const { data } = await axios.post('http://localhost:4001/api/users/register',
        formData, {
        withCredentials: true,
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })
      console.log(data)
      toast.success(data.message || 'User registered successfully!');
      setProfile(data)
      setIsAuthenticated(true);
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setRole("")
      setEducation("")
      setPhoto("")
      setPhotoPreview("")
      navigateTo("/")

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill required fields!")
    }

  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl text-center">App
              <span className="text-blue-500 text-2xl">Blog</span>
            </div>
            <h1 className="text-xl text-blue-600 font-semibold mb-6">SIGNUP </h1>
            <select value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md ">
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="number"
                placeholder="Enter your number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>

            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md ">
              <option value="">Select Education</option>
              <option value="BTech">B.Tech</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="MS/MTech">MS/M.Tech</option>
              <option value="12th/Diploma">12th/Diploma</option>
              <option value="10th/Diploma">10th/Diploma</option>
              <option value="Others">Others</option>
            </select>

            <div className="flex items-center mb-4 ">
              <div className="photo w-20 h-20 mr-4">
                <img src={photoPreview ? `${photoPreview}` : "photo"} alt="photo" />
              </div>

              <input type="file"
                onChange={photoHandler}
                className="w-full p-2 border rounded-md" />
            </div>
            <p className="text-center font-semibold mb-4">
              Already registered?
              <Link to={"/login"} className="text-blue-500 hover:text-blue-800 font-semibold">
                Login
              </Link>
            </p>
            <button
              type="submit "
              className="bg-blue-500 text-white w-full p-2 hover:bg-blue-800 duration-300 rounded-md">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register