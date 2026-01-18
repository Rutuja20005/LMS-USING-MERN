import express from "express";
import jwtAuth from "../middlewares/jwtAuthMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", jwtAuth, createPayementIntent);

export default paymentRouter;
