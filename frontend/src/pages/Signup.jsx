function Signup() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
           Sign Up
            </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
