import jwt from "jsonwebtoken";
import { throwGraphQLError } from "./graphqlError";
import { Request } from "express";
import { ErrorCodes } from "@urmovie/types";

interface User {
  id: string;
  username: string;
  role: string;
}

export interface Context {
  req: Request;
  user?: User;
}

const authContext = ({ req }: { req: Request }): Context => {
  const token = req.headers.authorization || "";
  if (token) {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
      console.error("JWT_SECRET is not defined");
      throwGraphQLError(ErrorCodes.JWT_SECRET_NOT_DEFINED);
    }

    try {
      const tokenWithoutBearer = token.replace("Bearer ", "");

      const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY);

      return { user: decoded as User, req };
    } catch (err) {
      console.error("Token verification failed", err);
      throwGraphQLError(ErrorCodes.TOKEN_VERIFICATION_FAILED);
    }
  }
  return { req };
};

export default authContext;
