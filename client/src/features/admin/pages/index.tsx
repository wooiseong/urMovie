import { useQuery } from "@apollo/client";
import { useState } from "react";
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

const AdminStatisticsPage = () => {
  const { t } = useTranslation();
  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useGetAdminStatsQuery();
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersWithStatsQuery();

  const [activeView, setActiveView] = useState<"adminstats" | "userstats">(
    "adminstats"
  );

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("admin.adminPanel")}
      </Typography>

      <Box sx={{ mb: 2 }}>
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
        <UserStats getUsersWithStats={usersData?.getUsersWithStats} />
      )}
    </Container>
  );
};

export default AdminStatisticsPage;
