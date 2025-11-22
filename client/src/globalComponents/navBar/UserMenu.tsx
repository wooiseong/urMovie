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
  defaultAvatar: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ defaultAvatar }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const currentTheme = useAppSelector((state) => state.setting.theme);
  const currentLang = useAppSelector((state) => state.setting.lang);

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
      to: "/adminStatistics",
    },
    {
      icon: <OfflineBoltIcon />,
      label: t("navBar.upgrade"),
      to: "/adminStatistics",
      sx: { color: "#FCF55F" },
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
            src={defaultAvatar}
            alt="User Avatar"
            sx={{
              marginX: "10px",
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
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
                src={defaultAvatar}
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
                  Bear
                </Typography>
                <Chip label={t("auth.user")} color="primary" size="small" />
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

// interface UserMenuProps {
//   defaultAvatar: string;
// }

// const UserMenu: React.FC<UserMenuProps> = ({ defaultAvatar }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [openTheme, setOpenTheme] = useState(false);
//   const [openLang, setOpenLang] = useState(false);
//   const { t } = useTranslation();

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const currentTheme = useAppSelector((state) => state.setting.theme);
//   const currentLang = useAppSelector((state) => state.setting.lang);

//   const [isSettingChanging, setIsSettingChanging] = useState(false);
//   const delayedLoading = useDelayedLoading(isSettingChanging);

//   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setOpenTheme(false);
//     setOpenLang(false);
//   };

//   const handleThemeChange = async (theme: Theme) => {
//     setIsSettingChanging(true);
//     try {
//       await new Promise((r) => setTimeout(r, 1000));
//       dispatch(setTheme(theme));
//     } finally {
//       setIsSettingChanging(false);
//     }
//   };

//   const handleLangChange = async (lang: Language) => {
//     setIsSettingChanging(true);
//     try {
//       const changePromise = i18n.changeLanguage(lang);
//       const delayPromise = new Promise((r) => setTimeout(r, 1000));
//       await Promise.all([changePromise, delayPromise]);
//       dispatch(setLanguage(lang));
//     } finally {
//       setIsSettingChanging(false);
//     }
//   };

//   return (
//     <>
//       {delayedLoading && <FullScreenLoader />}
//       <Box>
//         {/* menu button in navBar */}
//         <IconButton onClick={handleOpen}>
//           <Box
//             component="img"
//             src={defaultAvatar}
//             alt="User Avatar"
//             sx={{
//               marginX: "10px",
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />
//         </IconButton>

//         {/* main menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           slotProps={{
//             paper: {
//               sx: {
//                 mt: 1.5,
//                 borderRadius: "12px",
//                 // backgroundColor: "#383838",
//                 // color: "#fff",
//                 minWidth: 180,
//                 overflow: "visible",
//               },
//             },
//           }}
//         >
//           {/* userInfo */}
//           <Box
//             px={2}
//             py={1}
//             textAlign="center"
//             sx={{
//               mx: "15px",
//               my: "5px",
//               borderRadius: "10px",
//               // backgroundColor: "#484848",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 alignItems: "center",
//                 width: "100%",
//                 padding: 0,
//               }}
//             >
//               <Box
//                 component="img"
//                 src={defaultAvatar}
//                 alt="User Avatar"
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                 }}
//               />
//               <Box>
//                 <Typography fontSize="20px" fontWeight="bold">
//                   Bear
//                 </Typography>
//                 <Chip label={t("auth.user")} color="primary" size="small" />
//               </Box>
//             </Box>
//             <Typography fontSize="0.8rem" sx={{ mt: "10px" }}>
//               {t("navBar.used")}
//               <Box
//                 component="span"
//                 sx={{ fontSize: "1.5rem", fontWeight: "bold", mx: "5px" }}
//               >
//                 1/10
//               </Box>
//               {t("navBar.quoteUsage")}
//             </Typography>
//           </Box>

//           {/* theme menu item */}
//           <MenuItem
//             onMouseEnter={() => {
//               setOpenTheme(true);
//               setOpenLang(false);
//             }}
//             // onMouseLeave={() => setOpenTheme(false)}
//             sx={{
//               position: "relative",
//             }}
//           >
//             <ChevronLeftIcon
//               sx={{
//                 position: "absolute",
//                 left: 8,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//               }}
//             />
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: 1,
//                 width: "100%",
//               }}
//             >
//               <ContrastIcon />
//               <Typography>{t("navBar.theme.label")}</Typography>
//             </Box>

//             {/* Theme menu item */}
//             {openTheme && (
//               <MenuList
//                 sx={{
//                   position: "absolute",
//                   right: "100%",
//                   top: 0,
//                   // backgroundColor: "#383838",
//                   borderRadius: "12px",
//                   minWidth: 160,
//                   // color: "#fff",
//                   boxShadow: 3,
//                 }}
//                 onMouseEnter={() => setOpenTheme(true)}
//               >
//                 <MenuItem onClick={() => handleThemeChange("light")}>
//                   <LightModeIcon sx={{ mr: "10px" }} />
//                   <Typography>{t("navBar.theme.light")}</Typography>
//                   {currentTheme === "light" && (
//                     <CheckCircleIcon
//                       sx={{
//                         position: "absolute",
//                         right: 10,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         color: "#3EB380",
//                       }}
//                     />
//                   )}
//                 </MenuItem>
//                 <MenuItem onClick={() => handleThemeChange("dark")}>
//                   <DarkModeIcon sx={{ mr: "10px" }} />
//                   <Typography>{t("navBar.theme.dark")}</Typography>
//                   {currentTheme === "dark" && (
//                     <CheckCircleIcon
//                       sx={{
//                         position: "absolute",
//                         right: 10,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         color: "#3EB380",
//                       }}
//                     />
//                   )}
//                 </MenuItem>
//               </MenuList>
//             )}
//           </MenuItem>

//           {/* language menu item */}
//           <MenuItem
//             onMouseEnter={() => {
//               setOpenLang(true);
//               setOpenTheme(false);
//             }}
//             sx={{
//               position: "relative",
//             }}
//           >
//             <ChevronLeftIcon
//               sx={{
//                 position: "absolute",
//                 left: 8,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//               }}
//             />
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: 1,
//                 width: "100%",
//               }}
//             >
//               <LanguageIcon />
//               <Typography>{t("navBar.language.label")}</Typography>
//             </Box>

//             {/* Language 子選單 */}
//             {openLang && (
//               <MenuList
//                 sx={{
//                   position: "absolute",
//                   right: "100%",
//                   top: 0,
//                   // backgroundColor: "#383838",
//                   borderRadius: "12px",
//                   minWidth: 160,
//                   // color: "#fff",
//                   boxShadow: 3,
//                 }}
//                 onMouseEnter={() => setOpenLang(true)}
//               >
//                 <MenuItem
//                   onClick={() => {
//                     handleLangChange("zh-TW");
//                   }}
//                 >
//                   <Box>
//                     <Box component="span" sx={{ fontSize: "1rem", mr: "10px" }}>
//                       ZH
//                     </Box>
//                     {t("navBar.language.zh")}
//                   </Box>
//                   {currentLang === "zh-TW" && (
//                     <CheckCircleIcon
//                       sx={{
//                         position: "absolute",
//                         right: 10,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         color: "#3EB380",
//                       }}
//                     />
//                   )}
//                 </MenuItem>
//                 <MenuItem
//                   onClick={() => {
//                     handleLangChange("en");
//                   }}
//                 >
//                   <Box component="span" sx={{ fontSize: "1rem", mr: "10px" }}>
//                     EN
//                   </Box>
//                   {t("navBar.language.en")}
//                   {currentLang === "en" && (
//                     <CheckCircleIcon
//                       sx={{
//                         position: "absolute",
//                         right: 10,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         color: "#3EB380",
//                       }}
//                     />
//                   )}
//                 </MenuItem>
//               </MenuList>
//             )}
//           </MenuItem>

//           {/* other menu items */}
//           <MenuItem
//             onMouseEnter={() => {
//               setOpenTheme(false);
//               setOpenLang(false);
//             }}
//           >
//             <CustomNavButton
//               icon={<AccountBoxIcon />}
//               label={t("navBar.profile")}
//               to="/adminStatistics"
//             />
//           </MenuItem>
//           <MenuItem
//             onMouseEnter={() => {
//               setOpenTheme(false);
//               setOpenLang(false);
//             }}
//           >
//             <CustomNavButton
//               icon={<OfflineBoltIcon />}
//               label={t("navBar.upgrade")}
//               to="/adminStatistics"
//               sx={{ color: "#FCF55F" }}
//             />
//           </MenuItem>
//           <MenuItem
//             onMouseEnter={() => {
//               setOpenTheme(false);
//               setOpenLang(false);
//             }}
//           >
//             <CustomNavButton
//               onClick={() => {
//                 localStorage.removeItem("isLoggedIn");
//                 localStorage.removeItem("user");
//                 localStorage.removeItem("token");
//                 navigate("/login");
//               }}
//               icon={<ExitToAppIcon />}
//               label={t("navBar.logout")}
//             />
//           </MenuItem>
//         </Menu>
//       </Box>
//     </>
//   );
// };

// export default UserMenu;
