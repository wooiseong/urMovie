import { ErrorCodes } from "@shared-types/errorCodes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { UserModel } from "./userSchema";
import {
  AuthPayload,
  MemberMutationResponse,
  MutationLoginAccountArgs,
  MutationRegisterUserArgs,
  MutationUpdateUserArgs,
  User,
} from "../../generated/graphql";
import { throwGraphQLError } from "../../utils/graphqlError";
import { Context } from "../../utils/authContext";
import { handleImageUpload } from "../../utils/imageUploadUtils";
const config = require("../../config");
const userResolvers = {
  Query: {
    async me(_: unknown, __: unknown, context: Context): Promise<User> {
      if (!context.user) {
        throwGraphQLError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }

      const user = await UserModel.findById(context.user.id);
      if (!user) {
        throwGraphQLError(ErrorCodes.USER_NOT_FOUND);
      }

      return {
        id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar || null,
        createdAt: user.createdAt,
      };
    },
  },
  Mutation: {
    async registerUser(
      _: unknown,
      { input }: MutationRegisterUserArgs,
      context: Context
    ): Promise<AuthPayload> {
      const { username, password, rePassword } = input;

      if (context.user) {
        throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
          field: "username",
        });
      }

      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
          field: "username",
        });
      }

      if (password !== rePassword) {
        throwGraphQLError(ErrorCodes.PASSWORD_MISMATCH, {
          field: "rePassword",
        });
      }

      if (
        !validator.isLength(password, { min: 8 }) ||
        !/[a-zA-Z]/.test(password) ||
        !/\d/.test(password)
      ) {
        throwGraphQLError(ErrorCodes.PASSWORD_INVALID, {
          field: "password",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
        role: "user",
      });

      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        config.jwtSecret,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          avatar: newUser.avatar || null,
          createdAt: newUser.createdAt,
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
        throwGraphQLError(ErrorCodes.USER_ALREADY_EXISTS, {
          field: "username",
        });
      }

      const user = await UserModel.findOne({ username });
      if (!user) {
        throwGraphQLError(ErrorCodes.USER_NOT_FOUND, {
          field: "username",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throwGraphQLError(ErrorCodes.PASSWORD_INVALID, {
          field: "password",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        config.jwtSecret,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          avatar: user.avatar || null,
          createdAt: user.createdAt,
        },
      };
    },
    async updateUser(
      _: unknown,
      { input }: MutationUpdateUserArgs,
      context: Context
    ): Promise<User> {
      if (!context.user) {
        throwGraphQLError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }

      const { password, rePassword, avatar } = input;
      const user = await UserModel.findById(context.user.id);

      if (!user) {
        throwGraphQLError(ErrorCodes.USER_NOT_FOUND);
      }

      if (password) {
        if (password !== rePassword) {
          throwGraphQLError(ErrorCodes.PASSWORD_MISMATCH, {
            field: "rePassword",
          });
        }
        if (
          !validator.isLength(password, { min: 8 }) ||
          !/[a-zA-Z]/.test(password) ||
          !/\d/.test(password)
        ) {
          throwGraphQLError(ErrorCodes.PASSWORD_INVALID, {
            field: "password",
          });
        }
        user.password = await bcrypt.hash(password, 10);
      }

      if (avatar) {
        const imageUrl = handleImageUpload(avatar, user._id.toString());
        user.avatar = imageUrl;
      }

      await user.save();

      return {
        id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar || null,
        createdAt: user.createdAt,
      };
    },
    async upgradeToPremium(
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<MemberMutationResponse> {
      if (!context.user) {
        throwGraphQLError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }

      const user = await UserModel.findById(context.user.id);

      if (!user) {
        throwGraphQLError(ErrorCodes.USER_NOT_FOUND);
      }

      if (user.role === "admin") {
        return {
          message: "You are an admin and cannot be upgraded.",
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar || null,
            createdAt: user.createdAt,
          },
        };
      }

      if (user.role === "premiumUser") {
        return {
          message: "You are already a premium user.",
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar || null,
            createdAt: user.createdAt,
          },
        };
      }

      user.role = "premiumUser";
      await user.save();

      return {
        message: "User successfully upgraded to premium.",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          avatar: user.avatar || null,
          createdAt: user.createdAt,
        },
      };
    },
  },
};

export default userResolvers;
