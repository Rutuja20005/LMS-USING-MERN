import Cart from "../models/CartModel.js";

// Add Item to cart
export async function addToCart(req, res) {
  try {
    const userId = req.user.id; // from JWT
    const { courseId, price } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ courseId, price }],
      });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Course added to cart successfully", cart: newCart });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.courseId.equals(courseId)
      );
      if (itemIndex > -1) {
        return res.status(400).json({ message: "Course already in the cart" });
      } else {
        cart.items.push({ courseId, price });
        await cart.save();
        return res
          .status(200)
          .json({ message: "Course added to cart successfully", cart });
      }
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all cart items
export async function getCart(req, res) {
  try {
    const userId = req.user.id; // from JWT
    const cart = await Cart.findOne({ userId }).populate("items.courseId");
    if (!cart) {
      return res.status(404).json({ message: "No cart found for this user" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error getting cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get one specific cart item
export async function getCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.courseId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.courseId.equals(courseId));
    if (!item) {
      return res.status(404).json({ message: "Course not found in cart" });
    }

    return res.status(200).json({ item });
  } catch (error) {
    console.error("Error getting cart item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Remove an item from cart
export async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedItems = cart.items.filter(
      (item) => !item.courseId.equals(courseId)
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Course not found in cart" });
    }

    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json({ message: "Course removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Remove all items from cart
export async function removeAllFromCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    return res
      .status(200)
      .json({ message: "All courses removed from cart", cart });
  } catch (error) {
    console.error("Error removing all items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
