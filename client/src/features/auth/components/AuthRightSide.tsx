import { Box, Button, Link, Typography } from "@mui/material";
import AuthForm from "./AuthForm";
import { LoginInput, RegisterInput } from "../../../generated/graphql";

type AuthRightSideProps = {
  mode: "login" | "register";
  setCurrentMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

const AuthRightSide = ({ mode, setCurrentMode }: AuthRightSideProps) => {
  return (
    <Box padding={3} display="flex" flexDirection="column" alignItems="center">
      <Typography fontSize={"2.5rem"} fontWeight={"bold"}>
        {mode === "login" ? "登入賬號" : "注冊賬號"}
      </Typography>
      <AuthForm mode={mode} />
      <Typography mt={3}>
        {mode === "login" ? "還沒有UrMovie的賬號?" : "已經有UrMovie的賬號？"}
      </Typography>
      <Button
        onClick={() => {
          setCurrentMode(mode === "login" ? "register" : "login");
        }}
      >
        {mode === "login" ? "現在報名" : "現在登入"}
      </Button>
    </Box>
  );
};

export default AuthRightSide;
