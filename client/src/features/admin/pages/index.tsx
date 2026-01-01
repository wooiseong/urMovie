import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  useGetAdminStatsQuery,
  useGetUsersWithStatsQuery,
} from "src/generated/graphql";

import AdminStats from "../components/AdminStats";
import UserStats from "../components/UserStats";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";

const AdminStatisticsPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useGetAdminStatsQuery();
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersWithStatsQuery({
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    },
  });

  const [activeView, setActiveView] = useState<"adminstats" | "userstats">(
    "adminstats"
  );

  // Reset page when switching views
  useEffect(() => {
    setCurrentPage(1);
  }, [activeView]);

  if (statsLoading || usersLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (statsError || usersError) {
    return (
      <Typography color="error">
        Error: {statsError?.message || usersError?.message}
      </Typography>
    );
  }

  const { getAdminStats } = statsData || {};
  const { getUsersWithStats } = usersData || {};

  return (
    <Box>
      <CustomSectionTitle label={t("admin.adminPanel")} />
      <Box sx={{ mb: 3 }}>
        <Button
          variant={activeView === "adminstats" ? "contained" : "outlined"}
          onClick={() => setActiveView("adminstats")}
          sx={{ mr: 2 }}
        >
          {t("admin.adminStats")}
        </Button>
        <Button
          variant={activeView === "userstats" ? "contained" : "outlined"}
          onClick={() => setActiveView("userstats")}
        >
          {t("admin.userStats")}
        </Button>
      </Box>

      {activeView === "adminstats" && statsData?.getAdminStats && (
        <AdminStats getAdminStats={statsData.getAdminStats} />
      )}
      {activeView === "userstats" && usersData?.getUsersWithStats && (
        <UserStats
          getUsersWithStatsResponse={usersData.getUsersWithStats}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default AdminStatisticsPage;
