import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";

const PreviousEditSelection = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <CustomSectionTitle label={t("home.recentEdit")} />
    </Box>
  );
};

export default PreviousEditSelection;
