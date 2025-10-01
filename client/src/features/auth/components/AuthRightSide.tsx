import { Box, Button, Link, Typography } from "@mui/material";
import AuthForm from "./AuthForm";
import { LoginInput, RegisterInput } from "../../../generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import i18n from "../../../i18n/i18n";
import { setLanguage } from "src/store/modules/languageSlice";
import { useTranslation } from "react-i18next";

type AuthRightSideProps = {
  mode: "login" | "register";
  setCurrentMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

const AuthRightSide = ({ mode, setCurrentMode }: AuthRightSideProps) => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = currentLang === "zh" ? "en" : "zh";
    dispatch(setLanguage(nextLang));
    i18n.changeLanguage(nextLang);
  };

  return (
    <Box
      position="relative"
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Button
        onClick={toggleLanguage}
        variant="outlined"
        sx={{ position: "absolute", right: "0", top: "0", color: "#1B5CD8" }}
      >
        {currentLang === "zh" ? "中文" : "English"}
      </Button>
      <Typography fontSize={"2.5rem"} fontWeight={"bold"}>
        {t(mode === "login" ? "auth.loginAccount" : "auth.registerAccount")}
      </Typography>
      <AuthForm mode={mode} />
      <Typography mt={3}>
        {t(mode === "login" ? "auth.no_account" : "auth.has_account")}
      </Typography>
      <Button
        onClick={() => {
          setCurrentMode(mode === "login" ? "register" : "login");
        }}
      >
        {t(mode === "login" ? "auth.login_now" : "auth.sign_up_now")}
      </Button>
    </Box>
  );
};

export default AuthRightSide;
