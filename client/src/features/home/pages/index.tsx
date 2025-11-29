import { Box } from "@mui/material";
import CreateEditSelection from "../components/CreateEditSection";
import PreviousEditSelection from "../components/PreviousEditSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UpgradeSuccessModal from "src/features/membership/components/UpgradeSuccessModal";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (location.state?.upgraded) {
      setShowUpgradeModal(true);
    }
  }, [location.state]);

  const handleCloseModal = () => {
    setShowUpgradeModal(false);
    navigate(location.pathname, { replace: true });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <CreateEditSelection />
      <PreviousEditSelection />
      <UpgradeSuccessModal open={showUpgradeModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default HomePage;
