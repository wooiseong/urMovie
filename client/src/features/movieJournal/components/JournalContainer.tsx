import { Box } from "@mui/material";
import { JournalItem } from "src/features/home/components/JournalList";
import { GetJournalsQuery, Journal } from "src/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hook";
import { setSelectedJournal } from "src/store/modules/journalSlice";

interface JournalContainerProps {
  journals: NonNullable<GetJournalsQuery["journals"]["journals"]>;
  isListView: boolean;
}

const JournalContainer = ({ journals, isListView }: JournalContainerProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJournalClick = (journal: Journal) => {
    dispatch(setSelectedJournal(journal));
    navigate("/journalDetails");
  };

  return (
    <>
      <Box
        display={isListView ? "flex" : "grid"}
        flexDirection={isListView ? "column" : "unset"}
        gridTemplateColumns={
          isListView
            ? "unset"
            : {
                xs: "1fr",
                sm: "repeat(auto-fill, 280px)",
                md: "repeat(auto-fill, 280px)",
              }
        }
        gap={{ xs: 1.5, sm: 2 }}
        justifyContent="center"
        justifyItems={isListView ? "unset" : "center"}
        width="100%"
      >
        {journals.map((journal) => (
          <JournalItem
            key={journal.id}
            journal={journal}
            onClick={() => handleJournalClick(journal)}
            isListView={isListView}
          />
        ))}
      </Box>
    </>
  );
};

export default JournalContainer;
