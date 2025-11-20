import { Box } from "@mui/material";
import { JournalItem } from "src/features/home/components/JournalList";
import { GetJournalsQuery } from "src/generated/graphql";

interface JournalContainerProps {
  journals: NonNullable<GetJournalsQuery["journals"]>;
}

const JournalContainer = ({ journals }: JournalContainerProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={2}
      justifyContent="center"
      justifyItems="center"
      width="100%"
    >
      {journals.map((journal) => (
        <JournalItem key={journal.id} journal={journal} />
      ))}
    </Box>
  );
};

export default JournalContainer;
