import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const Details = () => {

    const { id } = useParams();
    const [blogs, setBlogs] = useState({})

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4001/api/blogs/single-blogs/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": 'multipart/form-data'
                        },
                    });
                console.log(data)
                setBlogs(data)

            } catch (error) {
                console.log(error);
                
            }
        };
        fetchBlog();
    }, [id]);

    

    return (
        <div>
            <div>
                {blogs && (
                    <section className="container mx-auto p-4">
                        <div className="text-blue-500 uppercase text-xs font-bold mb-4">
                            {blogs?.category}
                        </div>
                        <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
                        <div className="flex items-center mb-6">
                            <img
                                src={blogs?.adminPhoto}
                                alt="author_avatar"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <p className="text-lg font-semibold">{blogs?.adminName}</p>
                        </div>
                     
                        <div className="flex flex-col md:flex-row">
                            {blogs?.BlogImage && (
                                <img
                                    src={blogs?.BlogImage.url}
                                    alt="mainblogsImg"
                                    className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                                    style={{
                                        objectFit: 'cover', // Ensure aspect ratio is maintained
                                        
                                    }}
                                />
                            )}
                            <div className="md:w-1/2 w-full md:pl-6">
                                <p className="text-lg mb-6">{blogs?.about}</p>
                               
                            </div>
                        </div>
                    </section>
                )}
            </div>

        </div>
    )
}

export default Details