import { useEffect, useState } from "react";
import axios from "axios";
import placeholderImage from"../assets/digitalMarketing.svg";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4">Browse Categories</h2>
        <p className="text-center text-muted mb-5">
          Find courses by your favorite categories
        </p>

        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-6 col-md-3 text-center" key={category._id}>
              <div
                className="card border-0 shadow-sm p-3 hover-card"
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                <div
                  className="mx-auto mb-3 rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{ width: "120px", height: "120px", overflow: "hidden" }}
                >
                  <img
                    src={category.img || placeholderImage}
                    alt={category.name}
                    className="img-fluid"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </div>
                <h5 className="mb-0">{category.name}</h5>
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

export default Categories;
