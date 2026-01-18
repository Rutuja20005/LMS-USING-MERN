import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import programmingImage from "../assets/programming.svg";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ Store all categories
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ Fetch all courses with filters
  const fetchCourses = () => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (keyword) params.keyword = keyword;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    axios
      .get("/api/courses", { params })
      .then((res) => {
        console.log("Filtered courses from backend:", res.data);
        setCourses(res.data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  };

  // ✅ Fetch categories on mount
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // ✅ Fetch courses when filters change
  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, keyword, minPrice, maxPrice]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">All Courses</h2>
        <p className="text-center text-muted mb-5">
          Browse all available courses and start learning today
        </p>

        <div className="row">
          {/* ================= Aside Sidebar for Categories ================= */}
          <aside className="col-md-3 mb-4">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-group">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className={`list-group-item ${
                    selectedCategory === cat._id ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCategory(cat._id)}
                >
                  {cat.name}
                </li>
              ))}
              <li
                className={`list-group-item ${
                  selectedCategory === "" ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("")}
              >
                All
              </li>
            </ul>
          </aside>

          {/* ================= Main Section ================= */}
          <div className="col-md-9">
            {/* ✅ Search + Price Filter */}
            <div className="d-flex mb-4 gap-2">
              {/* Search Bar */}
              <input
                type="text"
                className="form-control"
                placeholder="Search courses..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              {/* Dropdown for Price Filter */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Filter Price
                </button>
                <div className="dropdown-menu p-3" style={{ minWidth: "250px" }}>
                  <div className="mb-2">
                    <label className="form-label">Min Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Max Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={fetchCourses}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* ================= Course Cards ================= */}
            <div className="row g-4">
              {courses.map((course) => (
                <div className="col-12 col-md-6 col-lg-4" key={course._id}>
                  <div
                    className="card border-0 shadow-sm hover-card"
                    style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                  >
                    <img
                      src={course.image || programmingImage}
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
                      <Link
                        to={`/courses/${course._id}`}
                        className="btn btn-primary w-100"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default Courses;
