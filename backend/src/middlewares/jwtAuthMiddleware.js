import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  // Expecting "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload: ", payload);
    req.user = payload;
    next();
  } catch (error) {
    console.log("Error in JWT", error);
    return res.status(401).send({ msg: "Invalid Token" });
  }
}
