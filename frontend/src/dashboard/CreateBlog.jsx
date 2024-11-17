import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

const CreateBlog = () => {

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [about, setAbout] = useState("")
  const [BlogImage, setBlogImage] = useState("")
  const [blogImagePreview, setBlogImagePreview] = useState("")

  const changePhotoHandler = (e) => {
    console.log(e)
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setBlogImagePreview(reader.result)
      setBlogImage(file);
    }
  };
  const handleBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('about', about)
    formData.append('BlogImage', BlogImage)

    try {
      const { data } = await axios.post('https://blog-app-s1n1.onrender.com/api/blogs/create',
        formData, {
        withCredentials: true,
        headers: {
          "Content-Type": 'multipart/form-data'
        },
      });
      console.log(data)
      toast.success(data.message || 'User registered successfully!');
      setTitle("")
      setCategory("")
      setAbout("")
      setBlogImage("")
      setBlogImagePreview("")

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill required fields!")
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border shadow-lg rounded-lg ">
          <h3 className="text-2xl font-semibold mb-8">Create Blogs</h3>
          <form onSubmit={handleBlog} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 outline-none rounded-md ">
                <option value="">Select Category</option>
                <option value="Business">Business</option>
                <option value="Devotion">Devotion</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Nature">Nature</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input type="text"
                placeholder="Enter your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 outline-none rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
                  alt="image"
                  className="w-full max-w-sm h-auto rounded-md object-cover" />
              </div>
              <input type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border rounded-md outline-none" />
            </div>

            <button
              type="submit "
              className="bg-blue-500 text-white w-full py-3 px-4 hover:bg-blue-800 transition-colors duration-300 rounded-md">
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog