import { Box } from "@mui/material";
import CreateEditSelection from "../components/CreateEditSection";
import PreviousEditSelection from "../components/PreviousEditSection";

const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <CreateEditSelection />
      <PreviousEditSelection />
    </Box>
  );
};

export default HomePage;
