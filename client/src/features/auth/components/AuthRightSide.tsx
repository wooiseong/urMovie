import { Box, Button, Tooltip, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AuthForm from "./AuthForm";
import i18n from "../../../i18n/i18n";
import { setLanguage, setTheme } from "src/store/modules/settingSlice";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/store/hook";

type AuthRightSideProps = {
  mode: "login" | "register";
  setCurrentMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

const AuthRightSide = ({ mode, setCurrentMode }: AuthRightSideProps) => {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state) => state.setting.lang);
  const currentTheme = useAppSelector((state) => state.setting.theme);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = currentLang === "zh-TW" ? "en" : "zh-TW";
    dispatch(setLanguage(nextLang));
    i18n.changeLanguage(nextLang);
  };

  const toggleTheme = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(nextTheme));
  };

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        sx={{
          position: "absolute",
          right: "0",
          top: "-2%",
          display: "flex",
          gap: 1,
        }}
      >
        <Tooltip
          title={
            currentTheme === "light"
              ? t("navBar.theme.light")
              : t("navBar.theme.dark")
          }
        >
          <Button
            onClick={toggleTheme}
            variant="outlined"
            sx={{ minWidth: "auto", p: 1 }}
          >
            {currentTheme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Tooltip>
        <Tooltip title={currentLang === "zh-TW" ? "中文" : "English"}>
          <Button
            onClick={toggleLanguage}
            variant="outlined"
            sx={{ minWidth: "auto", px: currentLang === "zh-TW" ? 1.6 : 1.3 }}
          >
            {currentLang === "zh-TW" ? "中" : "EN"}
          </Button>
        </Tooltip>
      </Box>
      <Typography
        fontSize={"2.2rem"}
        fontWeight={"bold"}
        sx={{ paddingTop: "40px" }}
      >
        {t(mode === "login" ? "auth.loginAccount" : "auth.registerAccount")}
      </Typography>
      <AuthForm mode={mode} setCurrentMode={setCurrentMode} />
      <Typography mt={3}>
        {t(mode === "login" ? "auth.no_account" : "auth.has_account")}
      </Typography>
      <Button
        onClick={() => {
          setCurrentMode(mode === "login" ? "register" : "login");
        }}
      >
        {t(mode === "login" ? "auth.sign_up_now" : "auth.login_now")}
      </Button>
    </Box>
  );
};

export default AuthRightSide;
