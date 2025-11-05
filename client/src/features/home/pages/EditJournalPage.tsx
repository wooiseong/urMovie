import { Box } from "@mui/material";
import QuoteBoard from "../components/QuoteBoard";
import JournalMetaForm from "../components/JournaIMetaForm";
import JournalContentEditor from "../components/JournalContentEditor";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
const EditJournalPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ pb: "70px", position: "relative" }}>
      <CustomSectionTitle label={t("home.createEdit")} />
      <JournalMetaForm></JournalMetaForm>
      <JournalContentEditor></JournalContentEditor>
      <QuoteBoard></QuoteBoard>
      <Box sx={{ position: "absolute", bottom: "2%", right: "0" }}>
        <CustomActionButton icon={<SendIcon />} label={t("operation.submit")} />
      </Box>
    </Box>
  );
};

export default EditJournalPage;
