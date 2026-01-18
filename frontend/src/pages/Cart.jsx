import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import programmingImage from "../assets/programming.svg";
import { getCart, removeFromCart, removeAllFromCart } from "../services/cartService.js";

function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const cart = await getCart();
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const handleRemove = async (courseId) => {
    try {
      await removeFromCart(courseId);
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCart = async () => {
    try {
      await removeAllFromCart();
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <p>Please login to view cart.</p>;
  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="py-5">
      <div className="container">
        <h2>Your Cart</h2>
        <div className="row g-4">
          {cartItems.map((item) => (
            <div className="col-12 col-md-6" key={item.courseId._id}>
              <div className="card d-flex flex-row align-items-center p-2">
                <img
                  src={item.courseId.image || programmingImage}
                  alt={item.courseId.title}
                  style={{ width: "100px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div className="ms-3 flex-grow-1">
                  <h5>{item.courseId.title}</h5>
                  <p>${item.price}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.courseId._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 d-flex justify-content-between align-items-center">
          <h4>Total: ${totalPrice}</h4>
          <div>
            <button className="btn btn-outline-danger me-2" onClick={handleClearCart}>Clear Cart</button>
            <button className="btn btn-success">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
