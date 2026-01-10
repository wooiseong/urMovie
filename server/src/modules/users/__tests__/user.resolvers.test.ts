import { ErrorCodes } from "@shared-types/errorCodes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { throwGraphQLError } from "../../../utils/graphqlError";
import { Context } from "../../../utils/authContext";

// Mock all external dependencies
jest.mock("../userSchema", () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));
jest.mock("validator", () => ({
  isLength: jest.fn(),
}));
jest.mock("../../../utils/graphqlError", () => ({
  throwGraphQLError: jest.fn().mockImplementation((errorCode) => {
    throw new Error(`GraphQL Error: ${errorCode}`);
  }),
}));
jest.mock("../../../config", () => ({
  jwtSecret: "test-secret-key",
}));

// Import after mocks
import userResolvers from "../user.resolvers";
const { UserModel } = jest.requireMock("../userSchema");

describe("User Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    const validInput = {
      username: "testuser",
      password: "Password123",
      rePassword: "Password123",
    };

    it("should successfully register a new user", async () => {
      const mockUser = {
        _id: "userId123",
        username: "testuser",
        password: "hashedPassword",
        role: "user",
        avatar: null,
        createdAt: new Date(),
      };

      UserModel.findOne.mockResolvedValue(null);
      (validator.isLength as jest.Mock).mockReturnValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      UserModel.create.mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue("token123");

      const result = await userResolvers.Mutation.registerUser(
        {},
        { input: validInput },
        { req: {} as any }
      );

      expect(result).toHaveProperty("token", "token123");
      expect(result).toHaveProperty("user");
      expect(result.user.username).toBe("testuser");
      expect(bcrypt.hash).toHaveBeenCalledWith("Password123", 10);
    });

    it("should reject if username already exists", async () => {
      UserModel.findOne.mockResolvedValue({ username: "testuser" });

      await expect(
        userResolvers.Mutation.registerUser(
          {},
          { input: validInput },
          { req: {} as any }
        )
      ).rejects.toThrow();

      expect(throwGraphQLError).toHaveBeenCalledWith(
        ErrorCodes.USER_ALREADY_EXISTS,
        { field: "username" }
      );
    });

    it("should reject if passwords do not match", async () => {
      UserModel.findOne.mockResolvedValue(null);

      await expect(
        userResolvers.Mutation.registerUser(
          {},
          { input: { ...validInput, rePassword: "Different123" } },
          { req: {} as any }
        )
      ).rejects.toThrow();

      expect(throwGraphQLError).toHaveBeenCalledWith(
        ErrorCodes.PASSWORD_MISMATCH,
        { field: "rePassword" }
      );
    });

    it("should reject if password is invalid", async () => {
      UserModel.findOne.mockResolvedValue(null);
      (validator.isLength as jest.Mock).mockReturnValue(false);

      await expect(
        userResolvers.Mutation.registerUser(
          {},
          { input: { ...validInput, password: "short", rePassword: "short" } },
          { req: {} as any }
        )
      ).rejects.toThrow();

      expect(throwGraphQLError).toHaveBeenCalledWith(
        ErrorCodes.PASSWORD_INVALID,
        { field: "password" }
      );
    });
  });

  describe("loginAccount", () => {
    const validInput = {
      username: "testuser",
      password: "Password123",
    };

    it("should successfully login with valid credentials", async () => {
      const mockUser = {
        _id: "userId123",
        username: "testuser",
        password: "hashedPassword",
        role: "user",
        avatar: null,
        createdAt: new Date(),
      };

      UserModel.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token123");

      const result = await userResolvers.Mutation.loginAccount(
        {},
        { input: validInput },
        { req: {} as any }
      );

      expect(result).toHaveProperty("token", "token123");
      expect(result).toHaveProperty("user");
      expect(result.user.username).toBe("testuser");
      expect(bcrypt.compare).toHaveBeenCalledWith("Password123", "hashedPassword");
    });

    it("should reject if user not found", async () => {
      UserModel.findOne.mockResolvedValue(null);

      await expect(
        userResolvers.Mutation.loginAccount(
          {},
          { input: validInput },
          { req: {} as any }
        )
      ).rejects.toThrow();

      expect(throwGraphQLError).toHaveBeenCalledWith(
        ErrorCodes.USER_NOT_FOUND,
        { field: "username" }
      );
    });
  });
});
