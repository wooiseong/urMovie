import jwt from "jsonwebtoken";
import { throwGraphQLError } from "./graphqlError";
import { Request } from "express";

const SECRET_KEY = process.env.JWT_SECRET;

interface User {
  id: string;
  username: string;
  role: string;
}

export interface Context {
  req: Request;
  user?: User;
}

if (!SECRET_KEY) {
  throwGraphQLError(
    "JWT_SECRET is not defined in environment variables!",
    "JWT_SECRET_NOT_DEFINED"
  );
}

const authContext = ({ req }: { req: Request }): Context => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const toeknWIthoutBearer = token.replace("Bearer", "");

      const decoded = jwt.verify(toeknWIthoutBearer, SECRET_KEY);

      return { user: decoded as User, req };
    } catch (err) {
      console.error("Token verfication failed", err);
      throwGraphQLError(
        "Token verfication failed",
        "TOKEN_VERIFICATION_FAILED"
      );
    }
  }
  return { req };
};

export default authContext;
