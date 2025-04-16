import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof tokenDecoded === "object" && tokenDecoded.id) {
      const idUser = tokenDecoded.id.toString();
      const user = await User.findById(idUser).select(
        "-password -__v -updatedAt"
      );
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
  }
};
