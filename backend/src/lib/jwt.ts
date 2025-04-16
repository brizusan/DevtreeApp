import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
};
