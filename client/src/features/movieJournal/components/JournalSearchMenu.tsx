import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { DynamicMenuItem } from "src/globalComponents/DynamicMenuItem";
import { useTranslation } from "react-i18next";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CustomDropdown from "src/globalComponents/CustomDropdown";
import CustomTextField from "src/globalComponents/CustomTextfield";
import JournalDateMenu from "./JournalDateMenu";
const JournalSearchMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const { t } = useTranslation();

  return (
    <Box>
      <IconButton sx={{ width: 40, height: 40 }} onClick={handleOpen}>
        <FilterAltIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            p: 2, // padding
            borderRadius: 2,
            width: 400, // 想要可以調整
          },
        }}
      >
        {/* 自由填內容 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "bottom",
          }}
        >
          <Typography variant="h6">{t("搜尋篩選")}</Typography>
          <Button>清除條件</Button>
        </Box>
        <Box>
          {/* <CustomDropdown
            label="標籤"
            icon={<LocalOfferIcon />}
            placeholder={t("home.movieName")}
            fullWidth
            tagList={formData.tag}
            onTagChange={(updatedTags) => handleChange("tag", updatedTags)}
          /> */}
          <CustomTextField
            icon={<LocalOfferIcon />}
            label={t("home.movieName")}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          ></CustomTextField>
          <JournalDateMenu />
        </Box>
      </Popover>
    </Box>
  );
};

export default JournalSearchMenu;
