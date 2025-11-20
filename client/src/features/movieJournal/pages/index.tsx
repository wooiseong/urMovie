import { Box } from "@mui/material";
import { useGetJournalsQuery } from "src/generated/graphql";
import { useQueryWithLoader } from "src/globalHooks/useQueryWithLoader";
import JournalContainer from "../components/JournalContainer";
import JournalWrapper from "../components/JournalWrapper";

const MovieJournalPage = () => {
  const {
    data: journalData,
    loader,
    error,
  } = useQueryWithLoader(useGetJournalsQuery);

  return (
    <Box>
      <JournalWrapper />
      <JournalContainer journals={journalData?.journals ?? []} />
    </Box>
  );
};

export default MovieJournalPage;
