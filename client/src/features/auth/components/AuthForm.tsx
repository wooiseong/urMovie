import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import {
  useLoginAccountMutation,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { showToast } from "../../../utils/toast";
import FullScreenLoader from "../../../globalComponents/FullScreenLoader";
import { useDelayedLoading } from "../../../globalHooks/useDelayedLoading";
import { useGraphQLErrorMessage } from "../../../globalHooks/useGraphQLErrorMessage";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserRole } from "src/store/modules/userSlice";
import { isValid } from "zod/v3";
import { useAppDispatch } from "src/store/hook";
import { setTheme } from "src/store/modules/settingSlice";

type LoginInput = { username: string; password: string };
type RegisterInput = LoginInput & { rePassword: string };
type Role = "admin" | "user" | "premiumUser";

type AuthFormProps =
  | {
      mode: "login";
      onSubmit?: (values: LoginInput) => void;
      setCurrentMode: Dispatch<SetStateAction<"login" | "register">>;
    }
  | {
      mode: "register";
      onSubmit?: (values: RegisterInput) => void;
      setCurrentMode: Dispatch<SetStateAction<"login" | "register">>;
    };

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function createLoginSchema(t: ReturnType<typeof useTranslation>["t"]) {
  return z.object({
    username: z.string().min(1, { message: "auth.username_required" }),
    password: z
      .string()
      .min(1, { message: "auth.password_required" })
      .regex(passwordRegex, { message: "auth.password_invalid" }),
  });
}

function createRegisterSchema(t: ReturnType<typeof useTranslation>["t"]) {
  return createLoginSchema(t)
    .extend({
      rePassword: z.string().min(1, { message: "auth.rePassword_required" }),
    })
    .superRefine(({ password, rePassword }, ctx) => {
      if (rePassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "auth.password_mismatch",
          path: ["rePassword"],
        });
      }
    });
}

function isValidRole(role: string): role is Role {
  return ["admin", "user", "premiumUser"].includes(role);
}

const AuthForm = ({ mode, setCurrentMode }: AuthFormProps) => {
  const isRegister = mode === "register";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginSchema = useMemo(() => createLoginSchema(t), [t]);
  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInput | LoginInput>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const errorRePassword = isRegister
    ? (errors as FieldErrors<RegisterInput>).rePassword
    : undefined;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const getGraphQLErrorMessage = useGraphQLErrorMessage();

  const [loginMutation, { loading: loginLoading }] = useLoginAccountMutation({
    onCompleted: (data) => {
      setToastMessage(t("auth.login_success"));
      setToastType("success");

      const userRole = data?.loginAccount.user.role;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", userRole);
      localStorage.setItem("token", data.loginAccount.token);
      const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      dispatch(setTheme(savedTheme ?? "dark"));

      if (isValidRole(userRole)) {
        dispatch(setUserRole(userRole));
      }

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (err) => {
      const msg = getGraphQLErrorMessage(err);
      setToastMessage(msg);
      setToastType("error");
    },
  });

  const [registerMutation, { loading: registerLoading }] =
    useRegisterUserMutation({
      onCompleted: () => {
        setToastMessage(t("auth.register_success"));
        setToastType("success");

        setTimeout(() => {
          setCurrentMode("login");
        }, 1000);
      },
      onError: (err) => {
        const msg = getGraphQLErrorMessage(err);
        setToastMessage(msg);
        setToastType("error");
      },
    });

  const loading = loginLoading || registerLoading;

  const showLoading = useDelayedLoading(loading, 1000);

  useEffect(() => {
    if (!showLoading && toastMessage && toastType) {
      if (toastType === "success") {
        showToast.success(toastMessage);
      } else {
        showToast.error(toastMessage);
      }

      setToastMessage(null);
      setToastType(null);
    }
  }, [showLoading, toastMessage, toastType]);

  const onFormSubmit = async (data: LoginInput | RegisterInput) => {
    if (isRegister) {
      await registerMutation({ variables: { input: data as RegisterInput } });
    } else {
      await loginMutation({ variables: { input: data as LoginInput } });
    }
  };

  useEffect(() => {
    reset();
  }, [mode, reset]);

  return (
    <>
      {showLoading && <FullScreenLoader />}
      <form onSubmit={handleSubmit(onFormSubmit)} style={{ marginTop: "20px" }}>
        <Box sx={{ height: "240px" }}>
          <TextField
            {...register("username")}
            name="username"
            label={t("auth.username")}
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.username}
            helperText={
              errors.username ? t(errors.username.message as string) : ""
            }
          />
          <TextField
            {...register("password")}
            name="password"
            label={t("auth.password")}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin={isRegister ? "dense" : "normal"}
            error={!!errors.password}
            helperText={
              errors.password ? t(errors.password?.message as string) : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label={
                      showPassword
                        ? t("auth.hide_password")
                        : t("auth.show_password")
                    }
                    sx={{ color: "#a8a8a8" }}
                  >
                    {showPassword ? (
                      <Tooltip title={t("auth.hide_password")}>
                        <VisibilityIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title={t("auth.show_password")}>
                        <VisibilityOffIcon />
                      </Tooltip>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isRegister && (
            <TextField
              {...register("rePassword")}
              name="rePassword"
              label={t("auth.rePassword")}
              type={showRePassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              error={!!errorRePassword}
              helperText={
                errorRePassword ? t(errorRePassword.message as string) : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRePassword(!showRePassword)}
                      edge="end"
                      aria-label={
                        showPassword
                          ? t("auth.hide_password")
                          : t("auth.show_password")
                      }
                      sx={{ color: "#a8a8a8" }}
                    >
                      {showRePassword ? (
                        <Tooltip title={t("auth.hide_password")}>
                          <VisibilityIcon />
                        </Tooltip>
                      ) : (
                        <Tooltip title={t("auth.show_password")}>
                          <VisibilityOffIcon />
                        </Tooltip>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: "45px", borderRadius: "10px" }}
          >
            <Typography>
              {isRegister ? t("auth.register") : t("auth.login")}
            </Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthForm;
