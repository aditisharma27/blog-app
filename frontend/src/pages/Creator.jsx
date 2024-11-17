import axios from "axios";
import  { useEffect, useState } from "react";

function Creator() {
  const [creators, setCreators] = useState([]);
  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "https://blog-app-s1n1.onrender.com/api/users/admins",
          {
            withCredentials: true,
          }
        );
        const fetchedCreators = Array.isArray(data) ? data: [];
        setCreators(fetchedCreators);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (<>
      <h1 className="text-2xl font-semibold text-center my-10 ">Popular Creators!</h1>
    <div className="flex flex-wrap justify-center items-center my-15 py-8 bg-gray-100">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="bg-white shadow-lg rounded-xl overflow-hidden max-w-xs w-full m-2"
        >
          <div className="relative w-36 h-36 rounded-full">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-full h-full object-fill"
              
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={creator.photo.url}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-4 ">
            <h2 className="text-right text-xl font-semibold text-gray-800">
              {creator.name}
            </h2>
            <p className="text-right text-gray-600 mt-2">{creator.email}</p>
            <p className="text-right text-gray-600 mt-2">{creator.phone}</p>
            <p className="text-right text-gray-600 mt-2">{creator.role}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Creator;