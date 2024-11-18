import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Required for carousel styles

const Trending = () => {
  const { blogs } = useAuth();

  // Handle the case where blogs are not available yet (e.g., loading or empty)
  if (!blogs || blogs.length === 0) {
    return <div>Loading...</div>; // Fallback content if blogs are not loaded yet
  }

  // Define the responsive breakpoints for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4, // 4 blogs per slide on large screens (desktop)
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // 4 blogs per slide on desktop screens
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // 2 blogs per slide on tablet screens
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // 1 blog per slide on mobile screens
    },
  };

  return (
    <div className="container gap-4 mx-auto mt-5 ">
      <h1 className="text-2xl font-semibold mb-4">TRENDING</h1>

      {/* Carousel component */}
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={4000}>
        {blogs.map((blog) => (
          <div key={blog._id}
               className="card bg-white shadow-lg rounded-lg overflow-hidden ">
            <Link to={`/blog/${blog._id}`}
                  className="text-decoration-none  "
                  style={{ margin: "0 12px"
                     }}
                  >
              {/* Blog Image */}
              <img
                src={blog.BlogImage.url}
                alt={blog.title}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px", gap:"1rem" }}
              />
              {/* Blog Title */}
              <div className="card-body">
                <h5 className="card-title " style={{ fontSize: "1.2em", color:"white"}}>
                  {blog.title}
                </h5>
                {/* Admin Name */}
               
              <img src={blog.adminPhoto} alt="" className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  {blog.adminName}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Trending;
