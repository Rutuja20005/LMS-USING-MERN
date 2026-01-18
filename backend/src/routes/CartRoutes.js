import express from "express";
import {
  addToCart,
  getCart,
  getCartItem,
  removeAllFromCart,
  removeFromCart,
} from "../controllers/CartController.js";
import jwtAuth from "../middlewares/jwtAuthMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", jwtAuth, addToCart); // Add course
cartRouter.get("/", jwtAuth, getCart); // Get all cart items
cartRouter.get("/:courseId", jwtAuth, getCartItem); // Get specific item
cartRouter.delete("/:courseId", jwtAuth, removeFromCart); // Remove one item
cartRouter.delete("/", jwtAuth, removeAllFromCart); // Remove all items

export default cartRouter;
