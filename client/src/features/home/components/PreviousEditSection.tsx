import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { JournalList } from "../components/JournalList";
import { useGetJournalsQuery } from "src/generated/graphql";
import { useQueryWithLoader } from "src/globalHooks/useQueryWithLoader";

const PreviousEditSelection = () => {
  // const { data, loading, error } = useGetJournalsQuery();

  const {
    data: journalData,
    loader,
    error,
  } = useQueryWithLoader(useGetJournalsQuery);

  const { t } = useTranslation();
  return (
    <Box mb={2}>
      <CustomSectionTitle label={t("home.recentEdit")} />
      <JournalList journals={journalData?.journals ?? []} />
    </Box>
  );
};

export default PreviousEditSelection;
