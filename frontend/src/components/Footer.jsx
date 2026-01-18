function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Brand / About Section */}
          <div className="col-md-4 mb-3">
            <h5>LMS Project</h5>
            <p>
              A modern Learning Management System to enhance your learning
              experience.
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p className="mb-1">📍 Pune, India</p>
            <p className="mb-1">📧 support@lms.com</p>
            <p className="mb-0">📞 +91 </p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3 text-center text-md-end">
            <h5>Follow Us</h5>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3 fs-4"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3 fs-4"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3 fs-4"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-light fs-4"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center py-2">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} LMS Project. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
