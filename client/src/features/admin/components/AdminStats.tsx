import { Grid, Card, CardContent, Typography } from "@mui/material";
import { GetAdminStatsQuery } from "src/generated/graphql";
import UserDistributionChart from "./UserDistributionChart";
import { useTranslation } from "react-i18next";

interface AdminStatsProps {
  getAdminStats: GetAdminStatsQuery["getAdminStats"];
}

const AdminStats = ({ getAdminStats }: AdminStatsProps) => {
  const { t } = useTranslation();
  if (!getAdminStats) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t("admin.adminStatistics")}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.totalMembers")}
              </Typography>
              <Typography variant="h5">{getAdminStats.totalMembers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.regularUsers")}
              </Typography>
              <Typography variant="h5">{getAdminStats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.premiumUsers")}
              </Typography>
              <Typography variant="h5">
                {getAdminStats.totalPremiumUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.totalJournals")}
              </Typography>
              <Typography variant="h5">
                {getAdminStats.totalJournals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.estimatedSalary")}
              </Typography>
              <Typography variant="h5">${getAdminStats.totalSalary}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <UserDistributionChart
            totalUsers={getAdminStats.totalUsers}
            totalPremiumUsers={getAdminStats.totalPremiumUsers}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminStats;
