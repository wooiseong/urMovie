import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { UserModel } from "./userSchema";
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
    async registerUser(
      _: unknown,
      { input }: MutationRegisterUserArgs,
      context: Context
    ): Promise<AuthPayload> {
      const { username, password, rePassword } = input;

      if (context.user) {
        throwGraphQLError("User is already logged in", "BAD_USER_INPUT", {
          field: "username",
        });
      }

      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        throwGraphQLError("User already exists", "BAD_USER_INPUT", {
          field: "username",
        });
      }

      if (password !== rePassword) {
        throwGraphQLError("Passwords do not match", "BAD_USER_INPUT", {
          field: "rePassword",
        });
      }

      if (
        !validator.isLength(password, { min: 8 }) ||
        !/[a-zA-Z]/.test(password) ||
        !/\d/.test(password)
      ) {
        throwGraphQLError(
          "Password must be at least 8 characters and contain both letters and numbers",
          "BAD_USER_INPUT",
          { field: "password" }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
        role: "USER",
      });

      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        config.jwtSecret,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
        },
      };
    },

    async loginAccount(
      _: unknown,
      { input }: MutationLoginAccountArgs,
      context: Context
    ): Promise<AuthPayload> {
      const { username, password } = input;

      if (context.user) {
        throwGraphQLError("User is already logged in", "BAD_USER_INPUT", {
          field: "username",
        });
      }

      const user = await UserModel.findOne({ username });
      if (!user) {
        throwGraphQLError("User not found", "BAD_USER_INPUT", {
          field: "username",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throwGraphQLError("Invalid password", "BAD_USER_INPUT", {
          field: "password",
        });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        config.jwtSecret,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };
    },
  },
};

export default userResolvers;
