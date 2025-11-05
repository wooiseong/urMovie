import { ErrorCodes } from "@shared-types/errorCodes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { JournalModel } from "./journalSchema";
import {
  AuthPayload,
  MutationLoginAccountArgs,
  MutationRegisterUserArgs,
} from "../../generated/graphql";
import { throwGraphQLError } from "../../utils/graphqlError";
import { Context } from "../../utils/authContext";
const config = require("../../config");
const userResolvers = {
  Mutation: {
    // async registerUser(
    //   _: unknown,
    //   { input }: MutationRegisterUserArgs,
    //   context: Context
    // ): Promise<AuthPayload> {
    //   const { username, password, rePassword } = input;
    //   if (context.user) {
    //     throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
    //       field: "username",
    //     });
    //   }
    //   const existingUser = await UserModel.findOne({ username });
    //   if (existingUser) {
    //     throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
    //       field: "username",
    //     });
    //   }
    //   if (password !== rePassword) {
    //     throwGraphQLError(ErrorCodes.PASSWORD_MISMATCH, {
    //       field: "rePassword",
    //     });
    //   }
    //   if (
    //     !validator.isLength(password, { min: 8 }) ||
    //     !/[a-zA-Z]/.test(password) ||
    //     !/\d/.test(password)
    //   ) {
    //     throwGraphQLError(ErrorCodes.PASSWORD_INVALID, {
    //       field: "password",
    //     });
    //   }
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const newUser = await UserModel.create({
    //     username,
    //     password: hashedPassword,
    //     role: "user",
    //   });
    //   const token = jwt.sign(
    //     { userId: newUser._id, role: newUser.role },
    //     config.jwtSecret,
    //     { expiresIn: "7d" }
    //   );
    //   return {
    //     token,
    //     user: {
    //       id: newUser._id,
    //       username: newUser.username,
    //       role: newUser.role,
    //     },
    //   };
    // },
    // async loginAccount(
    //   _: unknown,
    //   { input }: MutationLoginAccountArgs,
    //   context: Context
    // ): Promise<AuthPayload> {
    //   const { username, password } = input;
    //   if (context.user) {
    //     throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
    //       field: "username",
    //     });
    //   }
    //   const user = await UserModel.findOne({ username });
    //   if (!user) {
    //     throwGraphQLError(ErrorCodes.USER_NOT_FOUND, {
    //       field: "username",
    //     });
    //   }
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     throwGraphQLError(ErrorCodes.PASSWORD_INVALID, {
    //       field: "password",
    //     });
    //   }
    //   const token = jwt.sign(
    //     { userId: user._id, role: user.role },
    //     config.jwtSecret,
    //     { expiresIn: "7d" }
    //   );
    //   return {
    //     token,
    //     user: {
    //       id: user._id,
    //       username: user.username,
    //       role: user.role,
    //     },
    //   };
    // },
  },
};

export default userResolvers;
