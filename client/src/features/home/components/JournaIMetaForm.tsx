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
import { JournalFormData, selectableTags } from "../pages/EditJournalPage";
import { useEffect } from "react";

interface JournalMetaFormProps {
  formData: JournalFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  tagData: selectableTags[];
}

const JournalMetaForm = ({
  formData,
  setFormData,
  tagData,
}: JournalMetaFormProps) => {
  const { t } = useTranslation();

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={1} /> */}
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <CustomTextField
            label="電影"
            icon={<MovieIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              width: { xs: "80%", md: "70%" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            value={formData.movieName}
            onChange={(e) => handleChange("movieName", e.target.value)}
          />
          <CustomTextField
            label="導演"
            icon={<VideoCameraFrontIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              width: { xs: "80%", md: "70%" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            value={formData.director.join(",")}
            onChange={(e) =>
              handleChange("director", e.target.value.split(","))
            }
          />
          <CustomTextField
            label="演員"
            icon={<AccountCircleIcon />}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              width: { xs: "80%", md: "70%" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            value={formData.actor.join(",")}
            onChange={(e) => handleChange("actor", e.target.value.split(","))}
          />
          <CustomDropdown
            label="標籤"
            icon={<LocalOfferIcon />}
            placeholder={t("home.movieName")}
            fullWidth
            sx={{ marginLeft: "10px" }}
            tagList={formData.tag}
            onTagChange={(updatedTags) => handleChange("tag", updatedTags)}
            popoverPosition="below"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} sx={{ mt: { xs: 4, md: 0 } }}>
        <CustomImageUpload
          label="電影"
          icon={<ImageIcon />}
          sx={{
            paddingLeft: "10px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
            },
          }}
          value={formData.image}
          onUpload={(url) => handleChange("image", url)}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default JournalMetaForm;
