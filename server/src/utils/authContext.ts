import jwt from "jsonwebtoken";
import { throwGraphQLError } from "./graphqlError";
import { Request } from "express";
import { ErrorCodes } from "@shared-types/errorCodes";

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
  throwGraphQLError(ErrorCodes.JWT_SECRET_NOT_DEFINED);
}

const authContext = ({ req }: { req: Request }): Context => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const tokenWithoutBearer = token.replace("Bearer ", "");

      const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY as string);

      return { user: decoded as User, req };
    } catch (err) {
      console.error("Token verification failed", err);
      throwGraphQLError(ErrorCodes.TOKEN_VERIFICATION_FAILED);
    }
  }
  return { req };
};

export default authContext;
