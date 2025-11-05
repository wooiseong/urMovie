import { useTranslation } from "react-i18next";
import CustomTextField from "src/globalComponents/CustomTextfield";
import MovieIcon from "@mui/icons-material/Movie";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Grid, Stack } from "@mui/material";
import CustomImageUpload from "src/globalComponents/CustomImageUpload";
import CustomDropdown from "src/globalComponents/CustomDropdown";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
const JournalMetaForm = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={1} /> */}
      <Grid item xs={6}>
        <Stack spacing={3}>
          <CustomTextField
            label="電影"
            icon={<MovieIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          />
          <CustomTextField
            label="導演"
            icon={<VideoCameraFrontIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          />
          <CustomTextField
            label="演員"
            icon={<AccountCircleIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          />
          <CustomDropdown
            label="標簽"
            icon={<LocalOfferIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <CustomImageUpload
          label="電影"
          icon={<ImageIcon />}
          sx={{
            paddingLeft: "10px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#404040",
            },
          }}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default JournalMetaForm;
