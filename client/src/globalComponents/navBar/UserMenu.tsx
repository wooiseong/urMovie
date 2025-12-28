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
import {
  getRoleAvatarStyle,
  getRoleChipColor,
  getRoleLabel,
  getRoleIcon,
  getRoleDescription,
  RoleBadge,
  UserRole,
} from "src/utils/roleUtils";

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
        <IconButton
          onClick={handleOpen}
          aria-label="user menu"
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box
              component="img"
              src={avatar || "/img/default_avatar.jpg"}
              alt="User Avatar"
              sx={{
                marginX: "10px",
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                ...getRoleAvatarStyle(role as UserRole),
              }}
            />
            <RoleBadge role={role as UserRole} size="small" />
          </Box>
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
          {/* User info section - Enhanced with role styling */}
          <Box px={2} py={2} textAlign="center">
            {/* Avatar with role badge */}
            <Box
              sx={{ position: "relative", display: "inline-block", mb: 1.5 }}
            >
              <Box
                component="img"
                src={avatar || "/img/default_avatar.jpg"}
                alt="User Avatar"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                  ...getRoleAvatarStyle(role as UserRole),
                }}
              />
              <RoleBadge role={role as UserRole} size="medium" />
            </Box>

            {/* Username */}
            <Typography fontSize="18px" fontWeight="bold" sx={{ mb: 0.5 }}>
              {username}
            </Typography>

            {/* Role chip with color coding and icon */}
            <Chip
              label={getRoleLabel(role as UserRole)}
              color={getRoleChipColor(role as UserRole)}
              size="small"
              icon={
                getRoleIcon(role as UserRole) as React.ReactElement | undefined
              }
            />
          </Box>

          {/* menu items */}
          <DynamicMenu menuItems={menuItems} onClose={handleClose} />
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
