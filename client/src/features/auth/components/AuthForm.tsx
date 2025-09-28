import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useLoginAccountMutation,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { showToast } from "../../../utils/toast";
import FullScreenLoader from "../../../globalComponents/FullScreenLoader";
import { useDelayedLoading } from "../../../globalHooks/useDelayedLoading";
import { useGraphQLErrorMessage } from "../../../globalHooks/useGraphQLErrorMessage";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type LoginInput = { username: string; password: string };
type RegisterInput = LoginInput & { rePassword: string };

type AuthFormProps =
  | {
      mode: "login";
      onSubmit?: (values: LoginInput) => void;
    }
  | {
      mode: "register";
      onSubmit?: (values: RegisterInput) => void;
    };

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const loginSchema = z.object({
  username: z.string().min(1, "賬號不能爲空"),
  password: z
    .string()
    .min(1, "密碼不能為空")
    .regex(passwordRegex, "密碼需為8位以上，且包含英文與數字"),
});

const registerSchema = loginSchema
  .extend({
    rePassword: z.string().min(1, "請再次輸入密碼"),
  })
  .superRefine(({ password, rePassword }, ctx) => {
    if (rePassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "兩次密碼不一致",
        path: ["rePassword"],
      });
    }
  });

const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === "register";

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
    onCompleted: () => {
      setToastMessage("登入成功");
      setToastType("success");
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
        setToastMessage("註冊成功");
        setToastType("success");
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
        <Box sx={{ height: "280px" }}>
          <TextField
            {...register("username")}
            name="username"
            label="賬號名字"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.username}
            helperText={errors.username?.message?.toString()}
          />
          <TextField
            {...register("password")}
            name="password"
            label="密碼"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin={isRegister ? "dense" : "normal"}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                    sx={{ color: "#a8a8a8" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isRegister && (
            <TextField
              {...register("rePassword")}
              name="rePassword"
              label="重新輸入密碼"
              type={showRePassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              error={!!errorRePassword}
              helperText={errorRePassword?.message?.toString()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRePassword(!showRePassword)}
                      edge="end"
                      aria-label={showRePassword ? "隱藏密碼" : "顯示密碼"}
                      sx={{ color: "#a8a8a8" }}
                    >
                      {showRePassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: "45px", borderRadius: "10px" }}
          >
            <Typography>{isRegister ? "註冊" : "登入"}</Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthForm;
