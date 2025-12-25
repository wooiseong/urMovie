import { Box } from "@mui/material";
import { useState } from "react";
import {
  JournalItem,
  JournalModal,
} from "src/features/home/components/JournalList";
import { GetJournalsQuery, Journal } from "src/generated/graphql";

interface JournalContainerProps {
  journals: NonNullable<GetJournalsQuery["journals"]>;
  isListView: boolean;
}

const JournalContainer = ({ journals, isListView }: JournalContainerProps) => {
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const handleOpenModal = (journal: Journal) => setSelectedJournal(journal);
  const handleCloseModal = () => setSelectedJournal(null);

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
                sm: "repeat(auto-fill, minmax(200px, 1fr))",
                md: "repeat(auto-fill, minmax(250px, 1fr))",
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
            onClick={() => handleOpenModal(journal)}
            isListView={isListView}
          />
        ))}
      </Box>

      {selectedJournal && (
        <JournalModal
          open={!!selectedJournal}
          onClose={handleCloseModal}
          journal={selectedJournal}
        />
      )}
    </>
  );
};

export default JournalContainer;
