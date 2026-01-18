import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import programmingImage from "../assets/programming.svg";
import { useAuth } from "../context/AuthContext.jsx";
import { addToCart } from "../services/cartService.js"; // use cartService

function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error("Error fetching course:", err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return alert("Please login to add courses to cart.");

    try {
      setLoading(true);
      const res = await addToCart(course._id, course.price); // centralized service
      alert(res.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p>Loading course...</p>;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <img
              src={course.image || programmingImage}
              alt={course.title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Price:</strong> ${course.price}</p>

            <div className="d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
              <Link to="/courses" className="btn btn-outline-secondary">Back to Courses</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetails;
