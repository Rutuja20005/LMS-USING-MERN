import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
  

  return (
  
    <div className="d-flex flex-column min-vh-100">    <Navbar/>
     <div className="flex-grow-1">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses/>} />
      <Route path="/courses/:id" element={<CourseDetails/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup"  element={<Signup />} />
    </Routes>
      </div>
      <Footer />
       </div>
        
  
  )
}

export default App
