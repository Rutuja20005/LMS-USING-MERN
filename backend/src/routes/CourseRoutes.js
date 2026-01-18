import express from "express";
import { getCourseById, getCourses } from "../controllers/CourseController.js";

const courseRouter = express.Router();

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);

export default courseRouter;
