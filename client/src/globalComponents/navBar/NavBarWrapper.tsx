import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SearchIcon from "@mui/icons-material/Search";
import defaultAvatar from "../../img/default_avatar.jpg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAppSelector } from "src/store/hook";
import CustomNavButton from "../CustomNavButton";
import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";

const NavBarWrapper = () => {
  const userRole = useAppSelector((state) => state.user.role);
  const { t } = useTranslation();
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
          sx={{
            marginLeft: "30px",
            //  color: "#fff"
          }}
        >
          <Typography fontSize="20px">UrMovie</Typography>
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
              to="/adminStatistics"
            />
          )}
        </Box>
      </Box>
      <Box display="flex">
        <TextField
          size="small"
          sx={{
            margin: "10px",
            width: "100%",
            // backgroundColor: "	#484848",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                // borderColor: "#484848",
              },
              "&:hover fieldset": {
                // borderColor: "#484848",
              },
              "&.Mui-focused fieldset": {
                // borderColor: "#a8a8a8",
              },
            },
            "& input": {
              // color: "#fff",
            },
          }}
          name="search"
          placeholder={t("navBar.search")}
          type="text"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="">
                  <SearchIcon
                    sx={
                      {
                        // color: "#a8a8a8"
                      }
                    }
                  />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <UserMenu defaultAvatar={defaultAvatar} />
      </Box>
    </Box>
  );
};

export default NavBarWrapper;
