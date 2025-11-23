import { Box } from "@mui/material";
import { useState } from "react";
import {
  JournalItem,
  JournalModal,
} from "src/features/home/components/JournalList";
import { GetJournalsQuery, Journal } from "src/generated/graphql";

interface JournalContainerProps {
  journals: NonNullable<GetJournalsQuery["journals"]>;
}

const JournalContainer = ({ journals }: JournalContainerProps) => {
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const handleOpenModal = (journal: Journal) => setSelectedJournal(journal);
  const handleCloseModal = () => setSelectedJournal(null);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
        justifyContent="center"
        justifyItems="center"
        width="100%"
      >
        {journals.map((journal) => (
          <JournalItem
            key={journal.id}
            journal={journal}
            onClick={() => handleOpenModal(journal)}
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
