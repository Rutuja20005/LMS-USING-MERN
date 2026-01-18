import express from "express";
import { getCategories } from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

export default categoryRouter;
