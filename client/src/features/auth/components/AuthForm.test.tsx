import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";
import {
  useLoginAccountMutation,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import { useNavigate } from "react-router-dom";

// Mock GraphQL hooks
jest.mock("../../../generated/graphql", () => ({
  useLoginAccountMutation: jest.fn(),
  useRegisterUserMutation: jest.fn(),
}));

// Mock react-router-dom
jest.mock("react-router-dom");
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

// Mock Redux hooks
const mockDispatch = jest.fn();
jest.mock("src/store/hook", () => ({
  useAppDispatch: () => mockDispatch,
}));

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock custom hooks
jest.mock("../../../globalHooks/useDelayedLoading", () => ({
  useDelayedLoading: (loading: boolean) => loading,
}));

jest.mock("../../../globalHooks/useGraphQLErrorMessage", () => ({
  useGraphQLErrorMessage: () => (err: any) => err.message || "Error occurred",
}));

// Mock FullScreenLoader component
jest.mock("../../../globalComponents/FullScreenLoader", () => {
  return function FullScreenLoader() {
    return <div data-testid="full-screen-loader">Loading...</div>;
  };
});

// Mock toast utility
jest.mock("../../../utils/toast", () => ({
  showToast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AuthForm Component", () => {
  const mockSetCurrentMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  describe("Login Mode", () => {
    const mockLoginMutation = jest.fn();

    beforeEach(() => {
      (useLoginAccountMutation as jest.Mock).mockReturnValue([
        mockLoginMutation,
        { loading: false },
      ]);
      (useRegisterUserMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { loading: false },
      ]);
    });

    it("should render login form with username and password fields", () => {
      render(<AuthForm mode="login" setCurrentMode={mockSetCurrentMode} />);

      expect(screen.getByLabelText(/auth.username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/auth.password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /auth.login/i })
      ).toBeInTheDocument();
    });

    it("should show validation error when username is empty", async () => {
      render(<AuthForm mode="login" setCurrentMode={mockSetCurrentMode} />);

      const submitButton = screen.getByRole("button", { name: /auth.login/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.username_required/i)).toBeInTheDocument();
      });
    });

    it("should show validation error when password is empty", async () => {
      render(<AuthForm mode="login" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      userEvent.type(usernameInput, "testuser");

      const submitButton = screen.getByRole("button", { name: /auth.login/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.password_required/i)).toBeInTheDocument();
      });
    });

    it("should show validation error for invalid password format", async () => {
      render(<AuthForm mode="login" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      const passwordInput = screen.getByLabelText(/auth.password/i);

      userEvent.type(usernameInput, "testuser");
      userEvent.type(passwordInput, "short");

      const submitButton = screen.getByRole("button", { name: /auth.login/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.password_invalid/i)).toBeInTheDocument();
      });
    });

    it("should call login mutation with correct data on valid form submission", async () => {
      render(<AuthForm mode="login" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      const passwordInput = screen.getByLabelText(/auth.password/i);

      userEvent.type(usernameInput, "testuser");
      userEvent.type(passwordInput, "Password123");

      const submitButton = screen.getByRole("button", { name: /auth.login/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLoginMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              username: "testuser",
              password: "Password123",
            },
          },
        });
      });
    });
  });

  describe("Register Mode", () => {
    const mockRegisterMutation = jest.fn();

    beforeEach(() => {
      (useLoginAccountMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { loading: false },
      ]);
      (useRegisterUserMutation as jest.Mock).mockReturnValue([
        mockRegisterMutation,
        { loading: false },
      ]);
    });

    it("should render register form with username, password, and confirm password fields", () => {
      render(<AuthForm mode="register" setCurrentMode={mockSetCurrentMode} />);

      expect(screen.getByLabelText(/auth.username/i)).toBeInTheDocument();
      expect(screen.getByLabelText("auth.password")).toBeInTheDocument();
      expect(screen.getByLabelText(/auth.rePassword/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /auth.register/i })
      ).toBeInTheDocument();
    });

    it("should show validation error when passwords don't match", async () => {
      render(<AuthForm mode="register" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      const passwordInput = screen.getByLabelText("auth.password");
      const rePasswordInput = screen.getByLabelText(/auth.rePassword/i);

      userEvent.type(usernameInput, "testuser");
      userEvent.type(passwordInput, "Password123");
      userEvent.type(rePasswordInput, "Password456");

      const submitButton = screen.getByRole("button", {
        name: /auth.register/i,
      });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.password_mismatch/i)).toBeInTheDocument();
      });
    });

    it("should show validation error for invalid password format", async () => {
      render(<AuthForm mode="register" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      const passwordInput = screen.getByLabelText("auth.password");
      const rePasswordInput = screen.getByLabelText(/auth.rePassword/i);

      userEvent.type(usernameInput, "testuser");
      userEvent.type(passwordInput, "short");
      userEvent.type(rePasswordInput, "short");

      const submitButton = screen.getByRole("button", {
        name: /auth.register/i,
      });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.password_invalid/i)).toBeInTheDocument();
      });
    });

    it("should call register mutation with correct data on valid form submission", async () => {
      render(<AuthForm mode="register" setCurrentMode={mockSetCurrentMode} />);

      const usernameInput = screen.getByLabelText(/auth.username/i);
      const passwordInput = screen.getByLabelText("auth.password");
      const rePasswordInput = screen.getByLabelText(/auth.rePassword/i);

      userEvent.type(usernameInput, "newuser");
      userEvent.type(passwordInput, "Password123");
      userEvent.type(rePasswordInput, "Password123");

      const submitButton = screen.getByRole("button", {
        name: /auth.register/i,
      });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              username: "newuser",
              password: "Password123",
              rePassword: "Password123",
            },
          },
        });
      });
    });
  });
});
