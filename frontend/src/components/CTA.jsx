function CTA() {
  return (
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <h2 className="fw-bold mb-3">Ready to Start Learning?</h2>
        <p className="lead mb-4">
          Join thousands of learners and upgrade your skills with our expert-led courses.
        </p>
        <a href="/signup" className="btn btn-light btn-lg me-3">
          Get Started
        </a>
        <a href="/courses" className="btn btn-outline-light btn-lg">
          Browse Courses
        </a>
      </div>
    </section>
  );
}

export default CTA;
