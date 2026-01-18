import heroImage from "../assets/hero.svg";

function Hero() {
  return (
    <section className="bg-light py-4">
      <div className="container d-flex flex-column flex-lg-row align-items-center">
        {/* Left Content */}
        <div className="text-center text-lg-start mb-4 mb-lg-0">
          <h1 className="display-4 fw-bold">
            Learn Anytime, <span className="text-primary">Anywhere</span>
          </h1>
          <p className="lead">
            Join our Learning Management System and access hundreds of courses
            from top instructors. Upgrade your skills today!
          </p>
          <div className="mt-3">
            <a href="/courses" className="btn btn-primary btn-lg me-3">
              Explore Courses
            </a>
            <a href="/about" className="btn btn-outline-dark btn-lg">
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="ms-lg-5 text-center text-lg-end">
          <img
            src={heroImage}
            alt="Learning Illustration"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "380px", objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
