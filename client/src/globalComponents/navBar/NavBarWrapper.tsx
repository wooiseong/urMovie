import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAppDispatch, useAppSelector } from "src/store/hook";
import { setUser } from "src/store/modules/userSlice";
import CustomNavButton from "../CustomNavButton";
import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";
import { useMeQuery } from "src/generated/graphql";
import { useEffect } from "react";
import DefaultAvatar from "../../assets/images/default-avatar.png";
import urMovieLogo from "../../assets/images/urMovieLogo.png";
import { useNavigate } from "react-router-dom";

const NavBarWrapper = () => {
  const userRole = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  const { data: meData, loading } = useMeQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (meData?.me) {
      dispatch(setUser(meData.me));
    }
  }, [meData, dispatch]);

  if (loading) {
    return null;
  }

  const currentUserAvatar = meData?.me?.avatar || DefaultAvatar;
  const currentUserName = meData?.me?.username || "";
  const currentUserRole = (meData?.me?.role || "user") as
    | "admin"
    | "user"
    | "premiumUser";

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      // sx={{ backgroundColor: "#181818" }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={
          {
            // color: "#fff"
          }
        }
      >
        <Button
          onClick={() => navigate("/")}
          disableRipple // Remove the ripple effect
          sx={{
            marginLeft: "20px",
            //  color: "#fff"
            "&:hover": {
              backgroundColor: "transparent", // Remove background on hover
            },
            cursor: "pointer", // Ensure pointer cursor
          }}
        >
          <img
            src={urMovieLogo}
            alt="UrMovie"
            style={{ width: "110px", height: "35px" }}
          />
        </Button>
        <Box display="flex" ml={2} justifyContent="space-between">
          <CustomNavButton
            icon={<HomeIcon />}
            label={t("navBar.home")}
            to="/"
            sx={{ mx: "10px" }}
          />
          <CustomNavButton
            icon={<CollectionsBookmarkIcon />}
            label={t("navBar.movieJournal")}
            to="/movieJournal"
            sx={{ mx: "10px" }}
          />
          {userRole === "admin" && (
            <CustomNavButton
              icon={<AssessmentIcon />}
              label={t("navBar.adminStatistics")}
              to="/admin/adminStatistics"
            />
          )}
        </Box>
      </Box>
      <Box>
        <UserMenu
          avatar={currentUserAvatar}
          username={currentUserName}
          role={currentUserRole}
        />
      </Box>
    </Box>
  );
};

export default NavBarWrapper;
