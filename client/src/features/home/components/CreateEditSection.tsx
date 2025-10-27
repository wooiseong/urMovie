import { Box, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import CustomTextField from "src/globalComponents/CustomTextfield";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const CreateEditSelection = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <CustomSectionTitle label={t("home.createEdit")} />

      <Box
        sx={{
          position: "relative",
          backgroundColor: "#282828",
          p: 2,
          borderRadius: 2,
        }}
      >
        {/* movie name */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <CustomTextField
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#404040",
              },
            }}
          />
          <IconButton>
            <EditIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        {/* title */}
        <CustomTextField
          placeholder={t("home.journalTitle")}
          fullWidth
          sx={{
            input: { padding: "0px 12px", fontSize: "1.25rem" },
          }}
        />

        {/* content */}
        <CustomTextField
          placeholder={t("home.journalContent")}
          fullWidth
          multiline
          minRows={5}
        />
        <CustomActionButton
          icon={<SendIcon />}
          label={t("operation.submit")}
          sx={{ position: "absolute", right: "1.5%", bottom: "6%" }}
        />
      </Box>
    </Box>
  );
};

export default CreateEditSelection;
