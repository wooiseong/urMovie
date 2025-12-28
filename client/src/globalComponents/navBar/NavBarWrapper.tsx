import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/store/hook";
import { setUser } from "src/store/modules/userSlice";
import CustomNavButton from "../CustomNavButton";
import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";
import { useMeQuery } from "src/generated/graphql";
import { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/images/default-avatar.png";
import urMovieLogo from "../../assets/images/urMovieLogo.png";
import urMovieLogoDark from "../../assets/images/urMovieLogoDark.png";
import { useNavigate, useLocation } from "react-router-dom";

const NavBarWrapper = () => {
  const userRole = useAppSelector((state) => state.user.role);
  const currentTheme = useAppSelector((state) => state.setting.theme);
  const dispatch = useAppDispatch();
  const { data: meData, loading } = useMeQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (meData?.me) {
      dispatch(setUser(meData.me));
    }
  }, [meData, dispatch]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  if (loading) {
    return null;
  }

  const currentUserAvatar = meData?.me?.avatar || DefaultAvatar;
  const currentUserName = meData?.me?.username || "";
  const currentUserRole = (meData?.me?.role || "user") as
    | "admin"
    | "user"
    | "premiumUser";

  const navItems = [
    {
      // icon: <HomeIcon />,
      label: t("navBar.home"),
      to: "/",
    },
    {
      // icon: <CollectionsBookmarkIcon />,
      label: t("navBar.movieJournal"),
      to: "/movieJournal",
    },
    ...(userRole === "admin"
      ? [
          {
            // icon: <AssessmentIcon />,
            label: t("navBar.adminStatistics"),
            to: "/admin/adminStatistics",
          },
        ]
      : []),
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2, md: 3 },
          py: 0.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          boxShadow: 1,
        }}
      >
        {/* Left: Logo + Menu Button (Mobile) / Nav Buttons (Desktop) */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          gap={1}
        >
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Button
            onClick={() => navigate("/")}
            disableRipple
            sx={{
              mb: 0.8,
              px: 1,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img
              src={currentTheme === "dark" ? urMovieLogo : urMovieLogoDark}
              alt="UrMovie"
              style={{
                width: isMobile ? "90px" : "110px",
                height: isMobile ? "28px" : "35px",
              }}
            />
          </Button>

          {!isMobile && (
            <Box display="flex" gap={1}>
              {navItems.map((item) => (
                <CustomNavButton
                  key={item.to}
                  // icon={item.icon}
                  label={item.label}
                  to={item.to}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Right: User Menu */}
        <UserMenu
          avatar={currentUserAvatar}
          username={currentUserName}
          role={currentUserRole}
        />
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={currentTheme === "dark" ? urMovieLogo : urMovieLogoDark}
            alt="UrMovie"
            style={{ width: "100px", height: "32px" }}
          />
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.to);
                  setDrawerOpen(false);
                }}
                selected={location.pathname === item.to}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                {/* <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon> */}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBarWrapper;
