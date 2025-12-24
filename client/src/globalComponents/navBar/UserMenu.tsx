import { useApolloClient } from "@apollo/client";
import { Box, Chip, IconButton, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import ContrastIcon from "@mui/icons-material/Contrast";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "src/store/hook";
import {
  Language,
  setLanguage,
  setTheme,
  Theme,
} from "src/store/modules/settingSlice";
import i18n from "src/i18n/i18n";
import { useDelayedLoading } from "src/globalHooks/useDelayedLoading";
import FullScreenLoader from "../FullScreenLoader";
import { useNavigate } from "react-router-dom";
import DynamicMenu, { DynamicMenuItem } from "../DynamicMenuItem";

// UserMenu
interface UserMenuProps {
  avatar: string | null;
  username: string;
  role: "admin" | "user" | "premiumUser";
}

const UserMenu: React.FC<UserMenuProps> = ({ avatar, username, role }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const currentTheme = useAppSelector((state) => state.setting.theme);
  const currentLang = useAppSelector((state) => state.setting.lang);
  const userRole = useAppSelector((state) => state.user.role);
  const [isSettingChanging, setIsSettingChanging] = useState(false);
  const delayedLoading = useDelayedLoading(isSettingChanging);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleThemeChange = async (theme: Theme) => {
    setIsSettingChanging(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      dispatch(setTheme(theme));
    } finally {
      setIsSettingChanging(false);
    }
  };

  const handleLangChange = async (lang: Language) => {
    setIsSettingChanging(true);
    try {
      const changePromise = i18n.changeLanguage(lang);
      const delayPromise = new Promise((r) => setTimeout(r, 1000));
      await Promise.all([changePromise, delayPromise]);
      dispatch(setLanguage(lang));
    } finally {
      setIsSettingChanging(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    client.clearStore();
    navigate("/login");
  };

  const menuItems: DynamicMenuItem[] = [
    {
      icon: <ContrastIcon />,
      label: t("navBar.theme.label"),
      submenu: [
        {
          icon: <LightModeIcon />,
          label: t("navBar.theme.light"),
          onClick: () => handleThemeChange("light"),
          isActive: currentTheme === "light",
        },
        {
          icon: <DarkModeIcon />,
          label: t("navBar.theme.dark"),
          onClick: () => handleThemeChange("dark"),
          isActive: currentTheme === "dark",
        },
      ],
    },
    {
      icon: <LanguageIcon />,
      label: t("navBar.language.label"),
      submenu: [
        {
          prefix: "ZH",
          label: t("navBar.language.zh"),
          onClick: () => handleLangChange("zh-TW"),
          isActive: currentLang === "zh-TW",
        },
        {
          prefix: "EN",
          label: t("navBar.language.en"),
          onClick: () => handleLangChange("en"),
          isActive: currentLang === "en",
        },
      ],
    },
    {
      icon: <AccountBoxIcon />,
      label: t("navBar.profile"),
      to: "/profile",
    },
    {
      icon: <OfflineBoltIcon />,
      label: t("navBar.upgrade"),
      to: "/membership",
      sx: { color: "secondary.main" },
    },
    {
      icon: <ExitToAppIcon />,
      label: t("navBar.logout"),
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {delayedLoading && <FullScreenLoader />}
      <Box>
        <IconButton onClick={handleOpen}>
          <Box
            component="img"
            src={avatar || "/img/default_avatar.jpg"}
            alt="User Avatar"
            sx={(theme) => ({
              boxShadow:
                userRole === "premiumUser"
                  ? `0 0 8px 2px ${theme.palette.secondary.main}`
                  : "none",
              marginX: "10px",
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            })}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                borderRadius: "12px",
                minWidth: 180,
                overflow: "visible",
              },
            },
          }}
        >
          {/* user info */}
          <Box px={2} py={1} textAlign="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={avatar || "/img/default_avatar.jpg"}
                alt="User Avatar"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography fontSize="20px" fontWeight="bold">
                  {username}
                </Typography>
                <Chip label={role} color="primary" size="small" />
              </Box>
            </Box>
            <Typography fontSize="0.8rem" sx={{ mt: "10px" }}>
              <Box
                component="span"
                sx={{ fontSize: "1.5rem", fontWeight: "bold", mx: "5px" }}
              >
                1/10
              </Box>
              {t("navBar.quoteUsage")} {t("navBar.used")}
            </Typography>
          </Box>

          {/* menu items */}
          <DynamicMenu menuItems={menuItems} onClose={handleClose} />
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
