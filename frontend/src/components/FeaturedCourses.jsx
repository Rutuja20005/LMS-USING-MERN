import { useEffect, useState } from "react";
import axios from "axios";
import programmingImage from "../assets/programming.svg";

function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios
    .get("api/courses")
    .then((res) => {
      console.log("Courses from backend:", res.data); // <-- yaha check karenge
      setCourses(res.data);
    })
    .catch((err) => console.error("Error fetching courses:", err)).finally(()=>setLoading(false));
}, []);

   if (loading) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Featured Courses</h2>
        <p className="text-center text-muted mb-5">
          Explore our popular courses and start learning today
        </p>

        <div className="row g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div className="col-12 col-md-6 col-lg-3" key={idx}>
              <div className="card border-0 shadow-sm" style={{ height: "320px", backgroundColor: "#e0e0e0" }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Featured Courses</h2>
        <p className="text-center text-muted mb-5">
          Explore our popular courses and start learning today
        </p>

        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-12 col-md-6 col-lg-3" key={course._id}>
              <div
                className="card border-0 shadow-sm hover-card"
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                {/* Agar image DB me nahi hai toh ek placeholder dikhayenge */}
                <img
                  src={course.image|| programmingImage}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-muted mb-2">
                    Instructor: {course.instructor?.name}
                  </p>
                  <p className="text-muted mb-2">
                    Category: {course.category?.name}
                  </p>
                  <p className="fw-bold">${course.price}</p>
                  <a href={`/courses/${course._id}`} className="btn btn-primary w-100">
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}

export default FeaturedCourses;
