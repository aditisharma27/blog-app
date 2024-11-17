import { useAuth } from "../context/AuthProvider";

const MyProfile = () => {
  const { profile } = useAuth();
  
console.log('User Data:', profile?.user);
  
  return (
    <div>
    <div className="flex m-5 justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-full overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-screen-md w-full">
        <div className="">
          
        <div className="relative inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={profile?.user?.photo?.url }
                alt="user"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
        </div>
        <div className="px-6 py-8 mt-12">
          <h2 className="text-center p-2 text-2xl font-semibold text-gray-800">
            {profile?.user?.name}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {profile?.user?.email}
          </p>
          <p className="text-center text-gray-600 mt-2">
            
            {profile?.user?.phone || '9879879870' }
          </p>
          <p className="text-center text-gray-600 mt-2">
            {profile?.user?.role}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MyProfile